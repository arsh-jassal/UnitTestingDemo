//This code defines a simple GET route for the homepage

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Express',         // Passing title to the view
    message: 'Welcome to my homepage!'  // Passing custom message to the view
  });
});

module.exports = router;
