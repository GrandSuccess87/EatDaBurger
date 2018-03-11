var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(err, req, res) {
  burger.all(function(data) {
    if (err) {
        return res.status(500).end();
      }
  
    res.render("index", { burgerData: data });
    console.log(burgerData);
    // res.render("index", burgerData);
  });
});


module.exports = router; 