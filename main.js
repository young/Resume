var socket = io();
var currentLocation = 0;

var username;
$(document).ready(function() {
  $(".video-player").hide();
  $(".video-player").on(
    "timeupdate",
    function(event){
      onTrackedVideoFrame(this.currentTime, this.duration);
    });

  var videoEl_ = document.querySelector('.video-player');
  // videoEl_.onloadedmetadata = function() {
  //   videoEl_.currentTime = currentLocation;
  // };

  $(".video-player").on('loadedmetadata', function() {
    this.currentTime = 50;
  }, false);

  function onTrackedVideoFrame(currentTime, duration) {
    //socket.emit('click', {'event': 'video at ' + currentTime});
    socket.emit('currentLocation', {'currentLocation': currentTime, 'username': username });
  }
  socket.on('connection', function(data) {
    currentLocation = data.setLocation;
  });
  socket.on('login-ready', function(data) {
    videoEl_.currentTime = data.setLocation;
    $(".video-player").show();
    videoEl_.play();
  });

});

function login() {
  username = document.querySelector('.username').value;
  socket.emit('login', {'username': username});
}