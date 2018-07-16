const bcrypt = require('bcrypt');

const User = require('../models/User');

let queries = {};

queries.createUser = function(userData) {
    return new Promise(function(resolve, reject) {
        bcrypt.hash(userData.password, 10, function(err, hash) {
            if (err) {
                let status = 500;
                reject(status);
            } else {
                saveUser(userData, hash)
                .then(function(status) {
                    resolve(status);
                }).catch(function(status) {
                    reject(status);
                });
            }
        });
    });
}

function saveUser(userData, hash) {
    const user = new User({
        email: userData.email,
        password: hash    
    });

    return new Promise(function(resolve, reject) {
        user.save()
        .then(function(result) {
            let status = 200;
            resolve(status);
        }).catch(error => {
            let status = 500;
            reject(status);
        });
    });
}

module.exports = queries;