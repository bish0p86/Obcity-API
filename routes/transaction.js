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

router.get('/authorize', function() {
  var authorization_code = req.param.authorization_code;

  paypal.generateToken({ 'authorization_code': authorization_code }, onGenerateToken);

  function onGenerateToken(err, generateToken) {

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
              "total": challenge.calculateTotal()
            },
            "description": "OBCity challenge " + challenge.id
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
