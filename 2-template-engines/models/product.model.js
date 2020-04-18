var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name : String,
  description : String,
  image : String,
  producer : String
});

var Product = mongoose.model('Product', userSchema, 'products');

module.exports = Product;