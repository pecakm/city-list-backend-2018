const mongoose = require('../db/connection');
const UserRole = require('./UserRole');

var userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role_id: {
        type: Number,
        required: true
    },
    liked_cities: [String]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
