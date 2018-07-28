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
                saveUser(userData.email, hash, userData.role)
                .then(function(result) {
                    resolve(result);
                }).catch(function(error) {
                    reject(error);
                });
            }
        });
    });
}

function saveUser(email, hash, role) {
    const user = new User({
        email: email,
        password: hash,
        role_id: role
    });

    return new Promise(function(resolve, reject) {
        user.save()
        .then(function(result) {
            resolve(jwtTokens.signToken(user._id));
        }).catch(error => {
            reject(error);
        });
    });
}

queries.findUserById = function(id) {
    return new Promise(function(resolve, reject) {
        User.findById(id, { password: 0 }, function(err, user) {
            if (err) {
                reject({ status: 500, message: err });
            } else if (!user) {
                reject({ status: 404 });
            } else {
                resolve(user);
            }
        });
    });
}

queries.loginUser = function(email, password) {
    return new Promise(function(resolve, reject) {
        User.findOne({ email: email }, function(err, user) {
            if (err) {
                reject({ status: 500, message: err });
            } else if (!user) {
                reject({ status: 404 });
            } else {
                let passwordIsValid = bcrypt.compareSync(password, user.password);

                if (!passwordIsValid) {
                    reject({ status: 404 });
                } else {
                    resolve(jwtTokens.signToken(user._id));
                }
            }
        });
    });
}

module.exports = queries;