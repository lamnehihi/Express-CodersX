var express = require('express');
var port = 3000;

var userRoute = require('./routes/user.route')

var app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/',function(req, res) {
  res.render('index',{
    name : 'Thanh Lam',
    age : 18,
  });
});

app.use('/users', userRoute);

app.listen(port, function() {
  console.log('Example app listening at http://localhost' + port);
});