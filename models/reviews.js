var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Review = new Schema(
    {
        author: {type: Schema.ObjectId, ref: 'Author', required: true},
        rating: {type: Number, required: true},
        date: {type: Date, required: true, default: Date.now()},
        title: {type: String, max: 100},
        text: {type: String, required: true, max: 100},
        image: [{type: Buffer}]
    }
);

Review.set('toObject', {getters: true, virtuals: true});


var reviewModel = mongoose.model('Review', Review );

module.exports = reviewModel;