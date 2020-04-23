require('dotenv').config();

var express = require('express');
var cookieParser = require('cookie-parser');
var csurf = require('csurf');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productsRoute = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');
var transferRoute = require('./routes/transfer.route');

var apiProductRoute = require('./api/routes/product.route');

var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');

var port = 3000;


var app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRECT));
app.use(sessionMiddleware);

app.set('views', './views');
app.set('view engine', 'pug');


app.get('/',function(req, res) {
  res.render('index',{
    name : 'Thanh Lam',
    age : 18,
  });
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productsRoute);
app.use('/cart', cartRoute);
app.use('/transfer', authMiddleware.requireAuth,csurf({ cookie: true }), transferRoute);
app.use('/api', apiProductRoute);

app.listen(port, function() {
  console.log('Example app listening at http://localhost' + port);
});