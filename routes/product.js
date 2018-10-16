const express = require('express');
const productRouter = express.Router();
const Product = require('../models/product.js')


//----------------------------------------------------------------------------------
//This GETS ALL THE PRODUCTS, that have been SAVED TO THE DATABASE in MongoDB Compass

productRouter.get('/product', function (req, res) {
  Product.find()
    .then(ellproducts => {
      res.json(ellproducts)
    }).catch(err => {
      res.json(err)
    })
  // .exec(function(err, products){
  //   console.log(products)
  //   if(err) console.log(err);
  //   console.log('this is the error',err)
  //   console.log('Products Samples From the Seeds Database', products)
  //   res.json({products})
  // })
})

//-----------------------------------------------------------------------------
//This gets a product detail

productRouter.get('/product/:id', (req, res, next) => {
  Product.findById(req.params.id, (err, response) => {
    if (err) {
      return res.json(err).status(500);
    }
    if (respose) {
      return res.json(err).status(404), console.log(err)
    }

    return res.json(response);
  })
})


//-----------------------------------------------------------------------------
//This TAKES THE DATA FROM the FRONT END FORM and CREATES a new product.

productRouter.post('/create/product', function (req, res) {
  const newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    img: req.body.img,
    price: req.body.price,
    quantity: req.body.quantity,
    feedback: req.body.feedback
  })

  newProduct.save(function (err, newProduct) {
      console.log(newProduct);
      if (err) console.log(err);

      console.log('Yay! A New product has been created in product post route: ', newProduct);
      // res.json({newProduct});
    })
    .then(response => {
      console.log("product created successfully ------------ ", response);
      res.status(200).json(response)
    })
    .catch(err => {
      console.log("error creating product ==================== ", err);
      res.status(400).json({
        message: "Error creating product"
      })
    })
})

//-------------------------------------------------------------------------------------------------
//This EDITS a specific product

productRouter.post('/product/:id/update', (req, res, next) => {
  const theId = req.params.id;
  Product.findByIdAndUpdate(theId, {
      description: req.body.description,
      name: req.body.name,
      img: req.body.img,
      price: req.body.price,
      quantity: req.body.quantity,
      feedback: req.body.feedback
    })

    .then((response) => {
      console.log('this is the response', response);
      res.json(response)
    })
    .catch((err) => {
      console.log('this is the erros', err);
      res.json(err);
    })
})

//-----------------------------------------------------

//This DELETES a speciic product.
productRouter.post('/product/:id/delete', (req, res, next) => {
  Product.findByIdAndRemove(req.params.id)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    })
})


module.exports = productRouter;
