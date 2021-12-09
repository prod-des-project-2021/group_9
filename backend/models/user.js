const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: (email) => {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
    passwordHash: String,
    pantry: [],
    recipes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }
    ],
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }
    ]
}, { timestamps: true })

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, res) => {
        res.id = res._id.toString()
        delete res._id
        delete res.__v
        delete res.updatedAt
        delete res.passwordHash
        delete res.email
    }
})

module.exports = mongoose.model('User', userSchema)