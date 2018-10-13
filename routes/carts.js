const express = require('express');
const router  = express.Router();
const User    = require('../models/user.js');
const Cart    = require('../models/cart.js')
const Product = require('../models/product.js')


//To add products to the users shopping cart-----------------

router.post('/addToCart/:product_id', function (req, res) {

  Product.findById(req.params.productId)
    .exec(function (err, product) {
      if (err) console.log(err);


      const previousQuantity = 0

      User.findById(req.session.currentUser._id)

        .exec(function (err, user) {
          user.cart.forEach(function (item) {
            if (item.product.id == req.params.productId) {
              matchedProduct = item;
              previousQuantity = item.quantity
              matchedProduct.remove();
            }
            user.save();
          })

          User.update({
              _id: req.session.currentUser._id
            }, {
              $push: {
                cart: {
                  product: product,
                  quantity: parseInt(previousQuantity) + parseInt(req.body.quantity)
                }

              }
            })

            .exec(function (err, success) {
              if (err) console.log(err);
              res.json({
                cart: user.cart
              })
            });
        })
    });
});

//To update the cart quantities----------------------------------
router.patch('/:productId', function (req, res) {
  User.findByIdAndUpdate(req.session.currentUser._id)
    .exec(function (err, user) {
      if (err) console.log(err);
      const product = user.cart.id(req.params.productId)
      product.quantity = req.body.quantityToBuy
      user.save();
      res.json({
        cart: user.cart
      })
    })
})


//Getting the contents added to the cart for the current user--------------------
router.get('/', function (req, res) {
  User.findById(req.session.currentUser._id)
    .exec(function (err, user) {
      if (err) console.log(err);

      res.json({
        cart: user.cart
      })
    })
})

//This removes any deleted item from the current user's cart--------------------
router.delete('/:productId/delete', function (req, res) {
  User.findById(req.session.currentUser._id)
    .exec(function (err, user) {
      if (err) console.log(err);
      const product = user.cart.id(req.params.productId)
      product.remove();
      user.save();
      res.json({
        cart: user.cart
      })
    })
})

//This clears the users cart---------------------------
router.delete('/', function (req, res) {
  User.findById(req.session.currentUser._id)
    .exec(function (err, user) {
      if (err) console.log(err)

      for (const i = 0; i < user.cart.length; i++) {
        user.cart[i].remove();
        i--;
      }
      user.save();
      res.json({
        cart: user.cart
      })
    })
})


module.exports = router;