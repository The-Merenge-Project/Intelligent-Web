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
