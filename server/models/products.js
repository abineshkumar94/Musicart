const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
 detailHeading: String,
 heading: String,
 price: Number,
 brand: String,
 colour: String,
 image: Array,
 aboutThisItem: Array
 
});

module.exports = mongoose.model('Product', ProductSchema);
