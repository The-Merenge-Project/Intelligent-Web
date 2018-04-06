var mongoose = require('mongoose');
var Address = require('../models/addresses');
var Restaurant = require('../models/restaurants')


exports.init= function() {
    // uncomment if you need to drop the database
    //
    // Character.remove({}, function(err) {
    //    console.log('collection removed')
    // });

    // const dob=new Date(1908, 12, 1).getFullYear();
    var address = new Address({
         country: 'England',
         county: 'South Yorkshire',
         city: 'Sheffield',
         postcode: 'S128IK',
         building: 12,
         coordinates: [3.12, 3.12]
     });

    var restaurant = new Restaurant({
        name: 'Bar Valentin',
        address: address,
        cusine: 'Eastern European'
    });
     //console.log('dob: '+character.dob);

    address.save(function (err, results) {
         console.log(results._id);
     });

    restaurant.save(function (err, results) {
        console.log(results._id);
    });
}