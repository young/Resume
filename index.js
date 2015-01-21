var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var port = process.env.PORT || 2368;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public/views'));

// Hacky fake database
// TODO(jem): use a real datastore
var usernames = {};
var numUsers = 0;

var userData = {};
io.on('connection', function (socket) {
  var addedUser = false;

  // Track click
  // TODO(jem) realtime metrics on users, clicks, etc
  socket.on('click', function (data) {
    console.log(data.event);
  });
  socket.on('login', function (data) {
    socket.emit('login-ready', {'setLocation': userData[data.username] || 0});
  });
  socket.on('currentLocation', function (data) {
    userData[data.username] = data.currentLocation;
  });
});
