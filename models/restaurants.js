var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var cuisineEnum = ['African', 'American', 'Asian', 'British', 'Eastern European', 'Greek', 'Italian', 'Mexican',
    'Mediterranean', 'Middle Eastern', 'Seafood', 'South American', 'Spanish'];

var Restaurant = new Schema(
    {
      name: {type: String, required: true, max: 100},
      address: {
        country: {type: String, required: true, max: 100},
        county: {type: String, required: true, max: 100},
        city: {type: String, required: true, max: 100},
        postcode: {type: String, required: true, max: 100},
        building: {type: Number},
        coordinate: {coordinateX: Number, coordinateY: Number}
      },
      cuisine: [{type: String, enum: cuisineEnum}],
      review: [{
        author: {type: String, required: true},
        rating: {type: Number, required: true},
        date: {type: Date, required: true, default: Date.now()},
        title: {type: String, max: 100},
        text: {type: String, required: true, max: 100},
        image: [{type: Buffer}]
      }],
      image: [{data: Buffer}]
    }
);

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