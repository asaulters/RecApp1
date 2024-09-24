exports.up = function(knex) {
    return knex.schema.table('ingredients', function(table) {
      table.integer('recipe_id').unsigned().references('id').inTable('recipes');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('ingredients', function(table) {
      table.dropColumn('recipe_id');
    });
  };
  