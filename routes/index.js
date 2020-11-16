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
});

//tobedone
router.get('/tobecompleted', function (req, res) {
    listsModel.findOne({name: 'tobecompleted'},'tasksid', function(err,listsres) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        taskModel.find({'_id': { $in: listsres.tasksid}}, 'name value time', function(err, tasks) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            console.log(tasks);
            res.send(tasks);
        });
    });
});

router.get('/done', function (req, res) {
    listsModel.findOne({name: 'done'},'tasksid', function(err,listsres) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        taskModel.find({'_id': { $in: listsres.tasksid}}, 'name value time', function(err, tasks) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            console.log(tasks);
            res.send(tasks);
        });
    });
});


router.post('/add', async function (req, res) {
    await listsModel.updateOne({name: "done"},{$push: {tasksid: req.body._id}},function(err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    });
    await listsModel.updateOne({name: "tobecompleted"},{$pull: {tasksid: req.body._id}},function(err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    });
    res.sendStatus(200);
});

router.post('/remove', async function (req, res) {
    await listsModel.updateOne({name: "tobecompleted"},{$push: {tasksid: req.body._id}},function(err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    });
    await listsModel.updateOne({name: "done"},{$pull: {tasksid: req.body._id}},function(err) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    });
    res.sendStatus(200);
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