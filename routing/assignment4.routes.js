const assignmnet4Controller = require('../controller/assignment4.controller');
const router = require('express').Router();

router.post('/addSchool', assignmnet4Controller.addSchool);
router.post('/addFaculty', assignmnet4Controller.addFaculty);   
router.post('/addStudent', assignmnet4Controller.addStudent);
router.get('/getDetails', assignmnet4Controller.getDetails);

module.exports = router;