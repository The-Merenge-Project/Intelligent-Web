var mongoose = require('mongoose');
var Restaurant = require('../models/restaurants');
var User = require('../models/users');



exports.init= function() {
    console.log(Restaurant.schema.path('cuisine').caster.enumValues);
    // uncomment if you need to drop the database
    //
    // Character.remove({}, function(err) {
    //    console.log('collection removed')
    // });

    // const dob=new Date(1908, 12, 1).getFullYear();

    var restaurant = new Restaurant({
        name: 'Chilli Klaus23',
        address: {
            country: 'England',
            county: 'South Yorkshire',
            city: 'Sheffield',
            postcode: 'S128IK',
            building: 12,
            coordinates: [3.12, 3.1]
        },
        cuisine: 'Mexican',
        review: {
            author: "chilli_klaus",
            rating: 5,
            date: Date.now(),
            text: "Evala"
        }
    });

    restaurant.save(function (err, results) {
        //console.log(results._id);
    });
};