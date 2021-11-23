const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cloudinary = require('cloudinary').v2
const recipesRouter = require('./controllers/recipes')
// const usersRouter = require('./controllers/users')
const mongoose = require('mongoose')
const expressValidator = require('express-validator')

cloudinary.config(config.cloudinaryConfig)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.print('connected to MongoDB')
    })
    .catch((err) => {
        logger.print('errror connecting to MongoDB:', err.message)
    })

app.use(express.static('build'))
app.use(express.json())
app.use(expressValidator({
    customValidators: {
        isImage: (value, filename) => {
            const extension = (path.extname(filename)).toLowerCase()
            switch (extension) {
                case '.jpg':
                    return '.jpg'
                case '.jpeg':
                    return '.jpeg'
                case '.png':
                    return '.png'
                default:
                    return false;
            }
        }
    }
}))
morgan.token('data', (req) => {
    if (req.method === 'POST')
        return JSON.stringify(req.body)
    else
        return
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.use('/api/recipes', recipesRouter)
//app.use('/api/users', usersRouter)



module.exports = app