const bcrypt = require('bcrypt');
const User = require('../models/User');
let jwtTokens = require('../modules/jsonWebTokens');

const SALT_ROUNDS = 10;

let queries = {};

queries.findUserById = (id) => {
    return new Promise((resolve, reject) => {
        User.findById(id, { password: 0 }, (err, user) => {
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

queries.createUser = (userData) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(userData.password, SALT_ROUNDS, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                saveUser(userData.email, hash, userData.role)
                .then((result) => {
                    resolve(result);
                }).catch((error) => {
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

    return new Promise((resolve, reject) => {
        user.save()
        .then((result) => {
            resolve(jwtTokens.signToken(user._id));
        }).catch(error => {
            reject(error);
        });
    });
}

queries.loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
        User.findOne({ email: email }, (err, user) => {
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

queries.likeCity = (userId, cityId) => {
    return new Promise(function(resolve, reject) {
        User.update(
            { _id: userId },
            { $addToSet: { liked_cities: cityId } },
            (err, result) => {
                if (err) {
                    reject({ status: 500, message: err });
                } else if (!cityId) {
                    reject({ status: 404 });
                } else {
                    resolve(result);
                }
            }
        );
    });
}

module.exports = queries;