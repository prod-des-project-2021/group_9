const recipesRouter = require('express').Router()
const Recipe = require('../models/recipe')
const User = require('../models/user')

const config = require('../utils/config')
const logger = require('../utils/logger')
const createRecipe = require('../utils/foodgen')

const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')
const jwtAuth = require('../middleware/jwt')
/* const uuidv4 = require('uuid').v4;
const images = require('../utils/images') */

cloudinary.config(config.cloudinaryConfig)
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "DEV"
    }
})
const upload = multer({
    storage: storage,
    limits: {
        fields: 4,
        fileSize: 1000000000
    },
    fileFilter: async (req, file, cb) => {
        const filetypes = ["image/jpeg", "image/jpg", "image/png"]
        if (filetypes.includes(file.mimetype)) {
            try {
                cb(null, true)
            } catch (err) {
                cb(err, false)
            }
        }
    }
})

// Get recipes
recipesRouter.get('/', async (req, res) => {
    let filter = {};
    if (req.query.name) {
        filter = { name: { $regex: req.query.name, $options: 'i'} }
    } else if (req.query.user) {
        filter = { user: req.query.user }
    }
    const recipes = await Recipe.find(filter).populate('user', { username: 1 })
    res.status(200).json(recipes)
})

// Get one recipe
recipesRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const recipe = await Recipe.findById(id).populate('user', { username: 1})
    res.status(200).json(recipe)
})

// Create
// can this be upload.single() ????
recipesRouter.post('/', [jwtAuth, upload.any()], async (req, res) => {
    const url = req.files[0] ? req.files[0].path : ''
    logger.print("URL:", url)
    const body = req.body
    const newRecipe = new Recipe({
        name: body.name,
        user: body.user,
        ingredients: JSON.parse(body.ingredients),
        steps: JSON.parse(body.steps),
        url
    })
    const savedRecipe = await newRecipe.save()
    // update users 'recipes' field
    await User.findByIdAndUpdate(body.user, {$push: {"recipes": savedRecipe._id}})

    res.status(201).json(savedRecipe)
})

// Update
recipesRouter.put('/:id', jwtAuth, async (req, res) => {
    const id = req.params.id
    const updatedRecipe = req.body
    const savedRecipe = await Recipe.findByIdAndUpdate(id, updatedRecipe, { new: true })
    res.status(200).json(savedRecipe)
})

// Delete
recipesRouter.delete('/:id', jwtAuth, async (req, res) => {
    const id = req.params.id
    const result = await Recipe.findByIdAndRemove(id)
    res.status(200).json(result)
})

// Generate recipes
recipesRouter.get('/create', jwtAuth, async (req, res) => {
    for (let i = 0; i < 4; i++) {
        const newRecipe = new Recipe(createRecipe())
        await newRecipe.save()
    }
    const recipes = await Recipe.find({})
    res.json(recipes)
})

/* recipesRouter.post('/generateIds', jwtAuth, async (req, res) => {
    const recipes = await Recipe.find({})
    for (const recipe of recipes) {
        const ingredients = [...recipe.ingredients]
        // ingredients = [{name: "blaa", amount: 2, unit: "kg"}, {}]
        for (const ingredient of ingredients) {
            ingredient.id = uuidv4()
        }
        const updatedRecipe = { ...recipe, ingredients }
        await Recipe.findByIdAndUpdate(recipe.id, updatedRecipe)
    }
    res.sendStatus(200)
}) */

/* recipesRouter.post('/generatePics', jwtAuth, async (req, res) => {
    const recipes = await Recipe.find({})
    for (const recipeDoc of recipes) {
        if (recipeDoc.url) continue
        const recipe = recipeDoc._doc
        const url = images[Math.floor(Math.random() * images.length)]
        const updatedRecipe = { ...recipe, url }
        await Recipe.findByIdAndUpdate(recipe._id, updatedRecipe)
    }
    res.sendStatus(200)
}) */

/* const users = [
    '619f688458c6bdc130a213ae',
    '61af398af9eb363fb00daf4d',
    '61b73da37d055ccfc08be5a8',
    '61b9bc3ad15a45e141829423'
]

recipesRouter.post('/generateOwnership', async (req, res) => {
    // get all recipes
    const recipes = await Recipe.find({})
    for (const recipeDoc of recipes) {
        const recipe = recipeDoc._doc
        // give them random owners from 'users' array
        const user = users[Math.floor(Math.random() * users.length)]
        const updatedRecipe = { ...recipe, user }
        await Recipe.findByIdAndUpdate(recipe._id, updatedRecipe)

        // after giving a recipe its new owner, UPDATE owner's 'recipes' array
        await User.findByIdAndUpdate(user, {$push: {"recipes": recipe._id}})
    }
    res.sendStatus(200)
}) */

/* // placeholder imageupload route for testing!
recipesRouter.post('/image', upload.single("file"), async (req, res) => {
    // we should validate the image? with clodinary maybe?
    res.json({ picture: req.file.path })
}) */


module.exports = recipesRouter