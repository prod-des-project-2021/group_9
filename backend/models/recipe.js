const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    name: String,
    ownerdId: String,
    ratings: [],
    ingredients: [],

}, { timestamps: true })

recipeSchema.set('toJSON', {
    transform: (document, res) => {
        res.id = res._id.toString()
        delete res._id
        delete res.__v
        delete res.createdAt
        delete res.updatedAt
    }
})

/* 
    name:
    ownerId:
    timestamp?
    ratings [
        {
            userId:
            rating (1-5): {
                taste:
                difficulty:
                duration:
            }
            comment?:
            timestamp:
        },
        {
            ...
        }
    ]
    parentRecipeId?:

    ingredients: []
    instructions: []
    images: []
     */


module.exports = mongoose.model('Recipe', recipeSchema)