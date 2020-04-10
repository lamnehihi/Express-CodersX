var express = require('express');
var app = express();
var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')
 
var adapter = new FileSync('db.json')
var db = low(adapter)

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Set some defaults
db.defaults({ users: {} })
  .write()

var port = 3000;


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
    users : db.get('users').value()
  });
});

app.get('/users/search', function(req, res) {
  var q = req.query.q;
  var searchUser = db.get('users').value().filter(function(user) {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render('users/index', {
    users : searchUser,
    q
  });
});

app.get('/users/create', function(req, res) {
  res.render('users/create', {
  });
});

app.post('/users/create', function (req, res) {
  db.get('users').push(req.body).write();
  res.redirect('/users');
});

app.listen(port, function() {
  console.log('Example app listening at http://localhost' + port);
});