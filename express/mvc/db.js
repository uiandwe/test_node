// faux database

var pets = exports.pets = [];

pets.push({ name: 'Tobi', id: 0 });
pets.push({ name: 'Loki', id: 1 });
pets.push({ name: 'Jane', id: 2 });
pets.push({ name: 'Raul', id: 3 });

var users = exports.users = [];

users.push({ name: 'TJ', pets: [pets[0], pets[1], pets[2]], id: 0  });
users.push({ name: 'Guillermo', pets: [pets[3]], id: 1 });
users.push({ name: 'Nathan', pets: [], id: 2 });


var uiandwe = exports.uiandwe = [];

uiandwe.push({name : 'HHH', age : 29 , skill:[ 'c' , 'java', 'python']});
uiandwe.push({name : 'sss', age : 29 , skill:[ 'node.js' , 'hadoop']});