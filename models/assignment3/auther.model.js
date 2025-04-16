const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  country:{
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

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;