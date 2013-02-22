var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');
 
// 웹 서버 생성 
var server = http.createServer(function (request, response) {
 
 // index.html 파일 읽음.
 fs.readFile('index.html', function (error, data) {
  response.writeHead(200, {'Content-Type': 'text/html' });
  response.end(data);
 });
}).listen(process.env.PORT);
 
var io = socketio.listen(server);
 
// 클라이언트 접속 처리 
io.sockets.on('connection', function (socket) {
 // 클라이언트가 보낸 Send 이벤트 처리 
 socket.on('Event1', function(data) {
  console.log('Client Send Data:', data);
  socket.emit('Event2', data);
 });
});

