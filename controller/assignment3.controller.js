const authorModel = require('../models/assignment3/auther.model');
const bookModel = require('../models/assignment3/book.model');
const salesModel = require('../models/assignment3/sales.model');

class Assignment3Controller {
    async authorForm(req, res) {
        res.render('assignment3/authorForm');
    }

    async bookForm(req, res) {
        const authors = await authorModel.find({ isDeleted: false });
        res.render('assignment3/booksForm', { authors });
    }

    async salesForm(req, res) {
        const books = await bookModel.find({ isDeleted: false });
        res.render('assignment3/salesForm', { books });
    }
    async authorSubmit(req, res) {
        try {
            const { name, country } = req.body;
            const author = await authorModel.create({ name, country });
            if (author) {
                req.flash("success", "Author added successfully");
                res.redirect('/');
            }
            else {
                req.flash("error", "Failed to add Author");
                res.redirect('/authorForm');
            }
        } catch (error) {
            throw error
        }
    }

    async bookSubmit(req, res) {
        try {
            const { title, authorId, price } = req.body;
            const book = await bookModel.create({ title, authorId, price });
            if (book) {
                req.flash("success", "Book added successfully");
                res.redirect('/');
            }
            else {
                req.flash("error", "Failed to add Book");
                res.redirect('/bookForm');
            }
        } catch (error) {
            throw error
        }
    }

    async salesSubmit(req, res) {
        try {
            const { bookId, quantity, soldAt } = req.body;
            const sales = await salesModel.create({ bookId, quantity, soldAt });
            if (sales) {
                req.flash("success", "Sales added successfully");
                res.redirect('/');
            }
            else {
                req.flash("error", "Failed to add Sales");
                res.redirect('/salesForm');
            }
        }
        catch (error) {
            throw error
        }
    }
    async getDetails(req, res) {
        try {
            const details = await salesModel.aggregate([
                {
                    $lookup: {
                        from: 'books',
                        localField: 'bookId',
                        foreignField: '_id',
                        as: 'bookDetails'
                    }
                },
                {
                    $unwind: '$bookDetails'
                },
                {
                    $lookup: {
                        from: 'authors',
                        localField: 'bookDetails.authorId',
                        foreignField: '_id',
                        as: 'authorDetails'
                    }
                },
                {
                    $unwind: '$authorDetails'
                },
                {
                    $project: {
                        quantity: 1,
                        soldAt: 1,
                        bookTitle: '$bookDetails.title',
                        authorName: '$authorDetails.name',
                        bookPrice: '$bookDetails.price',
                        authorCountry: '$authorDetails.country',
                        totalRevanue: {
                            $multiply: ['$bookDetails.price', '$quantity']
                        }
                    }
                },
                {
                    $match: {
                        $and: [
                            { totalRevanue: { $gt: 2000 } },
                            { authorCountry: 'India' }
                        ]
                    }
                }
            ]);
            res.render('assignment3/details', { details });
            console.log("details",details);
            
        }
        catch (error) {
            throw error
        }
    }
}

module.exports = new Assignment3Controller();