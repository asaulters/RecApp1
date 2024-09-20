// db/seeds/sample_data.js
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('recipe_ingredients').del();
  await knex('recipes').del();
  await knex('ingredients').del();

  // Inserts seed entries
  await knex('ingredients').insert([
    {
      id: 1,
      name: 'Chicken Breast',
      average_price: 5.99,
      calories: 165,
      protein: 31,
      carbohydrates: 0,
      fat: 3.6,
      unit: '100g'
    },
    {
      id: 2,
      name: 'Olive Oil',
      average_price: 0.5,
      calories: 884,
      protein: 0,
      carbohydrates: 0,
      fat: 100,
      unit: '100g'
    }
    // Add more ingredients as needed
  ]);

  await knex('recipes').insert([
    {
      id: 1,
      name: 'Grilled Chicken',
      category: 'High Protein',
      calories: 200,
      protein: 35,
      carbohydrates: 0,
      fat: 5,
      instructions: 'Season the chicken and grill for 6-8 minutes on each side.',
      image_url: ''
    }
    // Add more recipes as needed
  ]);

  await knex('recipe_ingredients').insert([
    {
      id: 1,
      recipe_id: 1,
      ingredient_id: 1,
      quantity: 200,
      unit: 'g'
    },
    {
      id: 2,
      recipe_id: 1,
      ingredient_id: 2,
      quantity: 10,
      unit: 'g'
    }
    // Add more associations as needed
  ]);
};
