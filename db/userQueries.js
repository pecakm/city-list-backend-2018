const bcrypt = require('bcrypt');

const User = require('../models/User');

let jwtTokens = require('../modules/jsonWebTokens');

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
            let token = jwtTokens.signToken(user._id);
            resolve(token);
        }).catch(error => {
            reject(error);
        });
    });
}

queries.findUser = function(id) {
    return new Promise(function(resolve, reject) {
        User.findById(id, { password: 0 }, function(err, user) {
            if (err) {
                reject(500);
            } else if (!user) {
                reject(404);
            } else {
                resolve(user);
            }
        });
    });
}

module.exports = queries;