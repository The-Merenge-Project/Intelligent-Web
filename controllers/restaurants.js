var mongoose = require('mongoose');
var Restaurant = require('../models/restaurants');
var Address = require('../models/addresses');
var async = require('async');

exports.getRestaurant = function (req, res, something) {

    var userData = req.body;
    console.log(something)

    console.log(userData)
    if (userData == null) {
        res.status(403).send('No data sent!')
    }

    async.waterfall([
        function (callback) {

            var cuisines = Restaurant.schema.path('cuisine').caster.enumValues;

            Restaurant.find({name: userData.search_query},
                function (err, restaurants) {
                    if (err)
                        res.status(500).send('Invalid data!');
                    var restaurant = null;
                    if (restaurants.length > 0) {
                        var allRestaurants = [];
                        restaurants.forEach(function (restaurantItem) {
                            restaurant = {
                                name: restaurantItem.name, address: restaurantItem.address,
                                cuisine: restaurantItem.cuisine
                            };
                            allRestaurants.push(restaurant);
                        })
                    }

                    callback(null, allRestaurants, cuisines)
                });
        },
        function (restaurants, cuisines, callback) {

            if (restaurants) {
                var getRestaurantAddress = function() {
                    // map purchasesArray to an array of promises
                    var promises = restaurants.map(function(restaurant) {
                        return Address.findOne({
                            _id: mongoose.Types.ObjectId(restaurant.address) // some property of the desired item
                        }).exec()
                            .then(function(found_address) {
                                // Here you can freely compose an object comprising data from :
                                // * the synchronously derived `restaurant` (an element of 'restaurants array`)
                                // * the asynchronously derived `address` (from database given id from restaurant object).
                                // `restaurant` is still available thanks to "closure".

                                var address = {
                                    country: found_address.country,  county: found_address.county,
                                    city: found_address.city, postcode: found_address.postcode,
                                    building: found_address.building
                                };
                                restaurant.address = address;

                                return restaurant;
                            })
                            // Here, by catching, no individual error will cause the whole response to fail.
                            .then(null, (err) = null)
                    });
                    return Promise.all(promises); // return a promise that settles when all `promises` are fulfilled or any one of them fails.
                };


                getRestaurantAddress().then(function(restaurants_with_addresses) {
                    //console.log("Here");
                    // restaurants_with_addresses` is an array of the objects composed in getRestaurantAddress()
                    // , which are restaurants object with added addreses from addres model
                    callback(null, restaurants_with_addresses, cuisines);

                }).catch(function(err) {
                    console.log(err);
                    res.sendStatus(500); // or similar
                });
            } else {
                callback(null, restaurants, cuisines);
            }


        }
    ], function(err, restaurants, cuisines) {
        res.render('search_result', {restaurant: restaurants, cuisines: cuisines});
    });
};

