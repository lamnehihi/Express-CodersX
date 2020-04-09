var express = require('express');
var app = express();

var port = 3000;

var users = [
  {id : 1, name : 'Thanh lam'},
  {id : 2, name : 'Ngoc Phuc'},
];

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/',function(req, res) {
  res.render('index',{
    name : 'Thanh Lam',
    age : 18,
  });
});

app.get('/users',function(req, res) {
  res.render('users/index', {
    users : users
  });
});

app.get('/users/search', function(req, res) {
  var q = req.query.q;
  var searchUser = users.filter(function(user) {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render('users/index', {
    users : searchUser,
    q
  });
});

app.listen(port, function() {
  console.log('Example app listening at http://localhost' + port);
});