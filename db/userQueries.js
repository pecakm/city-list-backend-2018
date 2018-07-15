User = require('../models/User');

let queries = {};

queries.createUser = function(userData) {
    //use schema.create to insert data into the db
    User.create(userData, function (err, user) {
        if (err) {
            return next(err)
        } else {
            return res.redirect('/profile');
        }
    });
}

module.exports = queries;