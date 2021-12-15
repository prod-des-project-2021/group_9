// utils
const config = require('./utils/config')
const logger = require('./utils/logger')

// express
const express = require('express')
const app = express()
const expressValidator = require('express-validator')
require('express-async-errors')

// middleware
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

// routes
const recipesRouter = require('./controllers/recipes')
const usersRouter = require('./controllers/users')

// databases
const mongoose = require('mongoose')
const cloudinary = require('cloudinary').v2


cloudinary.config(config.cloudinaryConfig)


mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.print('connected to MongoDB')
    })
    .catch((err) => {
        logger.print('errror connecting to MongoDB:', err.message)
    })
app.use(cors({ origin: "*" }))
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

morgan.token('data', (req) => {
    if (req.method === 'POST')
        return JSON.stringify(req.body)
    else
        return
})
app.use(morgan(':method :remote-addr :url :status :date :data'))

app.use('/api/recipes', recipesRouter)
app.use('/api/users', usersRouter)



module.exports = app