function initMap() {}

$(document).ready(function(){
    if (!navigator.onLine){
       showOfflineWarning()
    }else{
        hideOfflineWarning()
    }
});

$("#search_bar_form").submit(function(e){
    console.log("Here")
    if (!navigator.onLine){
        e.preventDefault();

        alert("You cannot search while offline")
    }
});

/**
 * Uses POST request to find restaurants matching
 * the user query in the database and on success
 * displays them on the page.
 *
 * @param user_query a string that the user has typed in when searching for a restaurant
 */
function restaurantSearchAjaxQuery(user_query) {
    $.ajax({
        url: '/index',
        data: user_query,
        dataType: 'json',
        type: 'POST',
        success: function (dataR) {
            $.each(dataR, function (key, value) {
                console.log("HERE");
                console.log(value.review[0].image);
                console.log(value.review[0].image[0]);
                $('#result').append('<div class="result_item">'+ '<img src="../' + value.review[0].image[0] + '"> '
                    + '<a href="/restaurant/'+ value.id + '">' + value.name +'</a>'+
                    '<p>'+ value.restaurant_rating + ' ' + value.review.length + ' reviews</p>' +
                    '<p class="text-muted">' + value.address.building + ' ' + value.address.street + ', '
                    + value.address.city + ', ' + value.address.county + '</p></div>');
            })
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    });
}


/**
 * When the user types in the search bar
 * obtain the string they have typed in
 * when it has 3 or more characters
 * and query the database using AJAX POST request.
 */
$(document).ready(function () {
    $('#search_query').keyup(function () {
        $('#result').html('');
        var searchField = $('#search_query').val();
        if (searchField.length >= 3){
            restaurantSearchAjaxQuery({query: searchField});
        }
    });
});

/**
 * When the client gets off-line, it shows an off line warning to the user
 * so that it is clear that the data is stale
 */
window.addEventListener('offline', function(e) {
    // Queue up events for server.
    console.log("You are offline");
    showOfflineWarning();
}, false);

/**
 * When the client gets online, it hides the off line warning
 */
window.addEventListener('online', function(e) {
    // Resync data with server.
    console.log("You are online");
    hideOfflineWarning();
}, false);


function showOfflineWarning(){
    if (document.getElementById('offline_div')!=null){
        document.getElementById('offline_div').style.display='block';
        $("#search_bar").addClass('search_query_warning');
        document.getElementById('offline_search_warning').style.display = 'block';
    }



}

function hideOfflineWarning(){
    if (document.getElementById('offline_div')!=null){
        document.getElementById('offline_div').style.display='none';
        $("#search_bar").removeClass('search_query_warning');
        document.getElementById('offline_search_warning').style.display = 'none';
    }

}
