$(function () {

    function initMap() {

        var location = new google.maps.LatLng(53.38297,  -1.4659);

        var mapCanvas = document.getElementById('map');
        var mapOptions = {
            center: location,
            zoom: 16,
            panControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        var map = new google.maps.Map(mapCanvas, mapOptions);

        //The image of the marker in out hierarchy
        var markerImage = '/img/marker.png';

        //Add the marker to the map
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: markerImage
        });

        //Content displayed above the marker image
        var contentString = '<div class="info-window">' +
            '<h3>Info Window Content</h3>' +
            '<div class="info-content">' +
            '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>' +
            '</div>' +
            '</div>';

        //Create the info window object
        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 400
        });

        //Add the info window to the object and wait for a click on the marker to show the window
        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });
    }

    google.maps.event.addDomListener(window, 'load', initMap);
});