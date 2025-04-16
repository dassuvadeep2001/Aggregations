const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  schoolName: {
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

const School = mongoose.model('School', schoolSchema);

module.exports = School;