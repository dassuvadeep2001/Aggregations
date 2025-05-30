const mongoose = require('mongoose');

const studentMarksSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  bengaliMarks: {
    type: Number,
  },
  englishMarks: {
    type: Number,
 },
  mathMarks: {    
    type: Number,
 },
 scienceMarks: {
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

const StudentMarks = mongoose.model('StudentMarks', studentMarksSchema); 

module.exports = StudentMarks;