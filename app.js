var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var multer  = require('multer');

var passport = require('passport'),
    LocalStrategy = require('passport-local');

var paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'sandbox',
  client_id: 'AYJ_TxD7MIHO7BuPioRfd-pQitsGS_9-kL_kQvB8N0x61sN6S0uBymaCu9rg',
  client_secret: 'EK_6pBD9MHA6vMoe2OwcQ6aR7cnbe_gvhXuHXjAA7bV0JRbe7im9Iy-XcgO8',
  openid_redirect_uri: 'http://obcity.herokuapp.com/transaction/authorized',
});

var cors = require('cors');


var index       = require('./routes/index'),
    activity    = require('./routes/activity'),
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
app.use(cookieSession({
  keys: ['6346dfc23b5018f5421d27116d657534']
}));
app.use(cors({
  origin: 'http://localhost:8100',
  credentials: true
}));


passport.serializeUser(function(user, done) {
  user = user.toJSON();

  delete user.password;
  delete user.salt;

  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, username, password, done) {
    User.find({ where: {username: username} }).then(function (user) {
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

app.use('/', index);
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

var port = 8888;

//console.log('Server listening on port ' + port);

//app.set(process.env.PORT || port);

app.set('port', (process.env.PORT || 5000))


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
