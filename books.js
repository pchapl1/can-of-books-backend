'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./models/book');
const axios = require('axios');
const app = express();
app.use(cors());

mongoose.connect(process.env.DB_URL);
const PORT = process.env.PORT || 3001;

async function  getBooks(req, res, next){
    try {
      let results = await Book.find({})
      res.status(200).send(results)
    } catch (err) {
        next(err)
    }
}

async function createBook(req, res, next){
    try {
        console.log('in createBook')
        console.log(req.params)
    } catch(err){
        next(err)
    }
}

module.exports = {
    getBooks : getBooks};