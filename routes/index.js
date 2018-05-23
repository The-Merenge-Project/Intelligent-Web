var express = require('express');
var router = express.Router();
var passport = require("passport");
//The AJAX module
var bodyParser = require("body-parser")

var Restaurant = require('../models/restaurants');
var User = require('../models/users')
var restaurantController = require('../controllers/restaurants');


var initDB= require('../controllers/init');
initDB.init();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/index', restaurantController.restaurantList);

router.get('/restaurant/:id', restaurantController.restaurantDetail);

router.get("/secret",function(req, res){
    res.render("secret");
});

router.get('/signup', function (req,res,next) {
    res.render('signup');
})

router.post("/register", function(req, res){
    User.register(new User({
            username : req.body.username
        }),
        req.body.password, function(err, user){
            if(err){
                console.log(err);
                return res.render('signup');
            }
            passport.authenticate("local")(req, res, function(){
                res.redirect("/secret");
            });
        });
});

router.get("/login", function(req, res){
    res.render("login");
});

// router.post("/login", passport.authenticate("local"), {
//     successRedirect: "/secret",
//     failureRedirect: "/login"
// }, function(req, res) {
// });

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

/*router.post('/search_result', function (req, res, next) {
    console.log("Post search_result")
    console.log(req.body)

    const a = restaurant.getRestaurant(req, res);

});

router.post('/checkboxes', function (req,res,next) {
    // restaurants = restaurant.getRestaurant(req, res);
    var userData = req.body; // We have the javascript object here in the parser

    console.log(userData);
    // console.log(restaurants)

    // res.setHeader('Content-Type', 'application/json');

    res.send(JSON.stringify(userData));

});
*/
module.exports = router;
