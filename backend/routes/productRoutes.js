const express = require('express');
const router = express.Router();
const Product = require('../models/productModel.js');

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add product (optional)
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json({ message: "Product added", newProduct });
});

module.exports = router;