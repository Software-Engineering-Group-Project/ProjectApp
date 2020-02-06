var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
require('./util');

var filmSchema = new Schema({
    id:{type: Number,
        unique: true},
    film_name:{type: String},
    description:{type: String},
    image: {type: String},
    release_date:{type: Number},
    average_review:{type: Number},
    rating:{type: String},
    genres:[{type: String}],
    starring:[{type: String}],
    directors:[{type: String}],
    tags:[{type: String}],
    cost:{type: Number}
});

module.exports = mongoose.model('Film', filmSchema);