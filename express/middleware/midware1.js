var express = require('express')
  , app = express.createServer();

var users = [{ name: 'tj' }];

//미들웨어로 추상화 시킴
function loadUser(req, res, next) {
  // You would fetch your user from the db
  var user = users[req.params.id];
  if (user) {
    req.user = user;
    next();
  } else {
    next(new Error('Failed to load user ' + req.params.id));
  }
}


//추상화 함수로 바로 연결 값 리턴
app.get('/user/:id', loadUser, function(req, res){
  res.send('Viewing user ' + req.user.name);
});


app.listen(process.env.PORT); 