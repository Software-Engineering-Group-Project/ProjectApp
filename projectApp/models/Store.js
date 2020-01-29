var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');

var storeSchema = new Schema({
    _id: {type: Number},
    store_name: {type: String}
});

module.exports = mongoose.model("Store", storeSchema);