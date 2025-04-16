const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
  },
  studentName: {
    type: String,
  },
  studentPhone: {
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

const SchoolStudent = mongoose.model('SchoolStudent', StudentSchema);

module.exports = SchoolStudent;