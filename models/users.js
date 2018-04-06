var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


var Schema = mongoose.Schema;

var User = new Schema(
    {
        username: {type: String, required: true, unique: true, max: 100, index: true},
        email: {type: String, required: true, unique: true, match: [/\S+@\S+\.\S+/, 'is invalid'], max: 100, index: true},
        bio: {type: String},
        image: {type: Buffer},
        hash: {type: String},
        salt: {type: String}
    }
);

User.set('toObject', {getters: true});

User.plugin(uniqueValidator, {message: 'is already taken.'});


var userModel = mongoose.model('User', User );

module.exports = userModel;