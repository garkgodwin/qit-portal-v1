const { SUBJECTS, ROOMS } = require("../constants/schoolInfo");
const db = require("../models");
const SissModel = db.siss;
const InstructorModel = db.instructors;

exports.getAll = (req, res) => {
  return res.status(200).send({
    message: "Successful",
    data: SUBJECTS,
  });
};
exports.getSubjectInfo = async (req, res) => {
  //? subject data
  //? schedules
  //? instructors
  //? students
  let subjectData = null;
  SUBJECTS.map((s) => {
    if (s.code === req.params.code) {
      subjectData = s;
    }
  });

  const groups = await SissModel.find({
    subjectCode: req.params.code,
  }).exec();

  return res.status(200).send({
    message: "Successful",
    data: {
      subject: subjectData,
      groups: groups,
    },
  });
};
exports.getRooms = (req, res) => {
  return res.status(200).send({
    message: "Successful",
    data: ROOMS,
  });
};

exports.getSubjectGroups = async (req, res) => {
  const data = await SissModel.find({}).exec();
  if (data) {
    return res.status(200).send({
      message: "Fetch subject groups successfully.",
      data: data,
    });
  } else {
    return res.status(500).send({
      message: "Something went wrong",
    });
  }
};
exports.newSubjectGroup = async (req, res) => {
  const b = req.body;
  const code = b.code;
  const instructor = b.instructor;
  const students = b.students;

  const newSiss = SissModel({
    subjectCode: code,
    instructor: instructor,
    students: students,
  });

  await newSiss.save();

  res.status(200).send({
    message: "Successful",
    data: newSiss,
  });
};
//? THIS MEANS ADDING A NEW SISS DATA
exports.addInstructorToSubject = async (req, res) => {
  //? check if subject is valid
  //? check if instructor exists in InstructorModel
  //? check if instructor and subject code exsits in SISSModle
  //? create new SISS

  const b = req.body;

  if (SUBJECTS.filter((e) => e.code === b.subjectCode).length === 0) {
    return res
      .status(404)
      .send({ message: "This subject does not exist in the server" });
  }
  const instructorExists = await InstructorModel.findByID(
    b.instructorID
  ).exec();
  if (!instructorExists) {
    return res.status(404).send({ message: "Instructor does not exist" });
  }
  const sissExists = await SissModel.findOne({
    subjectCode: b.subjectCode,
    instructor: b.instructorID,
  }).exec();
  if (sissExists) {
    return res
      .status(409)
      .send({ message: "Instructor with this subject code already exist" });
  }

  const newSiss = SissModel({
    subjectCode: b.subjectCode,
    instructor: b.instructorID,
    students: [],
    schedules: [],
  });
  await newSiss.save();

  return req.status(200).send({
    message: "Successful in adding instructor to a subject",
  });
};

//? THIS MEANS UPDATING THE EXISTING SISS DATA
exports.addStudentToSubject = async (req, res) => {
  return req.status(200).send({
    message: "Successful",
  });
};

//? THIS MEANS UPDATING THE EXISTING SISS DATA
exports.updateSiss = async (req, res) => {
  /*
    ! Data
    - id = siss id
    - instructor
    - student/students
  */

  return req.status(200).send({
    message: "Successful",
  });
};
