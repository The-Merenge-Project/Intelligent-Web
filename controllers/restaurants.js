var Restaurant = require('../models/restaurants');

exports.getRestaurant = function (req, res) {
    var userData = req.body;
    console.log(userData)
    if (userData == null) {
        res.status(403).send('No data sent!')
    }
    try {
        Restaurant.find({name: userData.search_query},
            'name address cuisine',
            function (err, restaurants) {
                if (err)
                    res.status(500).send('Invalid data!');
                var restaurant = null;
                if (restaurants.length > 0) {
                    var firstElem = restaurants[0];
                    restaurant = {
                        name: firstElem.name, address: firstElem.address,
                        cuisine: firstElem.cuisine
                    };
                }
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(restaurant));
            });
    } catch (e) {
        res.status(500).send('error ' + e);
    }
}