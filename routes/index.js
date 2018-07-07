var express = require('express');
const sequelize = require('../db/connection');
const City = require('../models/City');

var router = express.Router();

router.get('/', function(req, res, next) {

    res.render('index', { cities: cities });
});

module.exports = router;
