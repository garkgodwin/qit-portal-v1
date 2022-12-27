const db = require("../models");
const InstructorModel = db.instructors;

exports.getAllInstructors = async (req, res) => {
  const data = await InstructorModel.find({}).exec();

  res.status(200).send({
    message: "Successful",
    data: data,
  });
};
