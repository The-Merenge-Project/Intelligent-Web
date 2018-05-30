//We make the connection to the socket from the front-end
//which was loaded on the relevant view
var socket = io.connect("http://localhost:3000");

var title = document.getElementById('title');
var review = document.getElementById('message');
var button = document.getElementById('send');
var output = document.getElementById('output');
var username = document.getElementById('username');
var restaurant_id = document.getElementById('restaurant-id');


//Emit events

button.addEventListener('click', function(){
    var serviceRating = document.getElementsByClassName('br-current-rating')[0];
    var foodRating = document.getElementsByClassName('br-current-rating')[1];
    var valueRating = document.getElementsByClassName('br-current-rating')[2];
    
   socket.emit('review', {
       username: username.textContent,
       title: title.value,
       review: message.value,
       service_rating: serviceRating.textContent,
       food_rating: foodRating.textContent,
       value_rating: valueRating.textContent,
       restaurant_id: restaurant_id.textContent


   })
});

//Listen to events

socket.on('review', function (data) {
    output.innerHTML += '<p>' + data.review + '</p>';
});