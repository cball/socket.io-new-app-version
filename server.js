var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require('redis');
var redisClient = redis.createClient();

// use socket.io-redis if you need lots of connections. it allows
// socket.io to work across servers
var socketIORedis = require('socket.io-redis');
io.adapter(socketIORedis({ host: 'localhost', port: 6379 }));

redisClient.subscribe('new-app-version');

redisClient.on('message', function(channel, message) {
  if(channel == 'new-app-version') {
    io.emit('new app version', message);
  }
});

// server config
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
  console.log('publish something to the new-app-version Redis channel (redis-cli publish new-app-version whoa!)');
  console.log('---');
});
