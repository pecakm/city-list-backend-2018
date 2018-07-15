var express = require('express');
const userQueries = require('../db/userQueries');

var router = express.Router();

router.post('/', function(req, res) {
    console.log(req);
    if (req.body.email && req.body.password && req.body.passwordConf) {
        var userData = {
            email: req.body.email,
            password: req.body.password,
            passwordConf: req.body.passwordConf,
        }

        userQueries.createUser(userData);
        res.send(userData.email);
    } else {
        res.send('NOPE');
    }
});

module.exports = router;