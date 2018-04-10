
$(function () {

    var map, locationMessage;

    function initMap() {

        // var location = new google.maps.LatLng(53.38297,  -1.4659);
        //
        // var mapCanvas = document.getElementById('map');
        // var mapOptions = {
        //     center: location,
        //     zoom: 16,
        //     panControl: false,
        //     mapTypeId: google.maps.MapTypeId.ROADMAP
        // }
        //
        // var map = new google.maps.Map(mapCanvas, mapOptions);

        //Default
        locationCoordinates = {lat:53.3811, lng: -1.4701};

        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 53.3811, lng: -1.4701},
            zoom: 15
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

                //Add the marker to the map
                var marker = new google.maps.Marker({
                    position: pos,
                    map: map,
                });

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

    google.maps.event.addDomListener(window, 'load', initMap);
});