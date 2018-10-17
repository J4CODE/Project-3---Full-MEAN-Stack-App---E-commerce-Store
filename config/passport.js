const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/user');
const bcrypt        = require('bcryptjs');

module.exports      = function (passport) {

  passport.use(new LocalStrategy((email, password, next) => {
    User.findOne({
      email
    }, (err, foundUser) => {
      if (err) {
        return next(err);
      }

      if (!foundUser) {
        return next(null, false, {
          message: 'Incorrect email'
        });
      }

      if (!bcrypt.compareSync(password, foundUser.password)) {
        return next(null, false, {
          message: 'Incorrect password'
        });
      }

      return next(null, foundUser);
    });
  }));

  passport.serializeUser((loggedInUser, cb) => {
    cb(null, loggedInUser._id);
  });

  passport.deserializeUser((userIdFromSession, cb) => {
    User.findById(userIdFromSession, (err, userDocument) => {
      if (err) {
        return cb(err);
      }

      cb(null, userDocument);
    });
  });

}