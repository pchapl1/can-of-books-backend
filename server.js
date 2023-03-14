'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bookMethods = require('./books');
const getBooks = bookMethods.getBooks
const createBook = bookMethods.createBook

// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const app = express();
app.use(cors());

// we must have this to recieve JSON data from a request
app.use(express.json())

mongoose.connect(process.env.DB_URL);
const PORT = process.env.PORT || 3002;

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.get('/books', getBooks)

app.listen(PORT, () => console.log(`listening on ${PORT}`));
