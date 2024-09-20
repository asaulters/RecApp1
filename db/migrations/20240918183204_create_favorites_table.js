db/migrations/_create_favorites_table.js
exports.up = function(knex) {
  return knex.schema.createTable('favorites', function(table) {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.integer('recipe_id').unsigned().notNullable();

    table.foreign('user_id').references('users.id').onDelete('CASCADE');
    table.foreign('recipe_id').references('recipes.id').onDelete('CASCADE');

    table.unique(['user_id', 'recipe_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('favorites');
};