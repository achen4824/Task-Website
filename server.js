const express = require('express')
const bodyParser = require('body-parser') // allows for req.body
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const MongoClient = require('mongodb').MongoClient
const app = express()

//fancy app features parsers use files from public folder etc
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Server Setup
const port = 3000
const databaseUrl = 'mongodb://127.0.0.1:27017'

//routes Setup
var indexRouter = require('./routes/index');


const connection = mongoose.connect(databaseUrl, { useUnifiedTopology: true, useNewUrlParser: true}, (err) => {
    if (err) throw err;
    console.log("Connected to database at " + databaseUrl)

    app.listen(port, () => {
        console.log("Server Started on: " + String(port))
    })
})

app.use('/', indexRouter);

module.exports = app;

