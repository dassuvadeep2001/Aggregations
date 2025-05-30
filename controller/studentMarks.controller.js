const studentMarksModel = require('../models/studentExam.model');

class StudentMarksController {
    async addStudentMarks(req, res) {
        try {
            const { name, bengaliMarks, englishMarks, mathMarks, scienceMarks } = req.body;
            const savedStudentMarks = await studentMarksModel.create({
                name,
                bengaliMarks,
                englishMarks,
                mathMarks,
                scienceMarks
            });
            if (!savedStudentMarks) {
                return res.json({
                    status: 400,
                    message: "Failed to add student marks",
                });
            } else {
                res.json({
                    status: 201,
                    message: "Student marks added successfully",
                    data: savedStudentMarks,
                });
            }
        } catch (error) {
            res.json({
                status: 500,
                message: "Internal server error",
                error: error.message,
            });
        }
    }
    async getStudentMarksStatus(req, res) {
  try {
    const result = await studentMarksModel.aggregate([
      {
        $addFields: {
          totalMarks: {
            $add: [
              "$bengaliMarks",
              "$englishMarks",
              "$mathMarks",
              "$scienceMarks"
            ]
          }
        }
      },
      {
        $project: {
          name: 1,
          bengaliMarks: 1,
          englishMarks: 1,
          mathMarks: 1,
          scienceMarks: 1,
          totalMarks: 1,
          status: {
            $cond: {
              if: { $lt: ["$totalMarks", 100] },
              then: "Fail",
              else: "Pass"
            }
          }
        }
      }
    ]);
    const percentage = await studentMarksModel.aggregate([
      {
        $addFields: {
          totalMarks: {
            $add: [
              "$bengaliMarks",
              "$englishMarks",
              "$mathMarks",
              "$scienceMarks"
            ]
          },
          status: {
            $cond: {
              if: { $lt: [
                { $add: [
                  "$bengaliMarks",
                  "$englishMarks",
                  "$mathMarks",
                  "$scienceMarks"
                ] }, 
                100
              ]},
              then: "Fail",
              else: "Pass"
            }
          }
        }
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: null,
          data: { $push: { status: "$_id", count: "$count" } },
          total: { $sum: "$count" }
        }
      },
      { $unwind: "$data" },
      {
        $project: {
          _id: 0,
          status: "$data.status",
          percentage: {
            $round: [
              {
                $multiply: [
                  { $divide: ["$data.count", "$total"] },
                  100
                ]
              },
              2
            ]
          }
        }
      }
    ]);

    // Final response
    res.json({
      status: 200,
      message: "Student marks status and percentage retrieved successfully",
      data: result,
      percentage: percentage
    });

  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      error: error.message
    });
  }
}

}
module.exports = new StudentMarksController();