const express = require("express");
const router = express.Router();
const Product = require("../models/products");

router.get("/:productIds", async (req, res) => {
  const productIds = req.params.productIds.split(","); // Convert string of IDs into array
  try {
    const products = await Product.find({ _id: { $in: productIds } });
    console.log(products)
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
