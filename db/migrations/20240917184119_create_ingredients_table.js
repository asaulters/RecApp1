// db/migrations/xxxx_create_ingredients_table.js
exports.up = function(knex) {
  return knex.schema.createTable('ingredients', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable().unique();
    table.float('average_price').notNullable();
    table.integer('calories');
    table.integer('protein');
    table.integer('carbohydrates');
    table.integer('fat');
    table.string('unit'); // e.g., 'g', 'oz', 'cup'
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('ingredients');
};

