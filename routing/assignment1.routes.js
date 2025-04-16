const router = require('express').Router();
const assignment1Controller = require('../controller/assignment1.controller'); 

router.get('/product', assignment1Controller.productForm); // Render the product form
router.post('/submit-product', assignment1Controller.productSubmit); // Handle form submission
router.get('/order', assignment1Controller.orderForm); // Render the order form
router.post('/order-submit', assignment1Controller.orderSubmit); // Handle order submission
router.get('/', assignment1Controller.getDetails); // Get all products



module.exports = router;