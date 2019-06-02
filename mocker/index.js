const faker = require('faker');
const uuid = require('uuid/v4');

// Some random values
/*
const type = ["vegetable", "fruit", "grain", "dairy", "fat", "nut", "meat", "herb", "spice"];
const seasons = ["spring", "summer", "autumn", "winter"];
const tastes = ["salty", "savory", "sweet", "sour"];
const botanical_relatives = ["test"];
const functions = ["test"];
const weights = ["heavy", "medium", "light"];
const volumes = ["quiet", "loud", "moderate-loud", "moderate"];
const tips = ["test"];
const techniques = ["test"];
*/

// Make random ingredients nodes
// const randomNumberOfIngredients = Math.ceil(Math.random() * 500);
// const randomNumberOfPairings = Math.ceil(Math.random() * 1000);
// const randomNumberOfCuisines = Math.ceil(Math.random() * 30);

// concrete amounts of nodes and links for graph testing
/*
const randomNumberOfIngredients = 100;
const randomNumberOfPairings = 150;
const randomNumberOfCuisines = 30;
*/

const ingredients = require('../data-v1/ingredients.clustered.json');
const pairings = require('../data-v1/pairings.json');
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
