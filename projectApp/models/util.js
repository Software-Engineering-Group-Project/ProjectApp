var mongoose = require('mongoose');

var connection = 
    mongoose.connect('mongodb://mongodb5401hg:ce1duk@danu7.it.nuigalway.ie:8717/mongodb5401', {useNewUrlParser: true, useUnifiedTopology: true});

exports.connection = connection;