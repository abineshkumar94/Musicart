const express = require('express');
const router = express.Router();
const Product = require('../models/products'); 

router.get('/productdetails/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.send(product);
  } catch (error) {
    console.error("Error fetching product details:", error.message);
    console.error("Mongoose error details:", error); // Log the complete error object
    res.status(500).send('Internal Server Error');
  }
});

router.get('/buyNow/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.send(product);
  } catch (error) {
    console.error("Error fetching product details:", error.message);
    console.error("Mongoose error details:", error); // Log the complete error object
    res.status(500).send('Internal Server Error');
  }
});
  
  
  
  module.exports = router;