const mongoose = require('mongoose');

const enrollmentsSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
    enrollmentDate: {
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

const Enrollments = mongoose.model('Enrollments', enrollmentsSchema);

module.exports = Enrollments;