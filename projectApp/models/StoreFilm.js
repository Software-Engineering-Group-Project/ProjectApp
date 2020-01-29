var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');

var storeFilmSchema = new Schema({
    store_id: {type: Number},
    film_id: {type: Number},
    total_stock: {type: Number},
    available_stock: {type: Number}
});

module.exports = mongoose.model('StoreFilm', storeFilmSchema);