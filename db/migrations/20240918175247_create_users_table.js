
db/migrations/_create_users_table.js
exports.up = function(knex) {
return knex.schema.createTable('users', function(table) {
  table.increments('id').primary();
  table.string('username').notNullable().unique();
  table.string('password').notNullable();
});
};

exports.down = function(knex) {
return knex.schema.hasTable('users').then(function(exists) {
  if (exists) {
    return knex.schema.dropTable('users');
  }
});
};