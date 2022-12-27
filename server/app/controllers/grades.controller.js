const db = require("../models");
const GradeModel = db.grades;

exports.getAllGrades = async (req, res) => {
  res.status(200).send({
    message: "Got all grades",
  });
};

exports.getGrade = async (req, res) => {
  res.status(200).send({
    message: "Got grade only",
  });
};

exports.getStudentGrades = async (req, res) => {
  res.status(200).send({
    message: "Got student grades",
  });
};

exports.createGrade = async (req, res) => {
  /* DATA NEEDED: 
    studentID, 
    instructor id,
    room,
    studentYearLevel, 
    achieved,
    total,
    semester,
    term,
    subject code,
    description,
    addedBy: user logged in
  */
  //TODO: instructor or registrar for the user
  const b = req.body;

  res.status(200).send({
    message: "Created grade",
  });
};

exports.updateGrade = async (req, res) => {
  res.status(200).send({
    message: "Updated grade",
  });
};
