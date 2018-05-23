var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
var User= require("./models/users");
var LocalStrategy = require("passport-local");
var passportLocalMongoose= require("passport-local-mongoose");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(require("express-session")({
    secret:"Hello World, this is a session",
    resave: false,              //Forces the session to be saved back to the session store
    saveUninitialized: false    //Forces a session that is “uninitialized” to be saved to the store
}));

passport.use(new LocalStrategy(User.authenticate()));

var User = require('./models/users');
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



module.exports = app;