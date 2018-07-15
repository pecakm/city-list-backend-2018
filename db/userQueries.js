User = require('../models/User');

let queries = {};

queries.createUser = function(userData) {
    User.create(userData, function (err, user) {
        if (err) {
            return console.log(err);
        }
    });
}

module.exports = queries;