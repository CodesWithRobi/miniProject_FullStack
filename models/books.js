const mongoose = require('mongoose')
const bookSchema = mongoose.Schema({
    title : String,
    author : String,
    year : String,
    rate : String
})

module.exports = mongoose.model('books', bookSchema)