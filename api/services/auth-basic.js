var passport = require('passport'),
  BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy(function(username, password, next) {
  User.findOne({
    username: username
  }).exec(function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false);
    }
    user.validPassword(password, function(err, res) {
      if (err) {
        return next(err);
      }
      next(null, res ? user : false);
    });
  });
}));
