
var User = require('../models/user.model');
var shortid = require('shortid');

module.exports.index = async function(req, res) {
  var users = await User.find();
  res.render('users/index', {
    users : users
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
  req.body.id = shortid.generate();
  req.body.avatar = req.file.path.split('/').slice(1).join('/');

  db.get('users').push(req.body).write();
  res.redirect('/users');
}
