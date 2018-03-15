// Import MySQL connection.
var connection = require("../config/connection.js");

// The below helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

// In the `orm.js` file, create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.

// ---------------- selectAll() --------------------------------- //
// Object for all our SQL statement functions.
var orm = {
    all: function(tableInput, qa) {
      console.log("select all");
      var queryString = "SELECT * FROM " + tableInput + ";";
      console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        qa(result);
      });
    },

// ---------------- InsertOne() --------------------------------- //
create: function(table, cols, vals, qa) {
      console.log("insert one");
      var queryString = "INSERT INTO " + table;
  
      queryString += " (";
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";
  
      console.log(queryString);
  
      connection.query(queryString, vals, function(err, result) {
        if (err) {
          throw err;
        }
        qa(result);
      });  
    },      

// ---------------- UpdateOne() --------------------------------- //
update: function( table, objColVals, condition, qa) {
      console.log("update one");
      var queryString = "UPDATE " + table;
      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString +=  condition;

      console.log(queryString);

      connection.query(queryString, function(err, result){
        if (err) {
            throw err;
        }
        qa(result);
      });
    },
// ---------------- DeleteOne() --------------------------------- //
delete: function(table, condition, qa) {
      console.log("delete one");
      var queryString = "DELETE FROM " + table;
      queryString += " WHERE ";
      queryString += condition;
      console.log(queryString);
      
      connection.query(queryString, function(err, result){
        if(err){
          throw err;
        }
        qa(result);
      });
    }
};





module.exports = orm;