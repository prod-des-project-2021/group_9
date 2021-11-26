const recipesRouter = require('express').Router()
const Recipe = require('../models/recipe')

const config = require('../utils/config')
const logger = require('../utils/logger')
const createRecipe = require('../utils/foodgen')

const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')
const basicAuth = require('express-basic-auth')
// const { body } = require('express-validator')

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
        fields: 1,
        fileSize: 1000000000
    },
    fileFilter: function (_req, file, cb) {
        checkFileType(file, cb)
    }
})

const checkFileType = (file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (mimetype && extname) {
        return cb(null, true)
    } else {
        cb('Error: Images Only!')
    }
}

const authOptions = {
    users: { 'admin': process.env.AUTH_PW },
    challenge: true
}

// Get all recipes
recipesRouter.get('/', async (req, res) => {
    const recipes = await Recipe.find({})
    res.status(200).json(recipes)
})

// Get one recipe
recipesRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const recipe = await Recipe.findById(id)
    res.status(200).json(recipe)
})

// Create
recipesRouter.post('/', [basicAuth(authOptions), upload.single("file")], async (req, res) => {
    const url = req.file ? req.file.path : ''
    const newRecipe = new Recipe({
        ...req.body,
        url
    })
    const savedRecipe = await newRecipe.save()
    res.status(201).json(savedRecipe)
})

// Update
recipesRouter.put('/:id', async (req, res) => {
    const id = req.params.id
    const updatedRecipe = req.body
    const savedRecipe = await Recipe.findByIdAndUpdate(id, updatedRecipe, { new: true })
    res.status(200).json(savedRecipe)
})

// Delete
recipesRouter.delete('/:id', async (req, res) => {
    const id = req.params.id
    const result = await Recipe.findByIdAndRemove(id)
    res.status(200).json(result)
})

// Generate recipes
recipesRouter.get('/create', async (req, res) => {
    for (let i = 0; i < 4; i++) {
        const newRecipe = new Recipe(createRecipe())
        await newRecipe.save()
    }
    const recipes = await Recipe.find({})
    res.json(recipes)
})

/* // placeholder imageupload route for testing!
recipesRouter.post('/image', upload.single("file"), async (req, res) => {
    // we should validate the image? with clodinary maybe?
    res.json({ picture: req.file.path })
}) */


module.exports = recipesRouter