var express = require('express');
var router = express.Router();

var Charity = require('../models').Charity;

router.get('/', function(req, res, next) {
  Charity.findAll().then(function(charities) {
    res.json(charities);
  }, function(err) {
    next(err);
  })
});

module.exports = router;
