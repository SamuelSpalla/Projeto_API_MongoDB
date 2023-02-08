const mongoose = require('mongoose')

const Product = mongoose.model('Product', {
    name: String,
    price: Number,
    code: Number,
    quantity: Number,
    minimum_stock: Number,
    quality: String,

})

module.exports = Product