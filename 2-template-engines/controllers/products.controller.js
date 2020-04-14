var db = require('../db');

var page = 1;
var perPage = 6;
var start = (page - 1) * perPage;
var end = start + perPage

module.exports.index = function(req, res) {
  var page = parseInt(req.query.page) || 1;
  
  res.render('products/index', {
    products : db.get('products').value().slice(start, end),
    page
  });
}

module.exports.search = function(req, res) {
  var page = parseInt(req.query.page) || 1;

  var q = req.query.q;
  var findedProducts = db.get('products').value().filter(function(item) {
    return item.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render('products/index', {
    products : findedProducts,
    page
  });
}