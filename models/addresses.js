var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Address = new Schema(
    {
        country: {type: String, required: true, max: 100},
        county: {type: String, required: true, max: 100},
        city: {type: String, required: true, max: 100},
        postcode: {type: String, required: true, max: 100},
        building: {type: Number},
        coordinate: {coordinateX: Number, coordinateY: Number}
    }
);

Address.set('toObject', {getters: true, virtuals: true});

var addressModel = mongoose.model('Address', Address );

module.exports = addressModel;