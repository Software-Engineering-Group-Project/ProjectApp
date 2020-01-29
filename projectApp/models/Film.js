var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');

var filmSchema = new Schema({
    _id:{type: Number},
    film_name:{type: String},
    description:{type: String},
    image: {type: String},
    release_date:{type: Number},
    average_review:{type: Number},
    rating:{type: String},
    genres:[{type: String}],
    starring:[{type: String}],
    directors:[{type: String}]
});

module.exports = mongoose.model('Film', filmSchema);