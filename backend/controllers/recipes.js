const recipesRouter = require('express').Router()
const { response } = require('../app')
const Recipe = require('../models/recipe')

const createRecipe = require('../utils/foodgen')

// Get all recipes
recipesRouter.get('/', async (req, res) => {
    const recipes = await Recipe.find({})
    res.json(recipes)
})

// Post
recipesRouter.post('/', async (req, res) => {
    const newRecipe = new Recipe(req.body)
    const savedRecipe = await newRecipe.save()
    res.status(201).json(savedRecipe)
})

// Update
recipesRouter.put('/:id', async (req, res) => {
    const id = req.params.id
    const updatedRecipe = req.body
    const savedRecipe = await Recipe.findByIdAndUpdate(id, updatedRecipe, { new: true })
    response.status(200).json(savedRecipe)
})

// Delete
recipesRouter.put('/:id', async (req, res) => {
    const id = req.params.id
    const result = await Recipe.findByIdAndRemove(id)
    response.status(200).json(result)
})

// Generate recipes
recipesRouter.get('/create', async (req, res) => {
    for (let i = 0; i < 4; i++) {
        const newRecipe = new Recipe()
        await newRecipe.save()
        console.log(createRecipe())
    }
    const recipes = await Recipe.find({})
    res.json(recipes)
})

module.exports = recipesRouter