var db = require('../../db');


exports.engine = 'jade';

exports.before = function(req, res, next){
  //url 에서 선택한 숫자를 db에서 찾아서 객체로 넘김.
  var uiandwe = db.uiandwe[req.params.uiandwe_id];
  uiandwe.id = req.params.uiandwe_id;
  if (!uiandwe) return next(new Error('uiandwe not found'));
  //객체를 다시 req에 담아서 다음 함수로 넘김.
  req.uiandwe = uiandwe;
  next();
};


//   /uiandwe/:_id (0~1)
exports.show = function(req, res, next){
  res.render('show', { uiandwe: req.uiandwe });
};

//edit 페이지는 update 페이지와 연결시킴.
exports.edit = function(req, res, next){
  res.render('edit', { uiandwe: req.uiandwe });
};

//update 는 boot.js에서 put으로 파라미터를 받을때만 작동함.
exports.update = function(req, res, next){
  var body = req.body;
  req.uiandwe.name = body.user.name;
  res.message('Information updated!');
  res.redirect('/uiandwe/' + req.uiandwe.id);
};



//   url페이지 이름(boot.js 에 추가해야함)
exports.uiandwe = function(req, res, next){
   // console.log(req.users);
   //          jade이름,jade전달객체: 위에서 받은 객체(jade객체에 넣을 객체)
   res.render('uiandwe', { users : db.users });  
};