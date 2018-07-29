UserRole = require('../models/UserRole');

let queries = {};

queries.getAdminRoleId = () => {
    return new Promise((resolve, reject) => {
        UserRole.findOne({ description: 'admin' }, (err, role) => {
            if (err) {
                reject({ status: 500, message: err });
            } else if (!role) {
                reject({ status: 404 });
            } else {
                resolve(role.id);
            }
        });
    });
}

queries.getSubscriberRoleId = () => {
    return new Promise((resolve, reject) => {
        UserRole.findOne({ description: 'subscriber' }, (err, role) => {
            if (err) {
                reject({ status: 500, message: err });
            } else if (!role) {
                reject({ status: 404 });
            } else {
                resolve(role.id);
            }
        });
    });
}

module.exports = queries;