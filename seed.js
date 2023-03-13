'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const Book = require('./models/book');

async function seed(){

    await Book.create({
        title: "Anthem",
        description: "The story of one man's rebellion against a totalitarian, collectivist society.",
        status: "Available"
    })

    console.log('Anthem was created')

    await Book.create({
        title: "The Adventures of Huckleberry Finn",
        description: "told from the point of view of Huck Finn, a barely literate teen who fakes his own death to escape his abusive, drunken father. He encounters a runaway slave named Jim, and the two embark on a raft journey down the Mississippi River.",
        status: "Available"
    })

    console.log("Huck Finn created!")

    await Book.create({
        title: "The Republic ",
        description: "The Republic is a Socratic dialogue by Plato, written c. 380 B.C.E.. It is one of the most influential works of philosophy and political theory, and Plato's best known work.", 
        status: 'Available'
    })

    console.log("The republic was created!");
    mongoose.disconnect();
};

seed();