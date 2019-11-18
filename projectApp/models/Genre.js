var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');

var genreSchema = new Schema({
    _id: {type: Number},
    genre_name: {type: String}
});

module.exports = mongoose.model('Genre', genreSchema);