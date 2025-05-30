const { name } = require("ejs");
const CategoryModel = require("../models/assignment5/category.model");

const CategoryController = {
    createCategory: async (req, res) => {
        const { parentId, name } = req.body;
        try {
            const category = await CategoryModel.create({
                parentId,
                name
            });
            if (category){
            return res.json({
                status: 201,
                message: "Category created successfully",
                data: category
            });
        }else {
            return res.json({
                status: 400,
                message: "Failed to create category",
            });
        }
        } catch (error) {
            return res.json({
                status: 500,
                message: "Internal server error",
                error: error.message,
            });
        }
    },
     getCategory: async (req, res) => {
        try {
            const category = await CategoryModel.aggregate([
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ["$isDeleted", false] },
                                { $eq: ["$parentId", null] },
                            ],
                        },
                    }
                },
                {
                 $lookup: {
                      from: "categories",
                      let: { pId: "$_id" },
                      pipeline: [
                          {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$isDeleted", false] },
                                        { $eq: ["$parentId", "$$pId"] },
                                    ],
                                },
                            },
                          },
                          {
                            $lookup: {
                                from: "categories",
                                let: { pId: "$_id" },
                                pipeline: [
                                    {
                                      $match: {
                                          $expr: {
                                              $and: [
                                                  { $eq: ["$isDeleted", false] },
                                                  { $eq: ["$parentId", "$$pId"] },
                                              ],
                                          },
                                      },
                                    },
                                    {
                                      $project: {
                                          _id: 1,
                                          name: 1,
                                      },
                                    },
                                ],
                                as: "ChildCategory",
                           }
                          },
                          {
                            $project: {
                                _id: 1,
                                name: 1,
                                ChildCategory: 1,
                            },
                          },
                      ],
                      as: "parentCategory",
                 }
                },
                {
                  $project: {
                    _id: 1,
                    name: 1,
                    parentCategory: "$parentCategory",
                    // childCategory: 1,
                  },
                },
            ]);
            return res.json({
                status: 200,
                message: "Category fetched successfully",
                data: category,
            })
          }
          catch (error) {
            return res.json({
              status: 500,
              message: "Internal server error",
              error: error.message,
            });
          }
    },
}


module.exports = CategoryController;