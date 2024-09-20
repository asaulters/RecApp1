// db/migrations/<timestamp>_create_user_favorites_table.js

exports.up = function(knex) {
  return knex.schema.createTable('user_favorites', (table) => {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.integer('recipe_id').references('id').inTable('recipes').onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_favorites');
};