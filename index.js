// Import necessary modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const knex = require('./db/knex');
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Secret key for JWT
const JWT_SECRET = 'your_secret_key';

// Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Route to get all recipes based on search criteria
app.get('/api/recipes', authenticateToken, async (req, res) => {
  try {
    const { proteinGoal, budgetGoal } = req.query;

    const recipes = await knex('recipes')
      .select('*')
      .modify((queryBuilder) => {
        if (proteinGoal) {
          queryBuilder.where('protein', '>=', proteinGoal);
        }
        if (budgetGoal) {
          queryBuilder.where('price', '<=', budgetGoal);
        }
      });

    console.log('Fetched Recipes:', recipes);
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Error fetching recipes' });
  }
});

// Route to get a specific recipe by ID
app.get('/api/recipes/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await knex('recipes').where({ id }).first();

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const ingredients = await knex('recipe_ingredients')
      .join('ingredients', 'recipe_ingredients.ingredient_id', 'ingredients.id')
      .select(
        'ingredients.name',
        'recipe_ingredients.quantity',
        'recipe_ingredients.unit',
        'ingredients.average_price'
      )
      .where({ recipe_id: id });

    res.json({ ...recipe, ingredients });
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ message: 'Error fetching recipe' });
  }
});

// Route to add recipe to favorites
app.post('/api/recipes/favorites', authenticateToken, async (req, res) => {
  try {
    const { recipeId } = req.body;
    const userId = req.user.userId;

    const favoriteExists = await knex('user_favorites')
      .where({ user_id: userId, recipe_id: recipeId })
      .first();

    if (favoriteExists) {
      return res.status(400).json({ message: 'Recipe is already in favorites' });
    }

    await knex('user_favorites').insert({
      user_id: userId,
      recipe_id: recipeId,
    });

    res.json({ message: 'Recipe added to favorites' });
  } catch (error) {
    console.error('Error adding to favorites:', error);
    res.status(500).json({ message: 'Error adding to favorites' });
  }
});

// Route to remove a recipe from favorites
app.delete('/api/recipes/favorites/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const favorite = await knex('user_favorites')
      .where({ user_id: userId, recipe_id: id })
      .first();

    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    await knex('user_favorites')
      .where({ user_id: userId, recipe_id: id })
      .del();

    res.json({ message: 'Recipe removed from favorites' });
  } catch (error) {
    console.error('Error removing from favorites:', error);
    res.status(500).json({ message: 'Error removing from favorites' });
  }
});

// Route to get favorite recipes of a user
app.get('/api/recipes/favorites', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const favorites = await knex('user_favorites')
      .join('recipes', 'user_favorites.recipe_id', 'recipes.id')
      .select('recipes.*')
      .where({ user_id: userId });

    res.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Error fetching favorites' });
  }
});

// Route to get shopping list based on user’s favorite recipes
app.get('/api/shopping-list', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const shoppingList = await knex('recipe_ingredients')
      .join('ingredients', 'recipe_ingredients.ingredient_id', 'ingredients.id')
      .select(
        'ingredients.name',
        'recipe_ingredients.quantity',
        'recipe_ingredients.unit',
        'ingredients.average_price'
      )
      .whereIn(
        'recipe_ingredients.recipe_id',
        knex('user_favorites').select('recipe_id').where({ user_id: userId })
      );

    console.log('Fetched Shopping List:', shoppingList);

    let totalCost = 0;
    shoppingList.forEach(item => {
      if (item.average_price !== undefined && item.average_price !== null) {
        totalCost += item.quantity * item.average_price;
        console.log(`Item: ${item.name}, Quantity: ${item.quantity}, Average Price: ${item.average_price}, Total: ${item.quantity * item.average_price}`);
      } else {
        console.log(`Item: ${item.name} does not have a valid average price.`);
      }
    });

    console.log('Total Estimated Cost:', totalCost);

    res.json({ shoppingList, totalEstimatedCost: totalCost.toFixed(2) });
  } catch (error) {
    console.error('Error fetching shopping list:', error);
    res.status(500).json({ message: 'Error fetching shopping list' });
  }
});

// Route for user registration
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await knex('users').where({ username }).first();
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Insert new user into database
    const [userId] = await knex('users').insert({
      username,
      username,
      password, // In a real app, you should hash the password
    }).returning('id');
  
    // Create and return a JWT token
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
  });
  
  // Route for user login
  app.post('/api/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await knex('users').where({ username, password }).first();
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Create and return a JWT token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Error logging in user' });
    }
  });
  
  // Start the server and listen on the specified port
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
  
