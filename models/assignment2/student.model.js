const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  email: {
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

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;