// db/seeds/recipes_seed.js

exports.seed = async function(knex) {
  // Deletes ALL existing entries in the related tables
  await knex('recipe_ingredients').del();
  await knex('recipes').del();
  await knex('ingredients').del();

  // Insert seed entries for ingredients (with average_price set to 0 for spices)
  await knex('ingredients').insert([
    { id: 1, name: 'Potatoes', average_price: 0.75, unit: 'medium' },
    { id: 2, name: 'Olive Oil', average_price: 0.3, unit: 'tbsp' },
    { id: 3, name: 'Sirloin Steak', average_price: 12, unit: 'oz' },
    { id: 4, name: 'White Onion', average_price: 1, unit: 'large' },
    { id: 5, name: 'Reduced Fat Mozzarella', average_price: 4, unit: 'g' },
    { id: 6, name: 'Reduced Fat Cheddar Cheese', average_price: 4, unit: 'g' },
    { id: 7, name: 'Non-Fat Greek Yogurt', average_price: 2, unit: 'g' },
    { id: 8, name: 'Chipotle in Adobo', average_price: 1, unit: 'g' },
    { id: 9, name: 'Ground Beef', average_price: 5, unit: 'lb' },
    { id: 10, name: 'Sweet Hawaiian Rolls', average_price: 2, unit: 'packs' },
    { id: 11, name: 'Bacon', average_price: 6, unit: 'lb' },
    { id: 12, name: 'Onion', average_price: 1.5, unit: 'large' },
    { id: 13, name: 'Apple Cider Vinegar', average_price: 0.25, unit: 'tbsp' },
    { id: 14, name: 'Brown Sugar', average_price: 1, unit: 'cup' },
    { id: 15, name: 'Maple Syrup', average_price: 0.5, unit: 'tbsp' },
    { id: 16, name: 'Mayonnaise', average_price: 1.5, unit: 'cup' },
    { id: 17, name: 'Mustard', average_price: 0.1, unit: 'tbsp' },
    { id: 18, name: 'Sweet Pickle Juice', average_price: 0.5, unit: 'tbsp' },
    { id: 19, name: 'Sweet Pickle Chips', average_price: 0.1, unit: 'pieces' },
    { id: 20, name: 'Chives', average_price: 0.25, unit: 'tbsp' },
    { id: 21, name: 'Chicken Breast', average_price: 3.5, unit: 'oz' },
    { id: 22, name: 'Turkey Bacon', average_price: 0.5, unit: 'slices' },
    { id: 23, name: 'Hot Honey', average_price: 3, unit: 'g' },
    { id: 24, name: 'Fresh Dill', average_price: 0.5, unit: 'tbsp' },
    { id: 25, name: 'Sweet Onion', average_price: 1.5, unit: 'pieces' },
    { id: 26, name: 'Jalapeños', average_price: 0.5, unit: 'pieces' },
    { id: 27, name: 'Garlic', average_price: 0.5, unit: 'cloves' },
    { id: 28, name: 'Chicken Bone Broth', average_price: 1, unit: 'oz' },
    { id: 29, name: 'Cottage Cheese (2%)', average_price: 6, unit: 'g' },
    { id: 30, name: 'Parmigiano Reggiano', average_price: 8, unit: 'g' },
    { id: 31, name: 'Fat-Free Milk', average_price: 1.5, unit: 'ml' },
    { id: 32, name: 'Pasta', average_price: 3, unit: 'g' },
    { id: 33, name: 'Salt', average_price: 0, unit: '' },
    { id: 34, name: 'Black Pepper', average_price: 0, unit: '' },
    { id: 35, name: 'Garlic Powder', average_price: 0, unit: '' },
    { id: 36, name: 'Paprika', average_price: 0, unit: '' },
    { id: 37, name: 'Red Chili Flakes', average_price: 0, unit: '' },
    { id: 38, name: 'Onion Powder', average_price: 0, unit: '' }
  ]);

  // Insert seed entries for recipes
  await knex('recipes').insert([
    {
      id: 1,
      name: 'Cheesesteak Potato Bowl',
      category: 'High Protein',
      calories: 530,
      protein: 62,
      carbohydrates: 22,
      fat: 18,
      servings: 6,
      instructions: `1. Chipotle Sauce: Blend 300g non-fat greek yogurt, 50g chipotle in adobo, and 3 minced garlic cloves. Season with salt and pepper. Chill.
      2. Prep Potatoes: Wash and cube potatoes. Soak in water for 30 minutes for crispiness. Toss with 1 tbsp olive oil, salt, pepper, garlic powder, and paprika.
      3. Air Fry Potatoes: Air fry potatoes at 400°F for 15-20 minutes, shaking halfway until crispy.
      4. Saute Veggies: Heat 1 tbsp olive oil, cook sliced onions and jalapeños until transparent. Cook steak, salt, and pepper to taste.
      5. Assemble: Layer air-fried potatoes, steak mixture, and cheese in containers. Top with chipotle sauce when serving.`,
      price: 18.15, // Total cost excluding spices
      image_url: ''
    },
    {
      id: 2,
      name: 'Grilled Cheese Smash Burger Slider',
      category: 'High Protein',
      calories: 450,
      protein: 28,
      carbohydrates: 30,
      fat: 25,
      servings: 8,
      instructions: `1. Make the Burger Sauce: Combine 3/4 cup mayo, 1 tbsp mustard, 1-3 tbsp sweet pickle juice, diced sweet pickle chips, chives, paprika, salt, and pepper. Set aside.
      2. Prepare the Bacon Jam: Cook bacon and onion until transparent. Add apple cider vinegar, brown sugar, and maple syrup. Mix until jam consistency. Set aside.
      3. Smash the Burgers: Heat griddle to 425°F. Smash the burgers, season, and cook until 85% done. Flip and add cheese.
      4. Assemble: Layer sauce, burger, bacon jam, more sauce, and top bun.`,
      price: 19.75, // Total cost excluding spices
      image_url: ''
    },
    {
      id: 3,
      name: 'Slow Cooker Chicken Bacon Ranch Mac and Cheese',
      category: 'High Protein',
      calories: 490,
      protein: 50,
      carbohydrates: 52,
      fat: 12,
      servings: 11,
      instructions: `1. Cook the Pasta: Cook pasta until 50% done.
      2. Bake the Bacon: Bake turkey bacon at 400°F until crispy.
      3. Blend the Sauce: Blend cottage cheese, parmigiano reggiano, fat-free milk, garlic powder, onion powder, salt, and pepper until smooth.
      4. Combine and Cook: Combine all ingredients in the slow cooker and cook on high for 2-3 hours or low for 3-4 hours.`,
      price: 23.55, // Total cost excluding spices
      image_url: ''
    }
  ]);
// db/seeds/recipes_seed.js

// db/seeds/recipes_seed.js

  // Insert seed entries for recipe_ingredients
  await knex('recipe_ingredients').insert([
    // Ingredients for Cheesesteak Potato Bowl
    { id: 1, recipe_id: 1, ingredient_id: 1, quantity: 4, unit: 'medium' }, // Potatoes
    { id: 2, recipe_id: 1, ingredient_id: 2, quantity: 1, unit: 'tbsp' }, // Olive Oil
    { id: 3, recipe_id: 1, ingredient_id: 3, quantity: 32, unit: 'oz' }, // Sirloin Steak
    { id: 4, recipe_id: 1, ingredient_id: 4, quantity: 1, unit: 'large' }, // White Onion
    { id: 5, recipe_id: 1, ingredient_id: 5, quantity: 120, unit: 'g' }, // Reduced Fat Mozzarella
    { id: 6, recipe_id: 1, ingredient_id: 6, quantity: 120, unit: 'g' }, // Reduced Fat Cheddar Cheese
    { id: 7, recipe_id: 1, ingredient_id: 7, quantity: 300, unit: 'g' }, // Non-Fat Greek Yogurt
    { id: 8, recipe_id: 1, ingredient_id: 8, quantity: 50, unit: 'g' }, // Chipotle in Adobo
    { id: 39, recipe_id: 1, ingredient_id: 33, quantity: 1, unit: 'tsp' }, // Salt (assuming 1 tsp)
    { id: 40, recipe_id: 1, ingredient_id: 34, quantity: 1, unit: 'tsp' }, // Black Pepper (assuming 1 tsp)
    { id: 41, recipe_id: 1, ingredient_id: 35, quantity: 1, unit: 'tsp' }, // Garlic Powder (assuming 1 tsp)
    { id: 42, recipe_id: 1, ingredient_id: 36, quantity: 1, unit: 'tsp' }, // Paprika (assuming 1 tsp)

    // Ingredients for Grilled Cheese Smash Burger Slider
    { id: 9, recipe_id: 2, ingredient_id: 9, quantity: 2, unit: 'lb' }, // Ground Beef (2 lbs)
    { id: 10, recipe_id: 2, ingredient_id: 10, quantity: 2, unit: 'packs' }, // Sweet Hawaiian Rolls
    { id: 11, recipe_id: 2, ingredient_id: 11, quantity: 1, unit: 'lb' }, // Bacon
    { id: 12, recipe_id: 2, ingredient_id: 12, quantity: 1, unit: 'large' }, // Onion
    { id: 13, recipe_id: 2, ingredient_id: 13, quantity: 2, unit: 'tbsp' }, // Apple Cider Vinegar
    { id: 14, recipe_id: 2, ingredient_id: 14, quantity: 1/8, unit: 'cup' }, // Brown Sugar
    { id: 15, recipe_id: 2, ingredient_id: 15, quantity: 3, unit: 'tbsp' }, // Maple Syrup
    { id: 16, recipe_id: 2, ingredient_id: 16, quantity: 3/4, unit: 'cup' }, // Mayonnaise
    { id: 17, recipe_id: 2, ingredient_id: 17, quantity: 1, unit: 'tbsp' }, // Mustard
    { id: 18, recipe_id: 2, ingredient_id: 18, quantity: 1, unit: 'tbsp' }, // Sweet Pickle Juice
    { id: 19, recipe_id: 2, ingredient_id: 19, quantity: 4, unit: 'pieces' }, // Sweet Pickle Chips
    { id: 20, recipe_id: 2, ingredient_id: 20, quantity: 1, unit: 'tbsp' }, // Chives
    { id: 43, recipe_id: 2, ingredient_id: 33, quantity: 1, unit: 'tsp' }, // Salt (assuming 1 tsp)
    { id: 44, recipe_id: 2, ingredient_id: 34, quantity: 1, unit: 'tsp' }, // Black Pepper (assuming 1 tsp)
    { id: 45, recipe_id: 2, ingredient_id: 35, quantity: 1, unit: 'tsp' }, // Garlic Powder (assuming 1 tsp)
    { id: 46, recipe_id: 2, ingredient_id: 36, quantity: 1, unit: 'tsp' }, // Paprika (assuming 1 tsp)

    // Ingredients for Slow Cooker Chicken Bacon Ranch Mac and Cheese
    { id: 21, recipe_id: 3, ingredient_id: 21, quantity: 32, unit: 'oz' }, // Chicken Breast
    { id: 22, recipe_id: 3, ingredient_id: 22, quantity: 6, unit: 'slices' }, // Turkey Bacon
    { id: 23, recipe_id: 3, ingredient_id: 23, quantity: 30, unit: 'g' }, // Hot Honey
    { id: 24, recipe_id: 3, ingredient_id: 24, quantity: 1, unit: 'tbsp' }, // Fresh Dill
    { id: 25, recipe_id: 3, ingredient_id: 25, quantity: 3, unit: 'pieces' }, // Sweet Onion
    { id: 26, recipe_id: 3, ingredient_id: 26, quantity: 6, unit: 'pieces' }, // Jalapeños
    { id: 27, recipe_id: 3, ingredient_id: 27, quantity: 8, unit: 'cloves' }, // Garlic
    { id: 28, recipe_id: 3, ingredient_id: 28, quantity: 16, unit: 'oz' }, // Chicken Bone Broth
    { id: 29, recipe_id: 3, ingredient_id: 29, quantity: 800, unit: 'g' }, // Cottage Cheese (2%)
    { id: 30, recipe_id: 3, ingredient_id: 30, quantity: 160, unit: 'g' }, // Parmigiano Reggiano
    { id: 31, recipe_id: 3, ingredient_id: 31, quantity: 420, unit: 'ml' }, // Fat-Free Milk
    { id: 32, recipe_id: 3, ingredient_id: 32, quantity: 672, unit: 'g' }, // Pasta
    { id: 47, recipe_id: 3, ingredient_id: 33, quantity: 1, unit: 'tsp' }, // Salt (assuming 1 tsp)
    { id: 48, recipe_id: 3, ingredient_id: 34, quantity: 1, unit: 'tsp' }, // Black Pepper (assuming 1 tsp)
    { id: 49, recipe_id: 3, ingredient_id: 35, quantity: 1, unit: 'tsp' }, // Garlic Powder (assuming 1 tsp)
    { id: 50, recipe_id: 3, ingredient_id: 38, quantity: 1, unit: 'tsp' }, // Onion Powder (assuming 1 tsp)
  ]);
};
