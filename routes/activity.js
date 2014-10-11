var express = require('express');
var router = express.Router();

var Activity = require('../models').Activity;

router.post('/', function(req, res, next) {
  var data = req.body;
      data.user_id = req.user.id;

  Activity.create(data).then(function(activity) {
    return res.json(activity);
  }, next);
});

module.exports = router;
