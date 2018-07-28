const mongoose = require('mongoose');

const envVars = require('../env_vars');

mongoose.connect(envVars.DB_URI, {
    useNewUrlParser: true
});

module.exports = mongoose;
