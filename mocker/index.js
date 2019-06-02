const ingredients = require('../data-v1/ingredients-no-null-cuisines.clustered.json');
const pairings = require('../data-v1/pairings-no-null-cuisines.clustered.json');
const cuisines = require('../data-v1/cuisines.json');

const proxy = {
  'GET /graph.json': (req, res) => res.json({
    nodes: ingredients,
    links: pairings,
  }),
  'GET /ingredient/:id': (req, res) => {
    const { id } = req.params;
    return res.json(
      ingredients[ingredients.map(ingredient => ingredient.id).indexOf(id)],
    );
  },
  'GET /cuisines.json': (req, res) => res.json(
    cuisines.map(
      cuisine => ({
        id: cuisine.id,
        name: cuisine.name,
        ingredients: cuisine.ingredients,
      }),
    ),
  ),
  'GET /cuisine/:id': (req, res) => {
    const { id } = req.params;
    return res.json(
      cuisines[cuisines.map(cuisine => cuisine.id).indexOf(id)],
    );
  },
};

module.exports = proxy;
