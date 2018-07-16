const bcrypt = require('bcrypt');

const User = require('../models/User');

let queries = {};

queries.createUser = function(req, res) {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        if (err) {
           return res.status(500).json({
              error: err
           });
        } else {
           const user = new User({
              email: req.body.email,
              password: hash    
           });

           user.save().then(function(result) {
                console.log(result);
                res.status(200).json({
                    success: 'New user has been created'
                });
            }).catch(error => {
                res.status(500).json({
                    error: err
                });
            });
        }
    });
}

module.exports = queries;