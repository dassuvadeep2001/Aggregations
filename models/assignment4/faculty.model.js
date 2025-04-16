const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
  },
  facultyName: {
    type: String,
  },
  facultyPhone: {
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

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;