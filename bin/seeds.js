const mongoose = require('mongoose');
const Product = require('../models/product.js');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/project-3';
mongoose.connect(mongoURI)

const products = [{
    name: 'Sample Product 1',
    img: 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjk4L-Ews7cAhXqtlkKHZjZB0IQjRx6BAgBEAU&url=https%3A%2F%2Ftoddiesbarbers.com.au%2Fshop%2Fnew-sample-product%2F&psig=AOvVaw0jgpCd0nNSx6upk705jzrR&ust=1533304369812909',
    price: 10,
    quantity: 100
  },
  {
    name: 'Sample Product 2',
    img: 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjk4L-Ews7cAhXqtlkKHZjZB0IQjRx6BAgBEAU&url=https%3A%2F%2Ftoddiesbarbers.com.au%2Fshop%2Fnew-sample-product%2F&psig=AOvVaw0jgpCd0nNSx6upk705jzrR&ust=1533304369812909',
    price: 20,
    quantity: 200
  },
  {
    name: 'Sample Product 3',
    img: 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjk4L-Ews7cAhXqtlkKHZjZB0IQjRx6BAgBEAU&url=https%3A%2F%2Ftoddiesbarbers.com.au%2Fshop%2Fnew-sample-product%2F&psig=AOvVaw0jgpCd0nNSx6upk705jzrR&ust=1533304369812909',
    price: 30,
    quantity: 150
  },
  {
    name: 'Sample Product 3',
    img: 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjk4L-Ews7cAhXqtlkKHZjZB0IQjRx6BAgBEAU&url=https%3A%2F%2Ftoddiesbarbers.com.au%2Fshop%2Fnew-sample-product%2F&psig=AOvVaw0jgpCd0nNSx6upk705jzrR&ust=1533304369812909',
    price: 40,
    quantity: 225
  },
  {
    name: 'Sample Product 4',
    img: 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjk4L-Ews7cAhXqtlkKHZjZB0IQjRx6BAgBEAU&url=https%3A%2F%2Ftoddiesbarbers.com.au%2Fshop%2Fnew-sample-product%2F&psig=AOvVaw0jgpCd0nNSx6upk705jzrR&ust=1533304369812909',
    price: 25,
    quantity: 250
  },
  {
    name: 'Sample Product 5',
    img: 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjk4L-Ews7cAhXqtlkKHZjZB0IQjRx6BAgBEAU&url=https%3A%2F%2Ftoddiesbarbers.com.au%2Fshop%2Fnew-sample-product%2F&psig=AOvVaw0jgpCd0nNSx6upk705jzrR&ust=1533304369812909',
    price: 50,
    quantity: 275
  },
  {
    name: 'Sample Product 6',
    img: 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjk4L-Ews7cAhXqtlkKHZjZB0IQjRx6BAgBEAU&url=https%3A%2F%2Ftoddiesbarbers.com.au%2Fshop%2Fnew-sample-product%2F&psig=AOvVaw0jgpCd0nNSx6upk705jzrR&ust=1533304369812909',
    price: 60,
    quantity: 280
  },
  {
    name: 'Sample Product 7',
    img: 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjk4L-Ews7cAhXqtlkKHZjZB0IQjRx6BAgBEAU&url=https%3A%2F%2Ftoddiesbarbers.com.au%2Fshop%2Fnew-sample-product%2F&psig=AOvVaw0jgpCd0nNSx6upk705jzrR&ust=1533304369812909',
    price: 75,
    quantity: 220
  },
  {
    name: 'Sample Product 8',
    img: 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjk4L-Ews7cAhXqtlkKHZjZB0IQjRx6BAgBEAU&url=https%3A%2F%2Ftoddiesbarbers.com.au%2Fshop%2Fnew-sample-product%2F&psig=AOvVaw0jgpCd0nNSx6upk705jzrR&ust=1533304369812909',
    price: 65,
    quantity: 110
  },
  {
    name: 'Sample Product 9',
    img: 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjk4L-Ews7cAhXqtlkKHZjZB0IQjRx6BAgBEAU&url=https%3A%2F%2Ftoddiesbarbers.com.au%2Fshop%2Fnew-sample-product%2F&psig=AOvVaw0jgpCd0nNSx6upk705jzrR&ust=1533304369812909',
    price: 35,
    quantity: 105
  },
  {
    name: 'Sample Product 10',
    img: 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjk4L-Ews7cAhXqtlkKHZjZB0IQjRx6BAgBEAU&url=https%3A%2F%2Ftoddiesbarbers.com.au%2Fshop%2Fnew-sample-product%2F&psig=AOvVaw0jgpCd0nNSx6upk705jzrR&ust=1533304369812909',
    price: 45,
    quantity: 300
  }

];

Product.remove({})
  .then(function () {
    return Product.create(products);
  })
  .then(function (products) {
    console.log(products);
  })
  .then(function () {
    mongoose.connection.close(function () {
      console.log('New products seeded!');
    });
  });