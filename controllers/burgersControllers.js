var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burgers = require("../models/burger.js");

    // Create all our routes and set up logic within those routes where required.
    router.get("/", function(req, res) {
        console.log("get");
    burgers.all(function(data) {
        var burgersObject = {
            burgersData: data
        };
        console.log("burgers object" + JSON.stringify(data)); 
               
        return res.render("index", burgersObject);
     
    });
    });


    router.get("/api/burgers", function(req, res) {
        console.log("get api");
    burgers.all(function(data) {
        return res.json(data);
    });
    });
      
    router.post("/api/burgers", function(req, res){
        console.log("post burger", req.body);
        burgers.create(
            ['burger_name', 'devoured'], [req.body.burger_name, false], function(result){
            console.log(result);
            // This sends back the result object of the new burger to the user
           return res.json({post: result});
        //    return res.redirect("/");
        }); 


  

    router.put("/api/burgers/:id", function(req, res){
        // update row where id = the parameter of id
        var condition = "id = " + req.params.id;
        console.log("Updating at: " + condition); 

        burgers.update(
            req.params.id, function(result){
            console.log("Update Result: " + result);
            // if(result.changedRows == 0 ){
            //     return res.status(404).end();
            // } else {
            //     return res.status(200).end();
            //     // return res.redirect("/");
            // }
        });
    });

    router.delete("/api/burgers/:id", function(req,res){
        // delete row where id = the parameter of id
        var condition = "id = " + req.params.id;
        console.log("Deleting burger at: " + condition);
        burgers.delete(condition, function(result){
            if(result.changedRows == 0 ){
                return res.status(400).end();
            } else {
                return res.status(200).end();
                // return res.redirect("/");
            }
        });
    });
});

//Export routes for server.js to use
module.exports = router; 

