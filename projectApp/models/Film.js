var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');

var filmSchema = new Schema({
    _id:{type: Number},
    film_name:{type: String},
    release_date:{type: String},
    average_review:{type: String},
    rating:{type: Double},
    genres:[{type: Number}],
    starring:[{Type: Number}],
    directors:[{Type: Number}]
});

module.exports = mongoose.model('Film', filmSchema);