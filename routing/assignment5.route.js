const router= require('express').Router();
const CategoryController = require('../controller/assignment5.controller');

router.post('/category', CategoryController.createCategory);
router.get('/details', CategoryController.getCategory);

module.exports = router;