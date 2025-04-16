const Assignment2Controller = require('../controller/assignment2.controller');
const router = require('express').Router();

router.get('/studentForm', Assignment2Controller.studentForm); // Render the student form
router.post('/student-submit', Assignment2Controller.studentSubmit); // Handle form submission for student
router.get('/courseForm', Assignment2Controller.courseForm); // Render the course form
router.post('/course-submit', Assignment2Controller.courseSubmit); // Handle form submission for course
router.get('/enrollmentForm', Assignment2Controller.enrollmentForm); // Render the enrollment form
router.post('/enrollment-submit', Assignment2Controller.enrollmentSubmit); // Handle form submission for enrollment
router.get('/', Assignment2Controller.getDetails); // Get all enrollment details

module.exports = router;