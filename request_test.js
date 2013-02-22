var request = require('request')
  , JSONStream = require('JSONStream')
  , es = require('event-stream')
  ,  async = require('async');


 
var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

var server = http.createServer(function (request, response) {
 fs.readFile('./index.html', function (error, data) {
  response.writeHead(200, { 'Content-Type': 'text/html'} );
  response.end(data);
 }); 
}).listen(process.env.PORT, function() {
 console.log('Server Running~!');
});

var io = socketio.listen(server);


function thread1() { 
    var result  = Array(0);
        
    var parser = JSONStream.parse(['results', true])
      , req = request({url: 'http://search.twitter.com/search.json?callback=&q=twitter'})
      , logger = es.mapSync(function (data) {
            //console.log(data.iso_language_code);
            result.push(data.iso_language_code);
    });
    
    
    async.parallel([
      function(callback) {
        setTimeout(function() {
          req.pipe(parser).pipe(logger);
          callback(null, 'one');   
        }, 10);
      },
    
       
      function(callback) {          
        setTimeout(function(){
          callback(null, 'three');
        }, 1000);
      },
    ],
    
    
    function(err, results) {
      console.log('twitter count : '+result.length);
      
        io.sockets.on('connection', function (socket) {
 
         
            console.log("return : " + result.length);
          io.sockets.emit('message', result.length); 
         
        });
    });
   
   
}


thread1();
//var tid = setInterval( thread1,  1000);

/*
var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

var server = http.createServer(function (request, response) {
 fs.readFile('./index.html', function (error, data) {
  response.writeHead(200, { 'Content-Type': 'text/html'} );
  response.end(data);
 }); 
}).listen(process.env.PORT, function() {
 console.log('Server Running~!');
});

var io = socketio.listen(server);

 thread1();

io.sockets.on('connection', function (socket) {
 
 socket.on('message', function(data) {
    var re  = thread1();
    console.log("return : " + re);
  io.sockets.emit('message', re); 
 });
});

 */



