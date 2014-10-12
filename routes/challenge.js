var express = require('express');
var router = express.Router();

var Challenge = require('../models').Challenge;
var Charity   = require('../models').Charity;

router.post('/', function(req, res, next) {
  Charity.find({
    where: {name: req.charity}
  }).then(onFind, onError);

  function onError(err) {
    next(err);
  }

  function onFind(charity) {
    var data = req.body;
        data.User = req.user;

    data.charity_id = charity.id;

    Challenge.create(data).then(onCreate, onError);
  }

  function onCreate(challenge) {
    res.json(challenge);
  }
});

module.exports = router;
