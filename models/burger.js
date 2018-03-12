// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {

  //create a selection all function 
  all: function(test) {
    orm.all("burgers", function(res) {
      test(res);
    });
  },

  //create an insert function for adding a burger
  create: function(columns, values, get) {
      orm.create("burgers", columns, values, function(res){
        get(res);
      });
  },

  //create an update function for updating a burger already in the MySQL database
  update: function(objColVals, condition, get) {
      orm.update("burgers", objColVals, condition, function(res){
        get(res);  
    });
  },

  // create a delete function for deleting a burger already in the MySQL database
  delete: function( condition, get){
      orm.delete("burgers", condition, function(res){
          get(res);
      });
  }
};

module.exports = burger;