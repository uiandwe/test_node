var express = require('express')
  , app = module.exports = express()
  , test = app.get('env') == 'test';

if (!test) app.use(express.logger('dev'));
app.use(app.router);

// the error handler is strategically
// placed *below* the app.router; if it
// were above it would not receive errors
// from app.get() etc 
app.use(error);

// error handling middleware have an arity of 4
// instead of the typical (req, res, next),
// otherwise they behave exactly like regular
// middleware, you may have several of them,
// in different orders etc.

function error(err, req, res, next) {
  // log it
  if (!test) console.error(err.stack);

  // respond with 500 "Internal Server Error".
  res.send(500);
}

function NotFound(msg){
  this.name = 'NotFound';
  Error.call(this, msg);
  Error.captureStackTrace(this, arguments.callee);
}

NotFound.prototype.__proto__ = Error.prototype;

app.get('/404', function(req, res){
  throw new NotFound;
});

app.get('/500', function(req, res){
  throw new Error('keyboard cat!');
});


app.get('/', function(req, res){
  // Caught and passed down to the errorHandler middleware
  throw new Error('something broke!');
});

app.get('/next', function(req, res, next){
  // We can also pass exceptions to next()
  process.nextTick(function(){
    next(new Error('oh no!'));
  });
});

if (!module.parent) {
  app.listen(process.env.PORT);
  console.log('Express started on port 3000');
}