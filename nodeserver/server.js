var express = require('express')
  , http    = require('http')
  , fs      = require('fs')
  , redis   = require('redis')
  , server = http.createServer(app)
  , io    = require('socket.io').listen(server);  

var app = express();
var clientSusbcribe = redis.createClient();

server.listen(8080, function(){
   console.log("Express server listening on port " + "8080");
});

io.configure(function () {
    io.set('log level', 1); // reduce logging
});

io.sockets.on('connection', function (socket) {    
    socket.join('the_channel');
    socket.on('disconnect', function () {
    });
});

/*
 * redis
 */
clientSusbcribe.subscribe('the_channel');
clientSusbcribe.on('message', function (channel, json) {
    console.log("Recieve from channel : %s, message : %s", channel, json);
    io.sockets.in('the_channel').json.send(json);
});