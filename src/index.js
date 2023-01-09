const express = require('express')
const mongoose = require('mongoose')
const route = require('./routes/route')

const app = express()
require('dotenv').config()

app.use(express.json())

mongoose.set('strictQuery', false)
mongoose.connect(process.env.DB, { useNewUrlParser: true })

    .then(() => { console.log('Your Database now Connected...') })
    .catch((error) => { console.log(error) })

app.use('/', route)

app.listen(process.env.PORT, () => console.log(`Your Server running on Port: ${process.env.PORT}...`))