const faker = require("faker");
const uuid = require("uuid/v4");

// Some random values
const seasons = ["spring", "summer", "autumn", "winter"];
const tastes = ["salty", "savory", "sweet", "sour"];
const weights = ["heavy", "medium", "light"];
const volumes = ["quiet", "loud", "moderate-loud", "moderate"];

// Make random ingredients nodes
const randomNumberOfIngredients = Math.ceil(Math.random() * 500);
const randomNumberOfPairings = Math.ceil(Math.random() * 500);
const ingredients = new Array(randomNumberOfIngredients)
    .fill(undefined)
    .map(nothing => ({
        id: uuid(),
        name: faker.fake("{{random.word}} {{random.word}}"),
        season: seasons[Math.floor(Math.random() * seasons.length)],
        taste: tastes[Math.floor(Math.random() * tastes.length)],
        weight: weights[Math.floor(Math.random() * weights.length)],
        volume: volumes[Math.floor(Math.random() * volumes.length)],
        techniques: faker.fake("{{random.word}} {{random.word}} {{random.word}}")
    }));

const pairings = new Array(randomNumberOfPairings)
    .fill(undefined)
    .map(nothing => ({
        source: ingredients[Math.floor(Math.random() * ingredients.length)].id,
        target: ingredients[Math.floor(Math.random() * ingredients.length)].id
    }))
    .filter(pairing =>
        pairing.source != pairing.target
    );

const proxy = {
    "GET /graph": (req, res) => {
        return res.json({
            nodes: ingredients.map(ingredient => ({
                id: ingredient.id,
                name: ingredient.name
            })),
            links: pairings
        });
    },
    "GET /ingredient/:id": (req, res) => {
        const { id } = req.params;
        return res.json(
            ingredients[ingredients.map(ingredient => ingredient.id).indexOf(id)]
        );
    }
}

module.exports = proxy;
