var mongoose = require('mongoose');
var Restaurant = require('../models/restaurants');
var async = require('async');

exports.getRestaurants = function (req, res) {
    var userData = req.body;
    console.log(userData.query);
    var cuisines = Restaurant.schema.path('cuisine').caster.enumValues;
    var allRestaurants = [];

    try {
        Restaurant.find( {$or: [{name: { $regex: userData.query, $options: 'i' }},
                                {'address.city': { $regex: userData.query, $options: 'i' }}]} ,
            function (err, restaurants) {
                if (err) {
                    res.status(500).send('Invalid data!');
                }

                if (restaurants.length > 0) {
                    restaurants.forEach(function (restaurantItem) {
                        var restaurant = {

                            name: restaurantItem.name,
                            address: restaurantItem.address,
                            cuisine: restaurantItem.cuisine,
                            review: restaurantItem.review,
                            average_rating: restaurantItem.average_rating
                        };
                        allRestaurants.push(restaurant);
                    })
                }
                console.log("here");
                console.log(JSON.stringify(allRestaurants));
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(allRestaurants));
        });

    } catch (e) {
        //res.status(500).send('error '+ e);
    }

};

