const db = require("../models");
const StudentModel = db.students;
const UserModel = db.users;
const PersonModel = db.persons;
const GuardianModel = db.guardians;
const InstructorModel = db.instructors;
const NotificationModel = db.notifications;
const GradeModel = db.grades;
const SchoolDataModel = db.schoolData;
const SissModel = db.siss;

//? helpers
const {
  generateOtp,
  generateStudentAndSchoolID,
} = require("../helpers/generate");
const {
  calculateTotalGradesForThisSemAndSY,
  calculateSubjectGrades,
} = require("../helpers/calculate");
//? constants

exports.createSubjectGroup = async (req, res) => {
  const b = req.body;
  const currentSD = await SchoolDataModel.findOne({
    current: true,
    locked: false,
  });
  if (!currentSD) {
    return res.status(404).send({
      message: "There are no active school data",
    });
  }

  const newSubjectGroup = SissModel({
    subjectCode: b.subjectCode,
    instructor: b.instructor,
    students: [],
    schedules: [],
    schoolData: currentSD._id,
  });
  await newSubjectGroup.save();

  const popObj = {
    path: "instructor",
    populate: {
      path: "person",
      // select: "name",
    },
  };
  const subGroup = await SissModel.findById(newSubjectGroup._id).populate(
    popObj
  );

  return res.status(200).send({
    message: "Successfully created a subject group",
    data: subGroup,
  });
};

exports.getSubjectGroupsOfThisSubject = async (req, res) => {
  const code = req.params.code;
  const currentSD = await SchoolDataModel.findOne({
    current: true,
    locked: false,
  });
  if (!currentSD) {
    return res.status(404).send({
      message: "There are no active school data",
    });
  }

  const popObj = {
    path: "instructor",
    populate: {
      path: "person",
      // select: "name",
    },
  };
  const popObj1 = {
    path: "students",
    populate: {
      path: "person",
    },
  };

  const classes = await SissModel.find({
    subjectCode: code,
    schoolData: currentSD._id,
  })
    .populate(popObj)
    .populate(popObj1)
    .exec();

  return res.status(200).send({
    message: "Successfully fetched the classes of this subject",
    data: classes,
  });
};
