const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Books',
  },
  quantity: {
    type: Number,
  },
  soldAt:{
    type: Date,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},{
  timestamps: true,
  versionKey: false,
});

const Sales = mongoose.model('Sales', salesSchema);

module.exports = Sales;