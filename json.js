var express = require('express');
var fs = require('fs')
    , jsdom = require('jsdom')
    , request = require('request')
    , url = require('url');


var app = express();
app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.logger());
  app.use(app.router);

});



app.get('/', function(req, res){
        res.sendfile(__dirname+'/index.html');
}).listen(process.env.PORT);



io.sockets.on('connection', function (socket) {
 // 클라이언트가 보낸 Send 이벤트 처리 
 socket.on('Event1', function(data) {
  console.log('Client Send Data:', data);
  socket.emit('Event2', data);
 });
});

