var express = require('express');
var router = express.Router();

var User = require('../models').User;

router.post('/', function(req, res, next) {
  User.create(req.body).then(function(user){
    var data = user.toJSON();

    delete data.password;
    delete data.salt;

    return res.json(data);
  }, function(err) {
    if (err.errors) {
      res.status(400);
      res.json(err);
    } else {
      next(err);
    }
  })
});

module.exports = router;
