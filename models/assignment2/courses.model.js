const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String
  },
  fee: {
    type: Number,
  },
  durationInWeeks: {
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

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;