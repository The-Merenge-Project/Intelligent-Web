$("#search_query").keyup(function (e) {
    if ($("#search_query").is(":focus")) {
        console.log("HERE");
        // Do something
        document.getElementById("suggestions").style.display = "block";
    } else {
        document.getElementById("suggestions").style.display = "none";
    }
});