var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var User = new Schema(
    {
        username: {type: String, required: true, max: 100, index: true},
        email: {type: String, required: true, match: [/\S+@\S+\.\S+/, 'is invalid'], max: 100, index: true},
        bio: {type: String},
        image: {type: Buffer},
        password: {type: String}
    }
);

User.set('toObject', {getters: true});

var userModel = module.exports = mongoose.model('User', User );


module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.getUserByUsername = function (username, callback) {
    userModel.findOne({username: username}, callback)
};

module.exports.getUserById = function(id, callback) {
    userModel.findById(id, callback);
};

module.exports.validPassword = function(inputPassword, hash, callback) {
    bcrypt.compare(inputPassword, hash, function(err, isMatch) {
        if (err) { throw err; }

        callback(null, isMatch);
    });
};