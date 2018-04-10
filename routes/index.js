var express = require('express');
var router = express.Router();

//The AJAX module
var bodyParser = require("body-parser")

var Restaurant = require('../models/restaurants');

var initDB= require('../controllers/init');
initDB.init();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Merengue-Merengue' });
});

router.get('/search_result', function (req, res, next) {

    res.render('search_result');
});

router.post('/search_result', function (req, res,next) {

    var cuisines = Restaurant.schema.path('cuisine').caster.enumValues;

    res.render('search_result', {searched_restaurant: req.body.search_query, cuisines: cuisines});
});

router.post('/checkboxes', function (req,res,next) {
    var userData = req.body; // We have javascript object here in the parser

    res.setHeader('Content-Type', 'application/json');

    res.send(JSON.stringify(userData));
})

module.exports = router;
