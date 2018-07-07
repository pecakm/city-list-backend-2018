City = require('../models/City');

let queries = {};

queries.getAllNames = function() {
    City.findAll().then(cities => {
        return cities
    });
}

module.exports = queries;

// City.findAll().then(cities => {
//     //resolve(parseDataToCityNames(cities));
// });