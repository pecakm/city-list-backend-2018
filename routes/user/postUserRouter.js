var express = require('express');
const userQueries = require('../../db/userQueries');

var router = express.Router();

router.post('/', function(req, res) {
    userQueries.createUser(req, res);
});

module.exports = router;