
var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    title: String,
    description: String,
    images: String,
    price: Number
});
var Products = mongoose.model('Products',productSchema);
module.exports = Products;