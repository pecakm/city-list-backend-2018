UserRole = require('../models/UserRole');

let queries = {};

queries.getAdminRoleId = function() {
    return new Promise(function(resolve, reject) {
        UserRole.findOne({ description: 'admin' }, function(err, role) {
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