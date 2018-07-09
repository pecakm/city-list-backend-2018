City = require('../models/City');

let queries = {};

queries.getAllCities = function() {
    return new Promise(function(resolve, reject) {
        City.findAll().then(cities => {
            resolve(cities);
        });
    });
}

module.exports = queries;
