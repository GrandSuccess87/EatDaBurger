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
// * `selectAll()`
// Object for selecting all our SQL statement functions.
var orm = {
    all: function(tableInput, cb) {
      console.log("all");
      var queryString = "SELECT * FROM " + tableInput + ";";
      console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },

    // * Create a method for `insertOne()`
    create: function(qa, table, columns, values) {
      console.log("insert");
      
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += columns.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, values, function(err, result){
            if (err) {
                throw err;
            }

            qa(result);


            app.post("/movies", function(req, res) {
              connection.query("INSERT INTO movies (movie) VALUES (?)", [req.body.movie], function(err, result) {
                if (err) {
                  return res.status(500).end();
                }
            
                // Send back the ID of the new movie
                res.json({ id: result.insertId });
                console.log({ id: result.insertId });
              });
            });
            

        });
    },

// * Create a method for `updateOne()`
    update: function( table, objColVals, condition, cb) {
      console.log("update");
      var queryString = "UPDATE" + table;
      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;

      console.log(queryString);

      connection.query(queryString, function(err, result){
        if (err) {
            throw err;
        }

        cb(result);
      });
    },
    // Create a method for deleting a burger
    delete: function(table, condition, qa) {
      console.log("delete");
      var queryString = "DELETE FROM" + table;
      queryString += " WHERE ";
      queryString += condition;
      console.log(queryString);
      
      connection.query(queryString, function(err, result){
        if(err){
          throw err;
        }
        qa(result);
      })
    }
};





module.exports = orm;