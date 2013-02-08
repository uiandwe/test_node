var http = require('http');
var fs = require('fs');
var jade = require('jade'); 

http.createServer(function (request, response) {
 
 // jade 파일 읽음. 
 fs.readFile('test.jade', 'utf8', function(error, data){
  // jade 모듈 사용
  var fn = jade.compile(data);
  
  // 출력
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(fn());
  
 });
 
}).listen(process.env.PORT, function() {
 console.log('Server Running');
});
