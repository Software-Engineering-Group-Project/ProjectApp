var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');

var directorSchema = new Schema({
    _id: {type: Number},
    name: {type: String}
});

module.exports = mongoose.model("Director", directorSchema);