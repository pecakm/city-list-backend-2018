const bcrypt = require('bcrypt');

const User = require('../models/User');

const SALT_ROUNDS = 10;

let queries = {};

queries.createUser = function(userData) {
    return new Promise(function(resolve, reject) {
        bcrypt.hash(userData.password, SALT_ROUNDS, function(err, hash) {
            if (err) {
                reject(err);
            } else {
                saveUser(userData.email, hash)
                .then(function(result) {
                    resolve(result);
                }).catch(function(error) {
                    reject(error);
                });
            }
        });
    });
}

function saveUser(email, hash) {
    const user = new User({
        email: email,
        password: hash    
    });

    return new Promise(function(resolve, reject) {
        user.save()
        .then(function(result) {
            resolve(result);
        }).catch(error => {
            reject(error);
        });
    });
}

module.exports = queries;