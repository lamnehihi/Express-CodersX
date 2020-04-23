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

module.exports.delete = async function(req, res) {
  Product.findByIdAndRemove(req.body._id, (err, todo) => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
        message: "Todo successfully deleted",
        id: todo._id
    };
    return res.status(200).send(response);
});
}
