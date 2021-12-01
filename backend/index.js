const config = require('./utils/config')
const http = require('http')
const app = require('./app')
const logger = require('./utils/logger')


const server = http.createServer(app)

server.listen(config.PORT, () => {
    logger.print(`Server running on port ${config.PORT}`)
})