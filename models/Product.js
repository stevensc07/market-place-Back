// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  // Otros campos según tus necesidades
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
