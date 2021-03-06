
var express = require("express"),
  app = express(),
  passport = require("passport");
app.use(passport.initialize());
module.exports = function(req, res, ok) {
  passport.authenticate("basic", {
    session: false
  }, function(err, user, info) {
    if (err || !user) {
      return res.send("You are not permitted to perform this action", 401);
    }
    req.session.user = user;
    return ok(null, user);
  })(req, res, ok);
};
