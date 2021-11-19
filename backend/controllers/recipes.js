const recipesRouter = require('express').Router()
const Recipe = require('../models/recipe')

const createRecipe = require('../utils/foodgen')

// Get all recipes
recipesRouter.get('/', async (req, res) => {
    const recipes = await Recipe.find({})
    res.json(recipes)
})

// Post a recipe
recipesRouter.post('/', async (req, res) => {
    const newRecipe = new Recipe(req.body)
    const savedRecipe = await newRecipe.save()
    res.status(201).json(savedRecipe)
})

recipesRouter.get('/create', async (req, res) => {
    for (let i = 0; i < 4; i++) {
        // const newRecipe = new Recipe()
        // await newRecipe.save()
        console.log(createRecipe())
    }
    const recipes = await Recipe.find({})
    res.json(recipes)
})

module.exports = recipesRouter