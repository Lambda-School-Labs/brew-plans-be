exports.up = function(knex) {
  return knex.schema
    .createTable('recipes_seeded', seededRecipes => {
      seededRecipes.increments();

      seededRecipes
        .string('name', 60)
        .notNullable();
      seededRecipes.string('creator');
      seededRecipes
        .integer('water_temperature')
        .notNullable();
      seededRecipes
        .string('coarseness')
        .notNullable();
      seededRecipes
        .string('tools_ingredients', 1000)
        .notNullable();
      seededRecipes
        .string('instructions', 1000)
        .notNullable();
      seededRecipes
        .integer('yield');
      seededRecipes
        .integer('duration');
    })
    .createTable('recipes_users', userRecipes => {
      userRecipes.increments();

      userRecipes.binary('public_private');
      userRecipes
        .string('name', 60)
        .notNullable();
      userRecipes.string('creator');
      userRecipes
        .integer('water_temperature')
        .notNullable();
      userRecipes
        .string('coarseness')
        .notNullable();
      userRecipes
        .string('tools_ingredients', 1000)
        .notNullable();
      userRecipes
        .integer('yield');
      userRecipes
        .integer('duration');
    })
    .createTable('user_instructions', instructions => {
      instructions.increments();

      instructions
        .integer('order')
        .notNullable();
      instructions
        .string('content')
        .notNullable();
      instructions
        .integer('recipe_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('recipes_users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      instructions.integer('yield');
      instructions.integer('duration');
    })
    .createTable('user_tools', tools => {
      tools.increments();

      tools
        .string('tool', 60)
        .notNullable();
    })
    .createTable('user_ingredients', ingredients => {
      ingredients.increments();

      ingredients
        .string('ingredient', 60)
        .notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('ingredients')
    .dropTableIfExists('tools')
    .dropTableIfExists('instructions')
    .dropTableIfExists('recipes_users')
    .dropTableIfExists('recipes_seeded');
};
