var express = require('express');
var router = express.Router();
var User = require('../models/users');
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

router.post('/register', function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password_confirm = req.body.password_confirm;

    // Validation
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password_confirm', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            error: errors
        });
    } else {
        var create_user = new User({
            name: name,
            email: email,
            username: username,
            password: password
        });
        User.createUser(create_user, function (err, user) {
            if (err) {
                throw err;
            }
            req.flash('success_msg', 'Registration successful.');
            res.redirect('/users/login');
        })
    }
});

// Login
router.get('/login', function (req, res) {
    res.render('login');
});

// Create local strategy to handle callbacks
// for the username and password fields from the login form
passport.use(new LocalStrategy(
    function (username, password, done) {
        User.getUserByUsername(username, function (err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, { message: 'User Not Found' });
            }

            User.validPassword(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Invalid password' });
                }
            });
        });
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});

router.post('/login',
    passport.authenticate('local', {successRedirect: '/', failureRedirect: '/users/login', failureFlash: true}),
    function (req, res) {
        res.redirect('/index');
});

router.get('/logout', function (req, res) {
    req.logout();

    req.flash('success_msg', 'Successfully logged out.');

    res.redirect('/users/login');
});

module.exports = router;
