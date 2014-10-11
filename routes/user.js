var express = require('express');
var router = express.Router();

var User = require('../models').User;

router.post('/', function(req, res, next) {
  console.log(req.body);
  User.create(req.body).then(function(user){
    return res.json(user);
  }, next)
});

module.exports = router;
