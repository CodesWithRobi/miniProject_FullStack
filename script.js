const express = require('express')
const mongoose = require('mongoose')
const bodyParser= require('body-parser')
const path = require('path')
const Book = require('./models/books')

const app = express()
const port = 5000

mongoose.connect('mongodb://localhost:27017/book', { //book is databasse name
    useNewUrlParser : true,
    useUnifiedTopology : true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, "Connection issue!!"))

db.once('open', () => {
    console.log("MongoDb Connected!!")
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'files')))

app.get('/', async (req, res) => {
    const books = await Book.find()
    res.render('index', {books})
})

app.post('/add', async (req, res) => {
    const {title, author, year, rate} = req.body
    const book = new Book({title, author, year, rate})
    await book.save()
    res.redirect('/')
})

app.post('/delete/:id', async (req, res) => {
    await Book.deleteOne({ _id: req.params.id }); //deleteOne fix the issue
    res.redirect('/')
})
app.post('/edit/:id', async (req, res) => {
    const {title, author, year, rate} = req.body
    await Book.findByIdAndUpdate(req.params.id, {title, author, year, rate})
    res.redirect('/')
})
app.listen(port, () => console.log('Server is running on port ' + port))
//Set-ExecutionPolicy RemoteSigned