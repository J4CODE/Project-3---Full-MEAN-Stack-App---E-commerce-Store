const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;



const ProductSchema = new Schema({
  name: String,
  description: String,
  img: String,
  price: Number,
  quantity: Number,
  feedback: []
})

const Product = mongoose.model("Product", ProductSchema);


module.exports  = Product;
