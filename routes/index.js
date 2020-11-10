const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const router = express.Router()


const taskModel = mongoose.model('task');

router.get('/', function (req, res) {
    res.render('index', {});
});
  

router.post('/quotes', (req, res) => { 
    console.log(req.body)
    res.sendStatus(200)
})

module.exports = router;