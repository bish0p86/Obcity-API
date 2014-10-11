var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  return res.json(req.user);
});

router.post('/', function(req, res) {
  req.login(user, function(err) {
    if (err) {
      return res.json(err);
    }

    return res.json(req.user);
  });
});

router.delete('/', function(req, res) {
  req.logout();
});

module.exports = router;
