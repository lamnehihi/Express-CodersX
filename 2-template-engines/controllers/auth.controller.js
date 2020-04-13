var db = require('../db');

module.exports.login = function(req, res) {
  res.render('auth/login', {
  });
}

module.exports.postLogin = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var data = req.body;
  console.log(data);
  
  var user = db.get('users').find({ email : email}).value();
  console.log(user);
  if (!user) {
    res.render('auth/login', {
      errors: [
        'Wrong email !',
      ],
      data
    });
    return;   
  }

  if (user.password !== password) {
    res.render('auth/login', {
      errors: [
        'Wrong password !',
      ],
      data
    });
    return;  
  }
  res.cookie('userId', user.id);
  res.redirect('/users');

}