const schoolModel = require("../models/assignment4/school.model");
const facultyModel = require("../models/assignment4/faculty.model");
const studentModel = require("../models/assignment4/student.model");

const Assignment4Controller ={
     async addSchool (req, res) {
        try {
            const { schoolName } = req.body;
            const savedSchool = await schoolModel.create({ schoolName });
            if (!savedSchool) {
                return res.json({
                    status: 400,
                    message: "Failed to add school",
                });
            }
           else{ 
            res.json({
                status: 201,
                message: "School added successfully",
                data: savedSchool,
            });
        }
        } catch (error) {
            res.json({
                status: 500,
                message: "Internal server error",
                error: error.message,
            });
        }
    },
    async addFaculty (req, res) {
        try {
            const { facultyName, facultyPhone, schoolId } = req.body;
            const savedFaculty = await facultyModel.create({ facultyName, schoolId, facultyPhone });
            if (!savedFaculty) {
                return res.json({
                    status: 400,
                    message: "Failed to add faculty",
                });
            }
           else{ 
            res.json({
                status: 201,
                message: "Faculty added successfully",
                data: savedFaculty,
            });
        }
        } catch (error) {
            res.json({
                status: 500,
                message: "Internal server error",
                error: error.message,
            });
        }
    },
    async addStudent (req, res) {
        try {
            const { studentName, studentPhone, facultyId } = req.body;
            const savedStudent = await studentModel.create({ studentName, studentPhone, facultyId });
            if (!savedStudent) {
                return res.json({
                    status: 400,
                    message: "Failed to add student",
                });
            }
           else{ 
            res.json({
                status: 201,
                message: "Student added successfully",
                data: savedStudent,
            });
        }
        } catch (error) {
            res.json({
                status: 500,
                message: "Internal server error",
                error: error.message,
            });
        }
    },
    async getDetails (req, res) {
        try {
            const students = await studentModel.aggregate([
                {
                    $lookup: {
                        from: "faculties",
                        let: { facultyId: '$facultyId'},
                        pipeline: [
                            {
                               $match:{
                                $expr:{
                                    $and:[
                                        {
                                          $eq: ["$isDeleted", false],  
                                        },
                                        {
                                            $eq: ["$_id", "$$facultyId"],
                                        }
                                    ],
                                }
                               } 
                            },
                            {
                               $project:{
                                facultyName: 1,
                                schoolId: 1,
                               } 
                            }
                        ],
                        as: "facultyDetails",
                    }
                },
                {
                    $unwind: "$facultyDetails",
                },
                {
                    $lookup: {
                        from: "schools",
                        localField: "facultyDetails.schoolId",
                        foreignField: "_id",
                        as: "schoolDetails",    
                    },
                },
                {
                    $unwind: "$schoolDetails",
                },
                {
                    $project: {
                        studentName: 1,
                        studentPhone: 1,
                        facultyName: "$facultyDetails.facultyName",
                        schoolName: "$schoolDetails.schoolName",
                    },
                },
            ]);
            res.json({
                status: 200,
                message: "Details fetched successfully",
                data: students, 
            });
        } catch (error) {
            res.json({
                status: 500,
                message: "Internal server error",
                error: error.message,
            });
        }
    },  
   
}

module.exports = Assignment4Controller;