const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
  title: {
    type: String,
  },
  price:{
    type: Number,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},{
  timestamps: true,
  versionKey: false,
});

const Books = mongoose.model('Books', bookSchema);

module.exports = Books;