var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res) {
  return res.json(req.user);
});

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if (err) {
      return next(err);
    }

    if (!user) {
      res.status(401);

      return res.json({
        error: 'Incorrect credentials'
      });
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }

      return res.json(user);
    });
  })(req, res, next);
});

router.delete('/', function(req, res) {
  req.logout();
  res.json({});
});

module.exports = router;
