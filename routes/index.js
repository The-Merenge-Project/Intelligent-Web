var express = require('express');
var router = express.Router();

var initDB= require('../controllers/init');
initDB.init();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Merengue-Merengue' });
});

router.get('/search_result', function (req, res, next) {
    res.render('search_result')
})

router.get('/test', function (req, res, next) {
    res.render('test')
})

module.exports = router;
