module.exports.postCreate = function(req, res, next) {
  var errors = [];
  var data = req.body;
    
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

    next();
}