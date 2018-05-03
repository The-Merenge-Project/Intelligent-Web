var express = require('express');
var router = express.Router();

//The AJAX module
var bodyParser = require("body-parser")

var Restaurant = require('../models/restaurants');
var restaurant = require('../controllers/restaurants');


var initDB= require('../controllers/init');
initDB.init();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Dinebook' });
});

router.get('/search_result', function (req, res, next) {

    var userData = req.body; // We have the javascript object here in the parser

    console.log(userData)

    res.render('search_result');

});

router.post('/search_result', function (req, res, next) {
    console.log("Post search_result")
    console.log(req.body)

    const a = restaurant.getRestaurant(req, res);

});

router.post('/checkboxes', function (req,res,next) {
    // restaurants = restaurant.getRestaurant(req, res);
    var userData = req.body; // We have the javascript object here in the parser

    console.log(userData)
    // console.log(restaurants)

    // res.setHeader('Content-Type', 'application/json');

    res.send(JSON.stringify(userData));

})

module.exports = router;
