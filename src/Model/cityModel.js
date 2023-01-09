const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({

    cityName: {
        type: String,
        require: true,
        unique: true,
        trim: true
    }

}, { timestamps: true })


module.exports = mongoose.model('City', citySchema)