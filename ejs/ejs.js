var http = require('http');
var fs = require('fs');
var ejs = require('ejs');
 
http.createServer(function (request, response) {
 
 // ejs 파일 읽기
 fs.readFile('test.ejs', 'utf8', function(error, data) {
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(ejs.render(data, {
   test1: 'Hello',
   test2: 'World'
  }));
 });
 
}).listen(process.env.PORT, function() {
 console.log('Server Running ~!');
});



