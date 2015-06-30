var app = angular.module('ToDo', ['ngResource']);

app.controller('mainController', ['$resource', function($resource) {
  var self=this;

  // Create the CRUD object
  // takes an endpoint, and an id field.
  var Task = $resource('/task/:id', {id:'@_id'});

  // Create
  self.addToDo = function() {
    var newToDo = new Task({
      task: self.newTask,
      completed: false
    });
    newToDo.$save(function() {
      self.todos.push(newToDo);
      self.newTask = "";
    });
  };

  // Retrieve
  self.todos = Task.query();

  // Update
  self.updateTodo = function(todo) {
    todo.$save();
  };

  // Delete
  self.deleteTodo = function(todo) {
    todo.$delete(function() {
      self.todos = self.todos.filter(function(e) {
        return e._id !== todo._id;
      });
    });
  };
}]);
