var express = require('express');
var router = express.Router();
var controller = require('../controllers/product.controller');

router.get('/products', controller.index);

router.post('/products', controller.create);

router.patch('/products', controller.update);

router.put('/products', controller.replace);

router.delete('/products', controller.delete);


module.exports = router;