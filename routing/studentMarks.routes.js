const router = require('express').Router(); 
const studentMarksController = require('../controller/studentMarks.controller');

router.post('/addStudentMarks', studentMarksController.addStudentMarks);
router.get('/getStudentMarksStatus', studentMarksController.getStudentMarksStatus);

module.exports = router;