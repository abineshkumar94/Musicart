const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/products");

router.get("/products", async (req, res) => {
  try {
    const { headphoneType, brand, colour, minPrice, maxPrice, sort } = req.query;
    console.log(`Received request with headphoneType: ${headphoneType}, brand: ${brand}, colour: ${colour}, minPrice: ${minPrice}, maxPrice: ${maxPrice}, sort: ${sort}`);

    let query = {};
    if (headphoneType) {
      query.headphoneType = headphoneType;
    }
    if (brand) {
      query.brand = brand;
    }
    if (colour) {
      query.colour = colour;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    let sortOption = {};
    if (sort) {
      switch (sort) {
        case 'priceLowToHigh':
          sortOption.price = 1;
          break;
        case 'priceHighToLow':
          sortOption.price = -1;
          break;
        case 'nameAToZ':
          sortOption.heading = 1;
          break;
        case 'nameZToA':
          sortOption.heading = -1;
          break;
        default:
          break;
      }
      console.log(sortOption);
    }

    const products = await Product.find(query).sort(sortOption).limit(24);

    console.log(`Sending ${products.length} products`);
    res.send(products);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;
