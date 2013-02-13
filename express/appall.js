var express = require('express')
  , app = express.createServer();
/*
app.all()은 한 번 호출하여 같은 로직의 모든 HTTP 동사에 적용하는데 도움을 줍니다. 
다음 예제는 가상의 데이터베이스에서 사용자를 읽고 그것을 req.user에 할당할 것입니다.

도메인/user/0
*/


var users = [{ name: 'tj' }];

app.all('/user/:id/:op?', function(req, res, next){
  req.user = users[req.params.id];
  if (req.user) {
    next();
  } else {
    next(new Error('cannot find user ' + req.params.id));
  }
});

app.get('/user/:id', function(req, res){
  res.send('viewing ' + req.user.name);
});

app.get('/user/:id/edit', function(req, res){
  res.send('editing ' + req.user.name);
});

app.put('/user/:id', function(req, res){
  res.send('updating ' + req.user.name);
});

app.get('*', function(req, res){
  res.send('what???', 404);
});

app.listen(process.env.PORT); 