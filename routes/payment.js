var express = require('express');
var paypal = require('paypal');
var router = express.Router();

router.get('/', function(req, res, next) {

});

router.get('/process', function(req, res, next) {
  var data = {
      "intent": "sale",
      "payer": {
        "payment_method": "paypal"
      },
      "transactions": [
        {
          "amount": {
            "currency": "GBP",
            "total": "1.00"
          },
          "description": "OBCity"
        }
      ]
  };

  paypal.payment.create(data, function (error, payment) {
    done();
  });
});

module.exports = router;
