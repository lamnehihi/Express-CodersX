
var db = require('../db');
var shortid = require('shortid');

module.exports.index = function(req, res) {
  res.render('users/index', {
    users : db.get('users').value()
  });
}

module.exports.search = function(req, res) {
  var q = req.query.q;
  var searchUser = db.get('users').value().filter(function(user) {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render('users/index', {
    users : searchUser,
    q
  });
}

module.exports.create = function(req, res) {
  res.render('users/create', {
  });
}

module.exports.findUser = function (req, res) {
  var id = req.params.userId;
  var user = db.get('users').find({ id: id}).value();
  res.render('users/view', {
    user : user
  });
}

module.exports.newUser = function (req, res) {
  var errors = [];
  var data = req.body;
  var size = Object.keys(data).length;

  if(!req.body.name) {
    errors.push('Name is required!');
  }
  if(!req.body.phone) {
    errors.push('Phone is required!');
  }
  if(errors.length) {
    res.render('users/create', {
      errors,
      data
    });
  }
  else {
  req.body.id = shortid.generate();
  db.get('users').push(req.body).write();
  res.redirect('/users');
  }
}
