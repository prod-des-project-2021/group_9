require('dotenv').config()
const express = require('express')
const http = require('http')

const app = express()

app.use(express.static('build'))


const server = http.createServer(app)

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})