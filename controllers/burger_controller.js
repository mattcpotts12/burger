var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

//Routes and logic
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
        var hbsObject = {
            burger: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/burgers", function(req, res) {
    burger.insertOne([
        "burger_name", 
    ], [
        req.body.burger_name
    ], function(result) {
        res.redirect("/")
    });
});

router.put("/burger/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne({
        devoured: true
    }, condition, function(result) {
        res.redirect("/")
    });
});



// Export routes for server.js to use.
module.exports = router;