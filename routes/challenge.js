var express = require('express');
var router = express.Router();

var Challenge = require('../models').Challenge;
var Charity   = require('../models').Charity;

router.get('/', function(req, res, next){
  Challenge.findAll({where: { user_id: req.user.id }}).then(onFindAll);

  function onFindAll(challenges) {
    return res.json(challenges);
  }
});

router.post('/', function(req, res, next) {
  Charity.find({
    where: {name: req.body.charity}
  }).then(onFind, onError);

  function onError(err) {
    next(err);
  }

  function onFind(charity) {
    if (!charity) {
      res.status(404);

      return res.json({
        errors: [
          'Charity not found'
        ]
      });
    }

    var data = req.body;
        data.user_id = req.user.id;

    data.charity_id = charity.id;

    Challenge.create(data).then(onCreate, onError);
  }

  function onCreate(challenge) {
    res.json(challenge);
  }
});

module.exports = router;
