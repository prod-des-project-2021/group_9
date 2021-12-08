const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    name: String,
    user: String,
    ratings: [],
    ingredients: [],
    image: String,

}, { timestamps: true })

recipeSchema.set('toJSON', {
    transform: (document, res) => {
        res.id = res._id.toString()
        delete res._id
        delete res.__v
        delete res.updatedAt
    }
})


module.exports = mongoose.model('Recipe', recipeSchema)