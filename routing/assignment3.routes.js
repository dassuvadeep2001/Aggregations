const Assignment3Controller = require('../controller/assignment3.controller');
const router = require('express').Router();

router.get('/authorForm', Assignment3Controller.authorForm);
router.get('/bookForm', Assignment3Controller.bookForm);
router.get('/salesForm', Assignment3Controller.salesForm);
router.post('/authorSubmit', Assignment3Controller.authorSubmit);
router.post('/bookSubmit', Assignment3Controller.bookSubmit);
router.post('/salesSubmit', Assignment3Controller.salesSubmit);
router.get('/', Assignment3Controller.getDetails);

module.exports = router;