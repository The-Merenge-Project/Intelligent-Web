
$(function () {

    var map, locationMessage;
    var locationCoordinates;
    var userInputedKilometerRadius;
    var restaurantCoordinatesArray = [{lat:43.23, lng: 27.86},{lat:43.24, lng: 27.86},{lat:43.25, lng: 27.85}, {lat:43.21, lng: 27.9}]

    //TODO - we will get restaurant object and will use its field to attach popping window with info for each restaurant
    function initMap() {

        //Default location (shown if the geolocation does not get the current position of user)
        locationCoordinates = {lat:53.3811, lng: -1.4701};

        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 53.3811, lng: -1.4701},
            zoom: 14
        });
        locationMessage = new google.maps.InfoWindow;

        //The image of the marker in out hierarchy
        var markerImage = '/img/marker.png';

        //HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                console.log(pos)
                console.log(locationCoordinates)
                locationCoordinates = pos
                console.log(pos)
                console.log(locationCoordinates)

                //Add the marker to the map
                var marker = new google.maps.Marker({
                    position: pos,
                    map: map,
                });

                userInputedKilometerRadius = 3;

                addRestaurantMarkers(restaurantCoordinatesArray, map, userInputedKilometerRadius)

                locationMessage.setPosition(pos);
                locationMessage.setContent('Location found.');
                locationMessage.open(map);
                map.setCenter(pos);

            }, function() {
                handleLocationError(true, locationMessage, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, locationMessage, map.getCenter());
        }
    }

    function handleLocationError(browserHasGeolocation, locationMessage, pos) {
        locationMessage.setPosition(pos);
        locationMessage.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        locationMessage.open(map);
    }

    /**
     * add restaurant markers to the map, provided that they are withing a user
     * specified kilometers radius
     *
     * @param coordinates {Array} {lat: Number, lng: Number}
     * @param map {Object} Google Maps Map Object
     * @param kilometerRadius {Number}
     *
     */
    function addRestaurantMarkers(coordinates, map, kilometerRadius){

        coordinates.forEach(function (coordinate) {
            var restaurantPosition = {
                lat: coordinate.lat,
                lng: coordinate.lng
            };

            console.log("Restaurant at %s %s", restaurantPosition.lat, restaurantPosition.lng)
            console.log("is in %s kilometers radius %s", kilometerRadius, isInRadius(locationCoordinates,restaurantPosition, kilometerRadius))

            if (isInRadius(locationCoordinates,restaurantPosition, kilometerRadius)){
                var marker = new google.maps.Marker({
                    position: restaurantPosition,
                    map: map,
                });
            }

        });

        /**
         * is the destination object  within the specified kilometer radius of the origin object
         *
         * @param origin {Object} {lat: Number, lng: Number}
         * @param destination {Object} {lat: Number, lng: Number}
         * @param kilometers {Number}
         * @returns {boolean}
         */
        function isInRadius(origin, destination, kilometers) {

            //Earth's radius
            let R = 6371;

            let transformDegreesToRadius = (n) => { return Math.tan(n * (Math.PI/180)) };

            let latDifference = transformDegreesToRadius(origin.lat - destination.lat);
            let lngDifference = transformDegreesToRadius(origin.lng - destination.lng);

            let angleCalculation = Math.sin(latDifference/2) * Math.sin(latDifference/2) + Math.cos(transformDegreesToRadius(origin.lat))
                        * Math.cos(transformDegreesToRadius(destination.lat)) * Math.sin(lngDifference/2) * Math.sin(lngDifference/2);

            let c = 2 * Math.asin(Math.sqrt(angleCalculation));

            let distance = R * c;

            return (distance <= kilometers);

        }
    }

    google.maps.event.addDomListener(window, 'load', initMap);
});