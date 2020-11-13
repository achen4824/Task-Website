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

router.get('/tasks', function (req, res) {
    taskModel.find({}, 'name value time', function(err, tasks) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(tasks);
    });
});

//tobedone
router.get('/tobedonetasks', function (req, res) {
    taskModel.find({}, 'name value time', function(err, tasks) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(tasks);
    });
});

router.get('/donetasks', function (req, res) {
    taskModel.find({}, 'name value time', function(err, tasks) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(tasks);
    });
});
  

module.exports = router;