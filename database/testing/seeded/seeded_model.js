const db = require('../../dbConfig.js');

module.exports = {
    findAllSeededRecipes,
    findById,
    add,
    removeSeededRecipe,
    updateSeededRecipe
  };
  
  function findAllSeededRecipes() {
    return db('recipes_seeded');
  }
  
  function findById(id) {
    return db('recipes_seeded')
      .where({ id })
      .first();
}

async function add(recipes_seeded) {
  const [id] = await db('seeded_recipes').insert(recipes_seeded);

  return findById(id);
}


function removeSeededRecipe(id) {
  return db('recipes_seeded')
    .where({ id })
    .del()
}

function updateSeededRecipe(id, changes) {
  return db('recipes_seeded').where({ id }).update(changes)
  .then(count => {
      return findById(id)
  })
}