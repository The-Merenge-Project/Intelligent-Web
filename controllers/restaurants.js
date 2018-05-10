var mongoose = require('mongoose');
var Restaurant = require('../models/restaurants');
var async = require('async');

exports.restaurantList = function (req, res) {
    var userData = req.body;
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
                            id: restaurantItem.id,
                            name: restaurantItem.name,
                            address: restaurantItem.address,
                            cuisine: restaurantItem.cuisine,
                            review: restaurantItem.review,
                            average_rating: restaurantItem.average_rating
                        };
                        allRestaurants.push(restaurant);
                    })
                }
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(allRestaurants));
        });
    } catch (e) {
        res.status(500).send('error '+ e);
    }
};

exports.restaurantDetail = function (req, res) {
  try {
      console.log(req.params.id);
      Restaurant.findById(req.params.id, function (err, foundRestaurant) {
          if (err) {
              res.status(500).send('Invalid data!');
          }

          var restaurant = {name: foundRestaurant.name, address: foundRestaurant.address,
              cuisine: foundRestaurant.cuisine, review: foundRestaurant.review,
              image: foundRestaurant.image};

          res.render('restaurant_detail', {restaurant : restaurant});
      });


  }  catch (e) {
      //res.status(500).send('error '+ e);
  }
};
