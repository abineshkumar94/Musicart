const express = require("express")
require('dotenv').config();
const app = express();
const cookieParser = require("cookie-parser");


// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//import all routes here
const user = require("./routes/user");


//router middleware//
// app.use("/api/v1", home);
app.use("/api/v1", user);


module.exports = app;