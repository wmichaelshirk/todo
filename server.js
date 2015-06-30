var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

/* Database */
var Task = mongoose.model('Task', {
  task: String,
  completed: Boolean
});
mongoose.connect('mongodb://localhost/Todo');


/* Middleware */
// parse body as json
app.use(bodyParser.json());
// serve the folder statically
app.use(express.static('./'));


/* Controller */
// Create
app.post('/task', function(req, res) {
  var newTask = new Task(req.body);
  newTask.save(function(err, result){
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

// Retrieve 
app.get('/task', function(req, res) {
  Task.find({}, function(err, result) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

// Update
app.post('/task/:id', function(req, res) {
  Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    function( err, result) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }  
    });
});

// Delete
app.delete('/task/:id', function(req, res) {
  Task.remove(
    {_id: req.params.id},
    function( err, result) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }  
  });
});

app.listen(3000);
