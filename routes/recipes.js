const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile').development);
const authenticateToken = require('../middleware/auth');

// Use the authentication middleware for all recipe routes
router.use(authenticateToken);

// Route to get a user's favorite recipes
router.get('/favorites', async (req, res) => {
  try {
    const user_id = req.user.userId;
    console.log(`Fetching favorites for user_id: ${user_id}`);

    const favorites = await knex('user_favorites')
      .join('recipes', 'user_favorites.recipe_id', 'recipes.id')
      .select('recipes.*')
      .where('user_favorites.user_id', user_id);

    // Fetch ingredients for each favorite recipe
    const recipesWithIngredients = await Promise.all(
      favorites.map(async (recipe) => {
        const ingredients = await knex('recipe_ingredients')
          .join('ingredients', 'recipe_ingredients.ingredient_id', 'ingredients.id')
          .where({ recipe_id: recipe.id })
          .select('ingredients.name', 'recipe_ingredients.quantity', 'recipe_ingredients.unit');

        return { ...recipe, ingredients };
      })
    );

    if (recipesWithIngredients.length === 0) {
      return res.status(404).json({ message: 'No favorite recipes found' });
    }

    console.log('Favorites with ingredients fetched:', recipesWithIngredients);
    res.json(recipesWithIngredients);
  } catch (err) {
    console.error('Error fetching favorite recipes:', err);
    res.status(500).json({ message: 'Error fetching favorite recipes', error: err });
  }
});

// Route to get recipes based on user input for macros and budget
router.get('/', async (req, res) => {
  try {
    console.log('Fetching recipes with filters:', req.query);
    const { proteinGoal, budgetGoal } = req.query;

    let query = knex('recipes').select('*');

    // Apply filters based on user input
    if (proteinGoal) {
      query = query.where('protein', '>=', proteinGoal);
    }

    if (budgetGoal) {
      query = query.where('price', '<=', budgetGoal);
    }

    const recipes = await query;

    // Fetch ingredients for each recipe
    const recipesWithIngredients = await Promise.all(
      recipes.map(async (recipe) => {
        const ingredients = await knex('recipe_ingredients')
          .join('ingredients', 'recipe_ingredients.ingredient_id', 'ingredients.id')
          .where({ recipe_id: recipe.id })
          .select('ingredients.name', 'recipe_ingredients.quantity', 'recipe_ingredients.unit');

        return { ...recipe, ingredients };
      })
    );

    console.log('Recipes with ingredients fetched:', recipesWithIngredients);
    res.json(recipesWithIngredients);
  } catch (err) {
    console.error('Error fetching recipes:', err);
    res.status(500).json({ message: 'Error fetching recipes', error: err });
  }
});

// Route to get detailed information about a specific recipe
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Fetching recipe details for ID: ${id}`);
    const recipe = await knex('recipes').where({ id }).first();

    if (!recipe) {
      console.log('Recipe not found');
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Retrieve ingredients for the recipe using the correct 'recipe_ingredients' table
    const ingredients = await knex('recipe_ingredients')
      .join('ingredients', 'recipe_ingredients.ingredient_id', 'ingredients.id')
      .where({ recipe_id: id })
      .select(
        'ingredients.name',
        'recipe_ingredients.quantity',
        'recipe_ingredients.unit',
        'ingredients.average_price'
      );

    // Combine recipe and ingredients data, ensuring ingredients is always an array
    const recipeDetails = {
      ...recipe,
      ingredients: ingredients || [], // Ensure ingredients is an empty array if none found
      totalCost: ingredients.reduce((acc, item) => {
        const cost = (item.quantity / 100) * item.average_price;
        return acc + cost;
      }, 0).toFixed(2),
    };
    console.log('Recipe details fetched:', recipeDetails);

    res.json(recipeDetails);
  } catch (err) {
    console.error('Error fetching recipe details:', err);
    res.status(500).json({ message: 'Error fetching recipe details', error: err });
  }
});

// Route to mark a recipe as a favorite
router.post('/favorites', async (req, res) => {
  try {
    const { recipe_id } = req.body;
    const user_id = req.user.userId;

    console.log(`Adding favorite: user_id = ${user_id}, recipe_id = ${recipe_id}`);

    await knex('user_favorites').insert({ user_id, recipe_id });

    res.status(201).json({ message: 'Recipe marked as favorite' });
  } catch (err) {
    console.error('Error marking recipe as favorite:', err);
    res.status(500).json({ message: 'Error marking recipe as favorite', error: err });
  }
});

// Route to remove a recipe from favorites
router.delete('/favorites/:recipeId', async (req, res) => {
  try {
    const user_id = req.user.userId;
    const { recipeId } = req.params;

    console.log(`Removing favorite: user_id = ${user_id}, recipe_id = ${recipeId}`);

    const deletedRows = await knex('user_favorites')
      .where({ user_id, recipe_id: recipeId })
      .del();

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.json({ message: 'Recipe removed from favorites' });
  } catch (err) {
    console.error('Error removing favorite:', err);
    res.status(500).json({ message: 'Error removing favorite', error: err });
  }
});

// Route to create a new recipe (for admin or data entry purposes)
router.post('/', async (req, res) => {
  try {
    const { name, category, calories, protein, carbohydrates, fat, instructions, image_url, price } = req.body;

    const [id] = await knex('recipes').insert({
      name,
      category,
      calories,
      protein,
      carbohydrates,
      fat,
      instructions,
      image_url,
      price
    });

    console.log(`Recipe created successfully with ID: ${id}`);
    res.status(201).json({ message: 'Recipe created successfully', id });
  } catch (err) {
    console.error('Error creating recipe:', err);
    res.status(500).json({ message: 'Error creating recipe', error: err });
  }
});

// Test route to check if the server is reachable
router.get('/test', (req, res) => {
  res.json({ message: 'Test route working' });
});

module.exports = router;
