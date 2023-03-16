'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bookMethods = require('./books');
const getBooks = bookMethods.getBooks;
const createBook = bookMethods.createBook;
const deleteBook = bookMethods.deleteBook;
const updateBook = bookMethods.updateBook;

// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const app = express();
app.use(cors());
app.use(express.json());



mongoose.connect(process.env.DB_URL);
const PORT = process.env.PORT || 3002;

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.get('/books', getBooks)
app.post('/books/post-book', createBook)
app.put('/books/update/:id', updateBook)
app.delete('/books/delete/:id', deleteBook)


// handle errors
app.get('*', (req, res, next)=>{

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
