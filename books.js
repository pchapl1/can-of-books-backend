'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./models/book');
const axios = require('axios');
const app = express();
app.use(cors());
// we must have this to recieve JSON data from a request

mongoose.connect(process.env.DB_URL);
const PORT = process.env.PORT || 3001;

async function getBooks(req, res, next){
    try {
      let results = await Book.find({});
      res.status(200).send(results);
    } catch (err) {
        next(err)
    };
};

async function createBook(req, res, next){
    try {
        let bookToCreate = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        };

        let newBook = await Book.create(bookToCreate);
        res.status(200).send(newBook);
    } catch(err){
        console.error(error);
        response.status(500).send('Error Creating Book');
    };
};

async function updateBook(req, res, next){
    try {
        // get id from params
        let id = req.params.id
        // get data to be updated from body
        let bookToUpdate = req.body
        // pass the id, the info from the body and pass it an options object that lets the db know to just overwrite the existing object
        let updatedBook = await Book.findByIdAndUpdate(id, bookToUpdate, {new: true, overwrite: true})
        // send a successful status and the updated book to the client
        res.status(200).send(updatedBook)
    } catch(err){
        next(err)
    }
}
async function deleteBook(req, res, next){
    try {
        let id = req.params.id
        await Book.findByIdAndDelete(id)

        res.status(200).send("Book Deleted")
    } catch(err){
        next(err)
    }
}

module.exports = {
    getBooks : getBooks,
    createBook : createBook,
    updateBook : updateBook,
    deleteBook : deleteBook

};