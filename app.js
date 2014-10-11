var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  = require('multer');

var passport = require('passport'),
    LocalStrategy = require('passport-local');

var cors = require('cors');


var activity    = require('./routes/activity'),
    challenge   = require('./routes/challenge'),
    charity     = require('./routes/charity'),
    session     = require('./routes/session'),
    transaction = require('./routes/transaction'),
    user        = require('./routes/user');

var models = require('./models'),
    User   = models.User;

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(multer());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: '*'
}));


passport.serializeUser(function(user, done) {
  user = user.toJSON();

  delete user.password;

  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, JSON.parse(user));
});

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, username, password, done) {
    User.findOne({ username: username }).then(function (user) {
      if (!user) {
        return done(null, false);
      }

      if (!user.verifyPassword(password)) {
        return done(null, false);
      }

      done(null, user);
    }, function(err) {
      if (err) {
        return done(err);
      }
    });
  }
));

// passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/activity', activity);
app.use('/challenge', challenge);
app.use('/charity', charity);
app.use('/session', session);
app.use('/transaction', transaction);
app.use('/user', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
        err.status = 404;

    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



app.listen(8888);
