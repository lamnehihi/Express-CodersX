var express = require('express');
var cookieParser = require('cookie-parser')

var userRoute = require('./routes/user.route')
var authRoute = require('./routes/auth.route')

var authMiddleware = require('./middlewares/auth.middleware');

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

app.use('/users',authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);

app.listen(port, function() {
  console.log('Example app listening at http://localhost' + port);
});