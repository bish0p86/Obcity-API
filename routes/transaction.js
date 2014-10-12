var express = require('express');
var paypal = require('paypal-rest-sdk');


var router = express.Router();

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
  var refresh_token,
      access_token;

  paypal.openIdConnect.tokeninfo.create(authorization_code, onCreate);

  function onCreate(err, ret) {
    console.log(ret);

    if (err) {
      res.status(500);
      res.json(err);
    } else {
      refresh_token = ret.refresh_token;
      access_token = ret.access_token;

      var data = {
        "intent": "sale",
        "payer": {
          "payment_method": "paypal"
        },
        "redirect_urls": {
          "return_url": "http://return.url",
          "cancel_url": "http://cancel.url"
        },
        "transactions": [{
          "amount": {
            "currency": "USD",
            "total": "1.00"
          },
          "description": "This is the payment description."
        }]
      };

      var config = {
        "refresh_token": refresh_token,
        "access_token": access_token,
        "authorization_code": authorization_code
      };

      console.log(config);

      paypal.payment.create(data, config, function (error, payment) {
        if (error) {
          res.status(500);
          res.json(error);
        } else {
          res.json(payment);
        }
      });
    }
  }
});

router.get('/process', function(req, res, next) {
  Challenge.findAll({ where: {processed: false} }).then(onFindAll);

  function onFindAll(challenges) {
    challenges.forEach(onEach);
  }

  function onEach(challenge) {
    var data = {
        "intent": "sale",
        "payer": {
          "payment_method": "paypal"
        },
        "transactions": [
          {
            "amount": {
              "currency": "GBP",
              "total": "10.00"
            },
            "description": "OBCity"
          }
        ]
    };

    paypal.payment.create(data, onPayPalCreate);
  }

  function onPayPalCreate(error, payment) {
    console.log(payment);

    Transaction.create({

    }).then(onTransactionCreate)
  }

  function onTransactionCreate(transaction) {
    res.json(transaction);
  }
});

module.exports = router;
