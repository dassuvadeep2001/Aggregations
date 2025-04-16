const courseModel = require('../models/assignment2/courses.model');
const studentModel = require('../models/assignment2/student.model');
const enrollmentModel = require('../models/assignment2/enrollments.model');

class Assignment2Controller {
    async studentForm(req, res) {
        res.render('assignment2/studentForm');
    }

    async courseForm(req, res) {
        res.render('assignment2/courseForm');   
    }

    async enrollmentForm(req, res) {
        const students = await studentModel.find({ isDeleted: false });
        const courses = await courseModel.find({ isDeleted: false });
        res.render('assignment2/enrollmentForm', { students, courses });
    }

    async studentSubmit(req, res) {
        try {
            const { name, age, email } = req.body;
            const student = await studentModel.create({ name, age, email });
            if (student) {
                req.flash("success", "Student added successfully");
                res.redirect('/');
            }
            else {
                req.flash("error", "Failed to create student");
                res.redirect('/studentForm');
            }
        } catch (error) {
            throw error
        }
    }

    async courseSubmit(req, res) {
        try {
            const { title, fee, durationInWeeks } = req.body;
            const course = await courseModel.create({ title, fee, durationInWeeks });
            if (course) {
                req.flash("success", "Course added successfully");
                res.redirect('/');
            }
            else {
                req.flash("error", "Failed to create course");
                res.redirect('/courseForm');
            }
        } catch (error) {
            throw error
        }
    }

    async enrollmentSubmit(req, res) {
        try {
            const { studentId, courseId, enrollmentDate } = req.body;
            const enrollment = await enrollmentModel.create({ studentId, courseId, enrollmentDate });
            if (enrollment) {
                req.flash("success", "Enrollment added successfully");
                res.redirect('/');
            }
            else {
                req.flash("error", "Failed to create enrollment");
                res.redirect('/enrollmentForm');
            }
        } catch (error) {
            throw error
        }
    }
    async getDetails(req, res) {
        try {
            const details = await enrollmentModel.aggregate([
                {
                    $match: { isDeleted: false }
                },
                {
                    $lookup: {
                        from: 'students',
                        localField: 'studentId',
                        foreignField: '_id',
                        as: 'studentDetails'
                    }
                },
                {
                    $unwind: '$studentDetails'
                },
                {
                    $lookup: {
                        from: 'courses',
                        localField: 'courseId',
                        foreignField: '_id',
                        as: 'courseDetails'
                    }
                },
                {
                    $unwind: '$courseDetails'
                },
                {
                    $group: {
                        _id: '$studentId', // Group by studentId
                        studentName: { $first: '$studentDetails.name' }, // Get student name
                        enrollments: {
                            $push: {
                                courseTitle: '$courseDetails.title',
                                courseFee: '$courseDetails.fee',
                                enrollmentDate: '$enrollmentDate'
                            }
                        },
                        totalPrice: { $sum: '$courseDetails.fee' } // Calculate total price for all courses
                    }
                },
                {
                    $project: {
                        studentName: 1,
                        enrollments: 1,
                        totalPrice: 1 // Include total price in the projection
                    }
                },
                {
                    $match: { totalPrice: { $gte: 10000 } } // Filter students with totalPrice >= 10000
                },
                {
                    $sort: { totalPrice: -1 } // Sort by total price in descending order
                }
            ]);
    
            res.render('assignment2/details', { details });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new Assignment2Controller();