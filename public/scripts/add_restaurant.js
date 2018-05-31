/**
 * Uses POST request to send new restaurant object
 * to the controller which adds the restaurant to the database
 * and finally displays the page of the newly added restaurant.
 *
 * @param url - the path which the POST request goes to
 *              here it is the add restaurant path which
 *              adds a new restaurant via the restaurants controller
 * @param data - the data obtained via the add restaurant form
 */
function sendAjaxQuery(url, data) {
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function (dataR) {

            // no need to JSON parse the result, as we are using
            // dataType:json, so JQuery knows it and unpacks the
            // object for us before returning it
            var ret = dataR;
            // print success message and provide link to
            // newly created restaurant's detailed page
            var result_div = document.getElementById('result');
            result_div.innerHTML= 'Restaurant successfully added. You can access it ';
            result_div.classList.add('alert');
            result_div.classList.add('alert-success');
            var linkToNewRestaurant = document.createElement('a');
            var linkText = document.createTextNode('here.');
            linkToNewRestaurant.appendChild(linkText);
            linkToNewRestaurant.href = '/restaurant/' + dataR;
            result_div.appendChild(linkToNewRestaurant);
            window.scrollTo(0, 0);
        },
        error: function (xhr, status, error) {
            var result_div = document.getElementById('result');
            result_div.classList.add('alert');
            result_div.classList.add('alert-danger');
            result_div.innerHTML= 'The restaurant could not be added. Please try again.';
            window.scrollTo(0, 0);
        }
    });
}

/**
 * When the add restaurant form is submitted
 * obtain the values in the form and
 * send them to an AJAX query which
 * will then forward it to on add_restaurant path.
 */

$('#add_restaurant_form').on('submit', function(ev){
    var formArray= $("form").serializeArray();
    var data={};
    for (index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }

    data['image'] = document.getElementById('photo').src;

    console.log(data);
    sendAjaxQuery('/add_restaurant', data);
    ev.preventDefault();
});


/**
 * Defines the values autocomplete will fill in the
 * address part of the add restaurant form
 *
 * @param street_number - the number of the street
 * @param route - the name of the street
 * @param postal_town - the name of the city
 * @param administrative_area_level_1 - the name of the country
 * @param postal_code - the post code
 */
var placeSearch, autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    postal_town: 'long_name',
    administrative_area_level_1: 'short_name',
    postal_code: 'short_name'
};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    var input = document.getElementById('searchTextField');

    // Create the autocomplete object, restricting the search to geographical
    // location types in the UK
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
        {types: ['geocode'], componentRestrictions: {country: 'gb'}});


    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();

    // enable the disabled fields so that they can be send via the form submission
    for (var component in componentForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }

    // send the latitude and longitude to hidden fields in the form as
    // they do not need to be displayed but need to be saved in the database
    document.getElementById("latitude").value = place.geometry.location.lat();
    document.getElementById('longitude').value = place.geometry.location.lng();

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
        }
    }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}
