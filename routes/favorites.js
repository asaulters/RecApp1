// routes/favorites.js

const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile').development);
const authenticateToken = require('../middleware/auth');

// Apply the authentication middleware
router.use(authenticateToken);

// Add a recipe to favorites
router.post('/', async (req, res) => {
  try {
    const userId = req.user.userId;
    const { recipeId } = req.body;

    // Check if the favorite already exists
    const existingFavorite = await knex('favorites')
      .where({ user_id: userId, recipe_id: recipeId })
      .first();

    if (existingFavorite) {
      return res.status(400).json({ message: 'Recipe is already in favorites' });
    }

    // Insert the favorite
    await knex('favorites').insert({ user_id: userId, recipe_id: recipeId });

    res.status(201).json({ message: 'Recipe added to favorites' });
  } catch (err) {
    console.error('Error adding favorite:', err);
    res.status(500).json({ message: 'Error adding favorite', error: err });
  }
});

// Get all favorite recipes for the user
router.get('/', async (req, res) => {
  try {
    const userId = req.user.userId;

    const favorites = await knex('favorites')
      .join('recipes', 'favorites.recipe_id', 'recipes.id')
      .where('favorites.user_id', userId)
      .select('recipes.*');

    res.json(favorites);
  } catch (err) {
    console.error('Error fetching favorites:', err);
    res.status(500).json({ message: 'Error fetching favorites', error: err });
  }
});

// Remove a recipe from favorites
router.delete('/:recipeId', async (req, res) => {
  try {
    const userId = req.user.userId;
    const { recipeId } = req.params;

    const deletedRows = await knex('favorites')
      .where({ user_id: userId, recipe_id: recipeId })
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

module.exports = router;