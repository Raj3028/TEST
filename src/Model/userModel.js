const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true

    },

    city: {
        type: String,
        required: true,
        trim: true
    },

    mobile: {
        type: Number
    },

    mediaurl: String,

    ID: String

}, { timestamps: true })


module.exports = mongoose.model('User', userSchema)