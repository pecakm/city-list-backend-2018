const mongoose = require('../db/connection');

var roleSchema = mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    description: {
        type: String,
        unique: true,
        required: true
    }
});

var UserRole = mongoose.model('User_Role', roleSchema);

module.exports = UserRole;
