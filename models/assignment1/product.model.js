const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  category:{
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},{
  timestamps: true,
  versionKey: false,
});

const Product = mongoose.model('Product', productsSchema);

module.exports = Product;