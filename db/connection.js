const mongoose = require('mongoose');

const uri = 'mongodb://citylist:citylist01@ds139251.mlab.com:39251/citylist';

mongoose.connect(uri, {
    useNewUrlParser: true
});

module.exports = mongoose;
