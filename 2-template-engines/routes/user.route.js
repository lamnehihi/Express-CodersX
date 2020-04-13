var express = require('express');
var router = express.Router();
var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');
var middleware = require('../middlewares/auth.middleware');

router.get('/cookies', function(req, res, next) {
  res.cookie('user-id', 12345);
  res.send('Done cookies!');
});

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:userId', controller.findUser);

router.post('/create', validate.postCreate, controller.newUser);

module.exports = router;