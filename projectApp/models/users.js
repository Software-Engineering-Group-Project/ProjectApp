var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
require('./util');

var usersSchema = new Schema({
    user_name : {
        type: String,
        required: true,
        unique: true},
    isAdmin: Boolean,
    email : {
        type: String,
        required: true,
        unique: true},
    password : {type: String,
                required: true},
    access_token: String
});


//record of what they have rented
//


//hashing password

usersSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

//comparing password to see if it is valid
usersSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', usersSchema);