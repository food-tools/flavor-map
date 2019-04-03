const faker = require("faker");
const uuid = require("uuid/v4");

// Some random values
const type = ["vegetable", "fruit", "grain", "dairy", "fat", "nut", "meat", "herb", "spice"];
const seasons = ["spring", "summer", "autumn", "winter"];
const tastes = ["salty", "savory", "sweet", "sour"];
const botanical_relatives = ["test"];
const functions = ["test"];
const weights = ["heavy", "medium", "light"];
const volumes = ["quiet", "loud", "moderate-loud", "moderate"];
const tips = ["test"];
const techniques = ["test"];

// Make random ingredients nodes
// const randomNumberOfIngredients = Math.ceil(Math.random() * 500);
// const randomNumberOfPairings = Math.ceil(Math.random() * 1000);
// const randomNumberOfCuisines = Math.ceil(Math.random() * 30);

// concrete amounts of nodes and links for graph testing
const randomNumberOfIngredients = 100;
const randomNumberOfPairings = 150;
const randomNumberOfCuisines = 30;

const ingredients = require('../data-v1/ingredients.json');
const pairings = require('../data-v1/pairings.json');
const cuisines = require('../data-v1/cuisines.json');

const old_ingredients = new Array(randomNumberOfIngredients)
    .fill(undefined)
    .map(nothing => ({
        id: uuid(),
        name: faker.fake("{{random.word}} {{random.word}}"),
        type: type[Math.floor(Math.random() * type.length)],
        function: functions[Math.floor(Math.random() * functions.length)],
        season: seasons[Math.floor(Math.random() * seasons.length)],
        taste: tastes[Math.floor(Math.random() * tastes.length)],
        weight: weights[Math.floor(Math.random() * weights.length)],
        volume: volumes[Math.floor(Math.random() * volumes.length)],
        techniques: faker.fake("{{random.word}} {{random.word}} {{random.word}}")
    }));

const old_pairings = new Array(randomNumberOfPairings)
    .fill(undefined)
    .map(nothing => ({
        source: ingredients[Math.floor(Math.random() * ingredients.length)].id,
        target: ingredients[Math.floor(Math.random() * ingredients.length)].id
    }))
    .filter(pairing =>
        pairing.source != pairing.target
    );

const old_cuisines = new Array(randomNumberOfCuisines)
    .fill(undefined)
    .map(nothing => ({
        id: uuid(),
        name: faker.fake("{{random.word}} {{random.word}}"),
        ingredients: Array.from(
            new Set(
                new Array(Math.ceil(Math.random() * 100))
                    .fill(undefined)
                    .map(nothing => ingredients[Math.floor(Math.random() * ingredients.length)].id)
                )
            )
    }));

const proxy = {
    "GET /graph": (req, res) => {
        setTimeout(function() {
            return res.json({
                nodes: ingredients,
                links: pairings
            });
        }, Math.ceil(Math.random() * 10000));
    },
    "GET /ingredient/:id": (req, res) => {
        const { id } = req.params;
        return res.json(
            ingredients[ingredients.map(ingredient => ingredient.id).indexOf(id)]
        );
    },
    "GET /cuisines": (req, res) => {
        setTimeout(function() {
            return res.json(cuisines.map(cuisine => ({
                id: cuisine.id,
                name: cuisine.name,
                ingredients: cuisine.ingredients
            })));
        }, Math.ceil(Math.random() * 10000));
    },
    "GET /cuisine/:id": (req, res) => {
        const { id } = req.params;
        return res.json(
            cuisines[cuisines.map(cuisine => cuisine.id).indexOf(id)]
        );
    }
}

module.exports = proxy;
