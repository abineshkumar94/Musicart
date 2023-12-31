const express = require("express")
require('dotenv').config();
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(cors());

app.options("*", cors());

app.use(
    cors({
      origin: "*",
      methods: ["post", "get", "put", "delete"],
      "Access-Control-Allow-Credentials": true,
    })
  );


// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//import all routes here
const user = require("./routes/user");
const products = require("./routes/product");
const productdetails = require("./routes/productDetail");
const cart = require("./routes/cart")
const buyNow = require("./routes/productDetail");

// app.use("/api/v1", home);
app.use("/api/v1", user);
app.use("/api/v1",products);
app.use("/api/v1",productdetails);
app.use("/api/v1/cart",cart);
app.use("/api/v1/buyNow", buyNow);

module.exports = app;