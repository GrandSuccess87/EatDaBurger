var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burgers = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    console.log(req);
  burgers.all(function(data) {
    var burgersObject = {
        burgersData: data
      };
    res.render("index", { burgersObject: data });
    console.log(burgersObject);
  });
});

router.post("/api/burgers", function(req, res){
    burgers.create([
        "Full Range Angus Beef", "devoured" 
    ], 
    [   
         req.body.burger, req.body.devoured    
        //req.body.? get burger and devoured properties from burgerDataObject 
    ], function(result){
        console.log(result);
        // This sends back the ID of the new burger
        res.json({id: result.insertId});
    }); 

    router.put("/api/burgers/:id", function(req, res){
        console.log(req.body);
        var condition = "id = " + req.params.id;
        console.log("Updating at: " + condition); 

        burgers.update({
            devoured: req.body.devoured
        }, condition, function(result){
            console.log("Update Result: " + result);
            if(result.changedRows == 0 ){
                return res.status(404).end();
            } 
                return res.status(200).end();
        });
    });

    router.delete("/api/burgers/:id", function(req,res){
        var condition = "id = " + req.params.id;
        console.log("Deleting burger at: " + condition);
        burgers.delete(condition, function(result){
            if(result.changedRows == 0 ){
                return res.status(400).end();
            }
                return res.status(200).end();
        });
    });


});


module.exports = router; 

//need to figure out how to access properties for burger name and devoured