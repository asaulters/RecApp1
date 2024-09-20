// db/migrations/xxxx_create_recipes_table.js
exports.up = function(knex) {
  return knex.schema.createTable('recipes', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('category');
    table.integer('calories');
    table.integer('protein');
    table.integer('carbohydrates');
    table.integer('fat');
    table.text('instructions');
    table.string('image_url');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('recipes');
};