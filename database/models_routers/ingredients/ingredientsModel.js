const db = require("../../dbConfig.js");

module.exports = {
  findAllIngredients,
  findById,
  add,
  removeIngredient,
  updateIngredient,
  findByRecipe,
  checkIngredient,
  addQuantity
};

function findAllIngredients() {
  return db("ingredients");
}

function findById(id) {
  return db("ingredients")
    .where({ id })
    .first();
}

async function add(ingredient) {
  const [id] = await db("ingredients").insert({ title: ingredient });
  return id;
}

function removeIngredient(id) {
  return db("ingredients")
    .where({ id })
    .del();
}

function updateIngredient(id, changes) {
  return db("ingredients")
    .where({ id })
    .update(changes)
    .then(count => {
      return findById(id);
    });
}
async function findByRecipe(recipe_id) {
  const ingredients = await db("recipe_ingredients as ri")
    .where({ recipe_id: recipe_id })
    .join("ingredients as i", "i.id", "ri.ingredient_id")
    .select("ri.quantity as quantity", "i.title as ingredient");
  return ingredients;
}

async function checkIngredient(ingredient_title) {
  const id = await db("ingredients")
    .where({ title: ingredient_title })
    .select("id")
    .first();
  if (id) {
    return id;
  } else {
    return null;
  }
}

async function addQuantity(quantity, recipe_id, ingredient_title) {
  checkIngredient(ingredient_title)
    .then(ingredient_id => {
      if (!ingredient_id) {
        add(ingredient_title)
          .then(ingredient_id => {
            const id = addRecipe_Ingredients(
              quantity,
              recipe_id,
              ingredient_id
            );
            return id;
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        const id = addRecipe_Ingredients(quantity, recipe_id, ingredient_id);
        return id;
      }
    })
    .catch(error => {
      console.log(error);
    });
}

async function addRecipe_Ingredients(quantity, recipe_id, ingredient_id) {
  const ingredient = { quantity, recipe_id, ingredient_id };
  const [id] = await db("recipe_ingredients").insert(ingredient);
  return id;
}
