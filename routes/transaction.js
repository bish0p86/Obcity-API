var express = require('express');
var paypal = require('paypal-rest-sdk');


var router = express.Router();

var User = require('../models').User;
var Challenge = require('../models').Challenge;
var Transaction = require('../models').Transaction;

router.get('/', function(req, res, next) {
  Transaction.findAll({ where: { user_id: req.user.id } }).then(onFindAll);

  function onFindAll(transactions) {
    res.json(transactions);
  }
});

router.get('/authorize', function(req, res, next) {
  return res.json({
    url: paypal.openIdConnect.authorizeUrl()
  });
});

router.get('/authorized', function(req, res, next) {
  var authorization_code = req.param('code');

  paypal.openIdConnect.tokeninfo.create(authorization_code, onCreate);

  function onError(err) {
    res.status(500);
    res.json(err);
  }

  function onCreate(err, ret) {
    if (err) {
      onError(err);
    } else {
      User.update(
        {
          accessToken: ret.access_token,
          refreshToken: ret.refresh_token
        },
        {
          where: { id: req.user.id }
        }
      ).then(onUpdate, onError);
    }
  }

  function onUpdate() {
    res.json({});
  }
});

router.get('/process', function(req, res, next) {
  var user;

  User.find(req.user.id).then(onFind).then(onFind, onError);

  function onError(err) {
    if (err) {
      res.status(500);
      res.json(err);
    }
  }

  function onFind(data) {
    user = data;

    Challenge.findAll(
      { where: {processed: false} }
    ).then(onFindAll, onError);
  }

  function onFindAll(challenges) {
    challenges.forEach(onEach);
  }

  function onEach(challenge) {
    console.log(challenge.Activities);
    var data = {
        "intent": "sale",
        "payer": {
          "payment_method": "paypal"
        },
        "transactions": [
          {
            "amount": {
              "currency": "GBP",
              "total": challenge.calculatePenality(challenge)
            },
            "description": "OBCity"
          }
        ]
    };

// console.log(user.refreshToken);
    // var config = {
    //   refresh_token: user.refreshToken
    // };
// console.log(config);
    // paypal.payment.create(data, config, onPayPalCreate);
  }

  function onPayPalCreate(error, payment) {
    console.log(payment);

    Transaction.create({
      processed: true
    }).then(onTransactionCreate)
  }

  function onTransactionCreate(transaction) {
    res.json(transaction);
  }
});

module.exports = router;
