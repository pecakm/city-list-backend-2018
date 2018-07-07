var express = require('express');
var router = express.Router();

let cities = ['Leszno', 'Poznań', 'Kalisz'];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { cities: cities });
});

module.exports = router;
