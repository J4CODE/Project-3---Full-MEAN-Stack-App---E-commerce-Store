const express = require('express');
const router  = express.Router();
const User    = require('../models/user.js');

router.post('/login', loginUser, function(req, res){
  res.json({status: 200, currentUser: req.session.currentUser});
});

router.delete('/', function(req, res){
  req.session.destroy(function() {
    res.json({status: 204, message: 'The User Logged Out'});
  });
});

module.exports = router;
