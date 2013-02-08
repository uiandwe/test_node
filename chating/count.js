var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

var server = http.createServer(function (request, response) {
 
 fs.readFile('./chating/count.html', function (error, data) {
  response.writeHead(200, { 'Content-Type': 'text/html'} );
  response.end(data);
 }); 
}).listen(process.env.PORT, function() {
 console.log('Server Running~!');
});

var io = socketio.listen(server);
io.sockets.on('connection', function (socket) {
 
 socket.on('message', function(data) {
   console.log(data);
  io.sockets.emit('message', data); 
 });
});
