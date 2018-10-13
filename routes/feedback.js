const express = require('express');
const router  = express.Router();
const User    = require('../models/user.js');
const Product = require('../models/product.js')

router.get('/feedback', function(req, res){
  console.log(' Users feedback') //Just checking to see if this works.
})


module.exports = router;
