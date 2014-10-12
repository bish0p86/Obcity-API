var express = require('express');
var router = express.Router();

var Activity = require('../models').Activity;
var Challenge = require('../models').Challenge;

router.get('/', function(req, res, next){
  Activity.findAll({where: { user_id: req.user.id }}).then(onFindAll);

  function onFindAll(activities) {
    return res.json(activities);
  }
});

router.post('/', function(req, res, next) {
  Challenge.find({
    where: {id: req.body.challenge}
  }).then(onFind, onError);

  function onError(err) {
    next(err);
  }

  function onFind(challenge) {
    if (!challenge) {
      res.status(404);

      return res.json({
        errors: [
          'Challenge not found'
        ]
      });
    }

    var data = req.body;
        data.challenge_id = challenge.id;
        data.user_id = req.user.id;

    Activity.create(data).then(function(activity) {
      return res.json(activity);
    }, next);
  };
});

module.exports = router;
