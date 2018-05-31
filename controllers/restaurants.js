var mongoose = require('mongoose');
var Restaurant = require('../models/restaurants');
var fs = require('fs');

/**
 * Uses data sent via the add restaurant page
 * to add a new restaurant to the database
 *
 * @param req - contains the data obtained via the
 *              add restaurant form which includes
 *              name, full address and cuisines
 */
exports.addRestaurant = function(req, res) {
    var restaurantData = req.body;
    // cuisine values come in the format of "Greek: Greek",
    // so check which values are cuisines and add them
    // to an array that will be in the appropriate format
    // for adding to the database
    var cuisines = [];
    for (field  in restaurantData) {
        if (global.cuisineEnum.indexOf(field) > -1) {
            cuisines.push(field);
        }
    }

    var newString = new Date().getTime();
    var targetDirectory = "./public/img/uploads/" + restaurantData.name + "/";
    var imageBlob = req.body.image.replace(/^data:image\/\w+;base64,/, "");
    var buf = new Buffer(imageBlob, 'base64');

    var imagePath = targetDirectory + newString + '.png';
    if(!fs.existsSync(targetDirectory)) {
        fs.mkdir(targetDirectory, function(err){
            if(err) throw err;
            console.log(imagePath)
            fs.writeFile(imagePath, buf, function(err) {
                if(err) throw err;
            });
        });
    }

    // create the new restaurant object with the obtained values
    var new_restaurant = new Restaurant({
        name: restaurantData.name,
        address: {
            country: restaurantData.country,
            city: restaurantData.city,
            postcode: restaurantData.postcode,
            building: restaurantData.building,
            street: restaurantData.street,
            coordinate: { lat: restaurantData.latitude, lng: restaurantData.longitude}
        },
        cuisine: cuisines,
        image: imagePath
    });

    // save the restaurant to the databse
    new_restaurant.save(function (err, result) {
        if (err) {
            res.status(500).send('Invalid data!');
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(result._id));
        }
    });
};

/**
 * Given a user query returns a list of matching restaurants
 * The query can contain a restaurant name or a city name
 *
 * @param req - includes the user query
 */
exports.restaurantList = function (req, res) {
    var userData = req.body;

    var allRestaurants = [];
    // returns all restaurants which partially match the query string
    // either with their name or the city they're in
    // which are then displayed as live search suggestions on the index page
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
                            restaurant_rating: restaurantItem.restaurant_rating
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

/**
 * Given a restaurant id return all information
 * contained in the database about the matching restaurant
 *
 * @param req - includes the restaurant id
 */
exports.restaurantDetail = function (req, res) {
  try {
      Restaurant.findById(req.params.id, function (err, foundRestaurant) {
          if (err) {
              res.status(500).send('Invalid data!');
          }

          var restaurant = {name: foundRestaurant.name, address: foundRestaurant.address,
              cuisine: foundRestaurant.cuisine, review: foundRestaurant.review,
              restaurant_rating: foundRestaurant.restaurant_rating, image: foundRestaurant.image};

          res.render('restaurant_detail', {restaurant : restaurant, restaurant_id: req.params.id});
      });


  }  catch (e) {
      //res.status(500).send('error '+ e);
  }
};
