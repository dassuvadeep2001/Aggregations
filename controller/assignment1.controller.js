const OrderModel = require('../models/assignment1/order.model');
const ProductModel = require('../models/assignment1/product.model');

class Assignment1Controller {
         async productForm(req, res) {
            try {
                res.render('assignment1/product');
            } catch (error) {
                throw error
            }
        }
        async orderForm(req, res) {
            try {
                const products = await ProductModel.find({ isDeleted: false });
                res.render('assignment1/order', { products });
            } catch (error) {
                throw error
            }
        }
        async productSubmit(req, res) {
            try {
                const { name, price, category } = req.body;
                const product = await ProductModel.create({ name, price, category });
                if (product) {
                    req.flash("success", "Product added created successfully");
                    res.redirect('/');
                }
                else {
                    req.flash("error", "Failed to create product");
                    res.redirect('/product');
                }
            } catch (error) {
                throw error
            }
        }
        async orderSubmit(req, res) {
            try {
                const { customerName, productId, orderedAt, quantity } = req.body;
                const order = await OrderModel.create({ customerName, productId, orderedAt, quantity });
                if (order) {
                    req.flash("success", "Order added successfully");
                    res.redirect('/');
                }
                else {
                    req.flash("error", "Failed to create order");
                    res.redirect('/order');
                }
            } catch (error) {
                throw error
            }
        }
        async getDetails(req, res) {
            try {
                const details = await OrderModel.aggregate([
                    {
                        $lookup: {
                            from: 'products',
                            localField: 'productId',
                            foreignField: '_id',
                            as: 'productDetails'
                        }
                    },
                    {
                        $unwind: '$productDetails'
                    },
                    {
                        $project: {
                            quantity: 1,
                            orderedAt: 1,
                            customerName: 1,
                            "productName": '$productDetails.name',
                            "productPrice": '$productDetails.price',
                            "productCategory": '$productDetails.category',
                            "totalPrice": { $multiply: ['$quantity', '$productDetails.price'] }
                        }
                    },
                    {
                        $match:  { totalPrice: { $gt: 100000 } }
                    },
                    {
                        $sort: { orderedAt: -1 }
                    }
                ]);
                console.log("Details",details);
                res.render('assignment1/list', { details }); 
            } catch (error) {
                throw error
            }
        }

}
module.exports = new Assignment1Controller();