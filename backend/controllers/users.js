const jwt = require('jsonwebtoken')
const jwtAuth = require('../middleware/jwt')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

const config = require('../utils/config')
const logger = require('../utils/logger')

/* // Get all users
usersRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
}) */

// Login
usersRouter.post('/login', async (req, res) => {
    const body = req.body
    const user = await User.findOne({ username: body.username })
    const passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({ error: 'invalid username or password' })
    }
    const userObjectForToken = {
        username: user.username,
        id: user.id
    }

    const token = jwt.sign(userObjectForToken, process.env.SECRET, { expiresIn: 60 * 60 })

    res.status(200).json({ token, ...userObjectForToken })
})

// Get one user
usersRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    const user = await User.findById(id)
    res.status(200).json(user)
})

// Create
usersRouter.post('/', async (req, res) => {
    const body = req.body
    if (body.password.length < 6) { throw new Error('password must be at least 6 characters') }
    const passwordHash = await bcrypt.hash(body.password, 10)

    const newUser = new User({
        username: body.username,
        email: body.email,
        passwordHash,
    })
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
})



usersRouter.get('/:id/shoppinglist', jwtAuth, async (req, res) => {
    const id = req.params.id
    const user = req.user
    if (id !== user.id) res.sendStatus(403)

    const savedUser = await User.findById(id)
    res.status(200).json(savedUser)
})

usersRouter.put('/:id/shoppinglist', jwtAuth, async (req, res) => {
    const id = req.params.id
    const user = req.user
    if (id !== user.id) res.sendStatus(403)
    const shoppingList = req.body.shoppingList
    const savedUser = await User.findByIdAndUpdate(id, { shoppingList }, { new: true })
    res.status(200).json(savedUser)
})

usersRouter.put('/:id/shoppinglist/add', jwtAuth, async (req, res) => {
    const id = req.params.id
    const user = req.user
    if (id !== user.id) res.sendStatus(403)
    const newIngredient = req.body.ingredient
    const userDoc = await User.findById(id)
    const shoppingList = userDoc.shoppingList.concat(newIngredient)
    const savedUser = await User.findByIdAndUpdate(id, { shoppingList }, { new: true })
    res.status(200).json(savedUser)
})

// which properties are allowed to be updated?
/* // Update
usersRouter.put('/:id', async (req, res) => {
    const id = req.params.id
    const updatedUser = req.body
    const savedUser = await User.findByIdAndUpdate(id, updatedUser, { new: true })
    res.status(200).json(savedUser)
}) */

/* // Delete
usersRouter.delete('/:id', async (req, res) => {
    const id = req.params.id
    const result = await User.findByIdAndRemove(id)
    res.status(200).json(result)
}) */

module.exports = usersRouter