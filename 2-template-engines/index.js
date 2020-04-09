var express = require('express');
var app = express();

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
    users : [
      {id : 1, name : 'Thanh lam'},
      {id : 2, name : 'Ngoc Phuc'},
    ]
  });
});


app.listen(port, function() {
  console.log('Example app listening at http://localhost' + port);
});