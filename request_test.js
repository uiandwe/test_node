var request = require('request')
    , JSONStream = require('JSONStream')
    , es = require('event-stream')
    , async = require('async')
    , cluster = require('cluster')
    , numCPUs = require('os').cpus().length
    , socketio = require('socket.io')
    , express = require('express');

 if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
 
    cluster.on('death', function(worker) {
        console.log('worker ' + worker.pid + ' died');
    });
} else {
    var app = express();
    var server = require('http').createServer(app);
    var io = socketio.listen(server);
    
    app.get('/', function(req, res){
        //console.log("WORKED!! %s", process.env.NODE_WORKER_ID);
        res.sendfile('index.html');
    });
 
   
    console.log('Server Running~!');
        
    function thread1() { 
        var result  = Array();
    	var result_twi  = Array();
     
        var parser = JSONStream.parse(['results', true])
                     .on('error', function(err) { console.log(err); })
          , req = request({url: 'http://search.twitter.com/search.json?geocode=37.335887,126.584063,125000km'})
          , logger = es.mapSync(function (data) {
                //console.log(data.iso_language_code);
                result.push(data.iso_language_code);
        result_twi.push(data.text);
             
        }).on('error', function(err) { console.log(err); });
        
        
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
            //console.log('twitter count : '+result.length);
            //io.sockets.on('connection', function (socket) {
             // console.log("return : " + result.length);
             io.sockets.emit('message', result); 
             io.sockets.emit('message_twi', result_twi); 
           // });
        });
    }

    var tid = setInterval( thread1,  1000);
    
    server.listen(8080);

}