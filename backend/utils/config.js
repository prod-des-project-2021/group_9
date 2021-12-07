require('dotenv').config()


const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI



cloudinaryConfig = {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
}

module.exports = {
    PORT,
    MONGODB_URI,
    cloudinaryConfig
}