const mongoose = require('../db/connection');

var citySchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
});

var City = mongoose.model('City', citySchema);

module.exports = City;
