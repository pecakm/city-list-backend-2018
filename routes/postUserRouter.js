var express = require('express');
const userQueries = require('../db/userQueries');

var router = express.Router();

router.post('/', function(req, res) {
    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf) {
        var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            passwordConf: req.body.passwordConf,
        }

        userQueries.createUser(userData);
    }
});

module.exports = router;