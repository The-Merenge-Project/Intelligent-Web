var express = require('express');
var router = express.Router();
var User = require('../models/users');
var userController = require('../controllers/users');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');

});

// Register
router.get('/register', function (req, res) {
    res.render('register');
});

router.post('/register', userController.handleRegistration);

// Login
router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/login', userController.handleLogin);

router.get('/logout', userController.handleLogout);

module.exports = router;
