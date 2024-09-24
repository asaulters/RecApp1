// routes/shoppingList.js

const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile').development);
const authenticateToken = require('../middleware/auth');

// Route to get shopping list for a user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Query the shopping list for the user
    const shoppingList = await knex('recipe_ingredients')
      .join('ingredients', 'recipe_ingredients.ingredient_id', 'ingredients.id')
      .select(
        'ingredients.name',
        'recipe_ingredients.quantity',
        'recipe_ingredients.unit',
        'ingredients.average_price'
      )
      .where('recipe_ingredients.user_id', userId);

    // Log the retrieved data to debug
    console.log('Shopping List:', shoppingList);

    res.json(shoppingList);
  } catch (error) {
    console.error('Error fetching shopping list:', error);
    res.status(500).json({ message: 'Error fetching shopping list' });
  }
});

module.exports = router;
