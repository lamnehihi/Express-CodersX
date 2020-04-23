var Product = require('../../models/product.model');

module.exports.index = async function(req, res) {
  var products = await Product.find();
  res.json(products);
};

module.exports.create = async function(req, res) {
  var product = await Product.create(req.body);
  res.json(product);
};

module.exports.update = async function(req, res) {
  var product = await Product.findOneAndUpdate(req.body._id, req.body);
  res.json(product);
}

module.exports.replace = async function(req, res) {
  var product = await Product.findOneAndUpdate(req.body.name, req.body, {
    new: true,
    upsert: true // Make this update into an upsert
  });
  res.json(product);
}
