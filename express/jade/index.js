
var express = require('express');

var app = express();

app.set('views', __dirname + '/views');
app.use(app.router);
app.use(express.static(__dirname + '/public'));
app.use(express.errorHandler());

// Optional since express defaults to CWD/views



// Set our default template engine to "jade"
// which prevents the need for extensions
// (although you can still mix and match)
app.set('view engine', 'jade');

function User(name, email) {
  this.name = name;
  this.email = email;
}

// Dummy users
var users = [
    new User('tj', 'tj@vision-media.ca')
  , new User('ciaran', 'ciaranj@gmail.com')
  , new User('aaron', 'aaron.heckmann+github@gmail.com')
];

app.get('/', function(req, res){
  res.render('users', { users: users });
});

app.listen(process.env.PORT);
console.log('Express app started on port 3000');