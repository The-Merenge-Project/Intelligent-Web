var mongoose = require('mongoose');

var Schema = mongoose.Schema;

global.cuisineEnum = ['African', 'American', 'Asian', 'British', 'Eastern European', 'Greek', 'Italian', 'Mexican',
    'Mediterranean', 'Middle Eastern', 'Seafood', 'South American', 'Spanish'];

var Restaurant = new Schema(
    {
      name: {type: String, required: true, max: 100},
      address: {
        country: {type: String, required: true, max: 100},
        city: {type: String, required: true, max: 100},
        postcode: {type: String, required: true, max: 100},
        building: {type: Number},
        street: {type: String, max: 100},
        coordinate: {lat: Number, lng: Number}
      },
      cuisine: [{type: String, enum: global.cuisineEnum}],
      review: [{
        author: {type: String, required: true},
        rating: {
          service: {type: Number, required: true},
          food: {type: Number, required: true},
          value: {type: Number, required: true}
        },
        date: {type: Date, required: true, default: Date.now},
        title: {type: String, required: true, max: 100},
        text: {type: String, required: true, max: 100},
        image: [{type: String}]
      }],
      image: [{type: String}]
    }
);


Restaurant.path('review').schema.virtual('review_rating')
    .get(function () {
        var review = this.review;
        var score = (review.rating.service + review.rating.food + review.rating.value)/3;
        return score
    });

// Virtual for a restaurant's rank
Restaurant.virtual('restaurant_rating')
    .get(function () {
        var reviews = this.review;
        var totalScore = 0;

        reviews.forEach(function (review) {
            var reviewScore = (review.rating.service + review.rating.food + review.rating.value)/3;
            totalScore += reviewScore;
        });

        var average = totalScore/reviews.length;
        return average

    });

// ensure there cannot be two restaurants named the same at the same address
Restaurant.index({ name: 1, address: 1}, { unique: true });

Restaurant.set('toObject', {getters: true, virtuals: true});

// COMPILE A MODEL FROM SCHEMA
var restaurantModel = module.exports = mongoose.model('Restaurant', Restaurant );

module.exports.addReviewToRestaurant = function(newReview, restaurant_id){
    // restaurantModel.update({_id: restaurant_id}, {$push: {reviews: newReview} }, done);
    console.log(newReview);
    console.log(restaurant_id);

    restaurantModel.findById(restaurant_id, function (err, doc) {
        if (err) { console.log(err)}

        doc.review.push(newReview);
        doc.save(function (err, results) {

        });
    });

};