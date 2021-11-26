const logger = require('../utils/logger')

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
    logger.print(err.message)

    // switch statement for different kinds of errors
    switch (err.name) {
        case 'ValidationError':
            return res.status(400).json({ error: err.message })
        default:
            next(err)
    }
}

module.exports = {
    unknownEndpoint,
    errorHandler
}