var Restaurant = require('../models/restaurants');
var Address = require('../models/addresses');
var async = require('async');

exports.getRestaurant = function (req, res) {
    var userData = req.body;
    console.log(userData)
    if (userData == null) {
        res.status(403).send('No data sent!')
    }

    async.waterfall([
        function (callback) {

            Restaurant.find({name: userData.search_query},
                function (err, restaurants) {
                    if (err)
                        res.status(500).send('Invalid data!');
                    var restaurant = null;
                    if (restaurants.length > 0) {
                        var allRestaurants = [];
                        restaurants.forEach(function (restaurantItem) {
                            //restaurant = {
                            //    name: restaurantItem.name, address: restaurantItem.address,
                            //    cuisine: restaurantItem.cuisine
                            //};
                            allRestaurants.push(restaurantItem);
                        })

                    }
                    var cuisines = Restaurant.schema.path('cuisine').caster.enumValues;
                    callback(null, allRestaurants, cuisines)
                });
        },
        function (arg1, arg2, callback) {
            // console.log(arg1)
            // console.log(arg2)

            arg1.forEach(function (restaurantItem) {

                Address.find({_id: restaurantItem.address},
                    'county country postcode',
                    function (err, addresses) {
                        if (err)
                            res.status(500).send('Invalid data!');

                        //address = addresses.postcode;

                        //TODO Make this shit work.
                        restaurantItem.address = addresses.postcode;
                        // console.log(restaurantItem.address);



                    });
            });
            callback(null, arg1, arg2)

        }
    ], function(err, restaurants, cuisines) {

        // console.log(restaurants)
        // console.log(cuisines)

        res.render('search_result', {restaurant: restaurants, cuisines: cuisines});
    });



    // try {
    //     Restaurant.find({name: userData.search_query},
    //         'name address cuisine',
    //         function (err, restaurants) {
    //             if (err)
    //                 res.status(500).send('Invalid data!');
    //             var restaurant = null;
    //             if (restaurants.length > 0) {
    //                 var firstElem = restaurants[0];
    //                 var address = null;
    //                 Address.find({_id: firstElem.address},
    //                     'county country postcode',
    //                     function (err, addresses) {
    //                         if (err)
    //                             res.status(500).send('Invalid data!');
    //
    //                         if (addresses.length > 0) {
    //
    //                             address = addresses[0].postcode;
    //                         }
    //                     });
    //                 console.log(address);
    //                 restaurant = {
    //                     name: firstElem.name, address: address,
    //                     cuisine: firstElem.cuisine
    //                 };
    //             }
    //             // res.setHeader('Content-Type', 'application/json');
    //             // res.send(JSON.stringify(restaurant));
    //             var cuisines = Restaurant.schema.path('cuisine').caster.enumValues;
    //             res.render('search_result', {restaurant: restaurant, cuisines: cuisines});
    //         });
    // } catch (e) {
    //     res.status(500).send('error ' + e);
    // }
}