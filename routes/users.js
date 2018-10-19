const express = require('express');
const router  = express.Router();
const User    = require('../models/user.js');
const Product = require('../models/product.js');

//To create a new user
router.post('/users', function (req, res) {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password_digest: res.hashedPassword
  });

  user.save(function (err, user) {
    if (err) console.log(err);

//This logs in a newly created user
    req.session.currentUser = user;
    res.json({
      status: 201,
      message: "New user created",
      currentUser: req.session.currentUser
    })
  });
});

//This gets the user details when clicking the profile button and only works when a user is logged in
router.get('/:userId', function (req, res) {
  User.findById(req.user._id)
    .exec(function (err, user) {
      if (err) console.log(err);

      res.json({
        user
      })
    });
});

//This updates any new details about the user, like a telephone number, credit card or an address change
router.patch('/:userId', function (req, res) {
  User.findByIdAndUpdate(req.sessions.currentUser._id)
    .exec(function (err, user) {
      if (err) console.log(err)

      user.username = req.body.username;

      user.save();
      res.json({
        user
      })
    })
})

module.exports = router;
