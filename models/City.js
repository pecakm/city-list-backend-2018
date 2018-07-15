const mongoose = require('../db/connection');

var citySchema = mongoose.Schema({
    name: String
});

var City = mongoose.model('City', citySchema);

module.exports = City;
