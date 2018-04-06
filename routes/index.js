var express = require('express');
var router = express.Router();

var initDB= require('../controllers/init');
initDB.init();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Merenge-Merenge' });
});

module.exports = router;
