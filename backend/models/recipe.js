const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    name: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ratings: [],
    ingredients: [],
    steps: [],
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