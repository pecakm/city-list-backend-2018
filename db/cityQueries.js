City = require('../models/City');

let queries = {};

queries.getAllCities = function() {
    return new Promise(function(resolve, reject) {
        City.find(function(error, cities) {
            if (error) {
                reject(error);
            } else {
                resolve(cities);
            }
        });
    });
}

module.exports = queries;
