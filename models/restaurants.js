var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Restaurant = new Schema(
    {
        name: {type: String, required: true, max: 100},
        address: {type: Schema.ObjectId, ref: 'Address', required: true},
        cuisine: {type: String, enum: cuisineEnum},
        review: [{type: Schema.ObjectId, ref: 'Review'}],
        image: [{data: Buffer}]
    }
);

var cuisineEnum = ['African', 'American', 'Asian', 'British', 'Eastern European', 'Greek', 'Italian', 'Mexican',
                    'Mediterranean', 'Middle Eastern', 'Seafood', 'South American', 'Spanish'];

// Virtual for a restaurant's rank
Restaurant.virtual('rank')
    .get(function () {

        //const currentDate = new Date().getFullYear();
        //const result= currentDate - this.dob;
        //return result;
    });

// ensure there cannot be two restaurants named the same at the same address
Restaurant.index({ name: 1, address: 1}, { unique: true });

Restaurant.set('toObject', {getters: true, virtuals: true});

// COMPILE A MODEL FROM SCHEMA
var restaurantModel = mongoose.model('Restaurant', Restaurant );

module.exports = restaurantModel;