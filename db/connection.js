const mongoose = require('mongoose');

const envVars = require('../env_vars');

mongoose.connect(envVars.dbUri, {
    useNewUrlParser: true
});

module.exports = mongoose;
