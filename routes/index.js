const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const schedule = require('node-schedule');
 
const router = express.Router()


const taskModel = mongoose.model('task');
const listsModel = mongoose.model('lists');

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
    resetTasks();
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

//reset tasks every day
var j = schedule.scheduleJob({hour: 00, minute: 00}, function(){
  resetTasks();
});

function resetTasks(){

    taskModel.find({}, '_id', function(err, taskids) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }

        listsModel.updateOne({name: 'tobecompleted'}, {$set: {"tasksid": taskids}}, function(err) {
            if (err) {
                console.log(err);
                //return res.sendStatus(500);
            }
        });
    });
    listsModel.updateOne({name: 'done'}, {$set: {"tasksid": []}}, function(err) {
        if (err) {
            console.log(err);
            //return res.sendStatus(500);
        }
    });
}



module.exports = router;