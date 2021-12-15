const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const authenticateJWT = (req, res, next) => {
    const header = req.headers.authorization
    if (header) {
        const token = header.split(' ')[1]

        jwt.verify(token, config.JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            req.user = user
            next()
        })

    } else res.sendStatus(401)
}

module.exports = authenticateJWT