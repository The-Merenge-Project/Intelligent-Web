var mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");

var Schema = mongoose.Schema;

var User = new Schema(
    {
        username: {type: String, unique: true, trim: true, required: true, max: 100, index: true},
        email: {type: String, unique: true, trim: true, required: true, match: [/\S+@\S+\.\S+/, 'is invalid'], max: 100, index: true},
        password: {type: String, required: true},
        image: {type: Buffer}
    }
);

User.set('toObject', {getters: true});
User.plugin(passportLocalMongoose);
var userModel = mongoose.model('User', User );


module.exports = userModel;