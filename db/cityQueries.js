City = require('../models/City');

let queries = {};

queries.getAllCities = function() {
    return new Promise(function(resolve, reject) {
        City.findAll().then(cities => {
            resolve(cities);
        }).catch(function(error) {
            reject(error);
        });
    });
}

module.exports = queries;
