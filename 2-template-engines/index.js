var express = require('express');
var userRoute = require('./routes/user.route')
var cookieParser = require('cookie-parser')

var port = 3000;


var app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser())

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