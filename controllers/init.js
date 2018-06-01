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
        name: 'Suzdurmaaaa',
        address: {
            country: 'England',
            county: 'South Yorkshire',
            city: 'Sheffield',
            postcode: 'S128IK',
            building: 12,
            street: 'Club Garden',
            coordinates: [3.12, 3.1]
        },
        cuisine: ['Mexican', 'Eastern European', 'American'],
        review: [{
            author: "sheih senuri",
            rating: {
                service: 5,
                food: 4,
                value: 3
            },
            date: Date.now(),
            text: 'Evala',
            title: 'Mnogo dobre',
            image: ['img/uploads/ceviche-con-calamares.jpg', 'img/uploads/burger.jpg',
                'img/uploads/mc.jpg', 'img/uploads/something.jpg', 'img/uploads/burger.jpg',
                'img/uploads/masa.jpg','img/uploads/riba.jpg','img/uploads/vkusno.jpg']
        }]
    });

    restaurant.save(function (err, results) {
        // var test = {
        //     author: "petrov",
        //     rating: {
        //         service: 5,
        //         food: 4,
        //         value: 3
        //     },
        //     date: Date.now(),
        //     text: 'UjasT',
        //     title: 'Mnogo zle'
        // };
        //
        // Restaurant.findById(results._id, function (err, doc) {
        //     if (err) { console.log(err)}
        //
        //     doc.review.push(test);
        //     doc.save(function (err, results) {
        //
        //     });
        // });
    });
};