var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burgers = require("../models/burger.js");

    // Create all our routes and set up logic within those routes where required.
    router.get("/index", function(req, res) {
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
        burgers.create(
            ['burger_name'], [req.body.burger_name], function(result){
            console.log(result);
            // This sends back the result object of the new burger to the user
           return res.json({post: result});
           return res.redirect("/index");
        }); 

    router.put("/api/burgers/:id", function(req, res){
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
                return res.redirect("/index");
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
                return res.redirect("/index");
        });
    });

});


module.exports = router; 

//need to figure out how to access properties for burger name and devoured