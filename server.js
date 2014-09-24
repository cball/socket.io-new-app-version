var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require('redis');
var redisClient = redis.createClient();
var redisSubscriber = redis.createClient();

// use socket.io-redis if you need lots of connections. it allows
// socket.io to work across servers
var socketIORedis = require('socket.io-redis');
io.adapter(socketIORedis({ host: 'localhost', port: 6379 }));

redisSubscriber.subscribe('frontend-app-version');
redisSubscriber.subscribe('iphone-app-version');

redisSubscriber.on('message', function(channel, message) {
  io.emit(channel, message);
});

io.on('connection', function(socket) {
  redisClient.get('frontend-app-version', function(error, value) {
    socket.emit('frontend-app-version', value);
  });
});

// server config
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
  console.log('publish something to the new-app-version Redis channel (redis-cli publish frontend-app-version whoa!)');
  console.log('---');
});
