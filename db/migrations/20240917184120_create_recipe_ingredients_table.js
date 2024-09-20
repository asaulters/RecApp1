// db/migrations/xxxx_create_recipe_ingredients_table.js
exports.up = function(knex) {
  return knex.schema.createTable('recipe_ingredients', function(table) {
    table.increments('id').primary();
    table
      .integer('recipe_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('recipes')
      .onDelete('CASCADE');
    table
      .integer('ingredient_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('ingredients');
    table.float('quantity').notNullable();
    table.string('unit').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('recipe_ingredients');
};