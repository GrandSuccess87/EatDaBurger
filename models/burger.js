// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {

  //create a select all function 
  all: function(qa) {
    orm.all("burgers", function(res) {
      qa(res);
    });
  },

  //create an insert function for adding a burger
  create: function(cols, vals, qa) {
    orm.create("burgers", cols, vals, function(res) {
      qa(res);
    });
  },

  //create an update function for updating a burger already in the MySQL database
  update: function(objColVals, condition, qa) {
      orm.update("burgers", objColVals, condition, function(res){
        qa(res);  
    });
  },

  // create a delete function for deleting a burger already in the MySQL database
  delete: function (condition, qa) {
      orm.delete("burgers", condition, function (res) {
          qa(res);
      });
     }
};

module.exports = burger;