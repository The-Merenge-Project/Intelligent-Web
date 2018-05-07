var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var User = new Schema(
    {
        username: {type: String, required: true, max: 100, index: true},
        email: {type: String, required: true, match: [/\S+@\S+\.\S+/, 'is invalid'], max: 100, index: true},
        bio: {type: String},
        image: {type: Buffer},
        hash: {type: String},
        salt: {type: String}
    }
);

User.set('toObject', {getters: true});

var userModel = mongoose.model('User', User );

module.exports = userModel;