var express = require('express');
var fs = require('fs');


var app = express();
app.configure(function(){
  app.set('views', __dirname + '/');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.logger());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

app.get('/user/:id', function(req, res){
    res.sendfile(__dirname+'/user' + req.params.id+'.html');
});


app.get('/', function(req, res){
        res.sendfile(__dirname+'/index.html');
}).listen(process.env.PORT);

/*
app.post('/', function(req, res){
  res.send(req.body);
});
*/