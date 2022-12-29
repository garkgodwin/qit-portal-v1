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
  calculateSubjectGrades,
  calculateSubjectGradeOfStudent,
} = require("../helpers/calculate");
const { SUBJECTS } = require("../constants/schoolInfo");
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
exports.getClassDetails = async (req, res) => {
  const id = req.params.subjectGroupID;
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
    select: {
      _id: 1,
      person: 1,
      yearLevel: 1,
      course: 1,
      section: 1,
    },
    populate: {
      path: "person",
    },
  };

  let subGroup = await SissModel.findById(id)
    .populate(popObj)
    .populate(popObj1)
    .lean();
  // lean means making mongoose object to a json object so that it can be modified

  let students = [];
  for (let i = 0; i < subGroup.students.length; i++) {
    const student = subGroup.students[i];
    const grades = await GradeModel.find({
      schoolData: currentSD._d,
      student: student._id,
    });
    if (grades.length === 0) {
      student.gradeRaw = 0;
      student.gradePoint = 5;
    } else {
      const calculatedGrades = calculateSubjectGradeOfStudent(grades);
      student.gradeRaw = calculatedGrades.totalGrade;
      student.gradePoint = calculatedGrades.point;
    }
    students.push(student);
  }
  subGroup.students = students;
  return res.status(200).send({
    message: "Successfully fetched the full details of this subject group",
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

exports.getAvailableStudentsToAdd = async (req, res) => {
  const id = req.params.subjectGroupID;
  const currentSD = await SchoolDataModel.findOne({
    current: true,
    locked: false,
  });
  if (!currentSD) {
    return res.status(404).send({
      message: "There are no active school data",
    });
  }

  const sg = await SissModel.findById(id);

  /* 
    Goal - Check what type of students to fetch
    by knowing what is the subject type
    Steps:
    1. Check if students are on current school data(sy and sem)
    2. Check if students are on the same studentType (College, Senior, Junior) as the class
    3. Fetch 
  */
  let subjectDetails = null;
  for (let i = 0; i < SUBJECTS.length; i++) {
    if (SUBJECTS[i].code === sg.subjectCode) {
      subjectDetails = SUBJECTS[i];
      break;
    }
  }
  if (!subjectDetails) {
    return res.status(404).send({
      message: "This subject is not available",
    });
  }
  const typeOfStudent = subjectDetails.toTake.type;
  const students = await StudentModel.find({
    currentSchoolData: currentSD._id,
    studentType: typeOfStudent,
  }).populate({
    path: "person",
  });

  let studentsWithoutThisSubject = [];
  if (sg.students.length === 0) {
    studentsWithoutThisSubject = students;
  } else {
    for (let i = 0; i < students.length; i++) {
      if (!sg.students.includes(students[i]._id)) {
        studentsWithoutThisSubject.push(students[i]);
      }
    }
  }
  return res.status(200).send({
    message: "Succesfully fetched the students for this class",
    data: studentsWithoutThisSubject,
  });
};

exports.newStudents = async (req, res) => {
  const id = req.params.subjectGroupID;
  const body = req.body;
  const studentIDS = req.body.ids;
  const currentSD = await SchoolDataModel.findOne({
    current: true,
    locked: false,
  });
  if (!currentSD) {
    return res.status(404).send({
      message: "There are no active school data",
    });
  }

  let sg = await SissModel.findById(id);
  if (!sg) {
    return res.status(404).send({
      message: "Class does not exist",
    });
  }
  let index = 0;
  console.log(studentIDS);
  while (index < studentIDS.length) {
    sg.students.push(studentIDS[index]);
    await sg.save();
    index++;
  }

  const newSg = await SissModel.findById(id)
    .populate({
      path: "instructor",
      populate: {
        path: "person",
      },
    })
    .populate({
      path: "students",
    });

  return res.status(200).send({
    message: "Successfully added new students to this class",
    data: newSg,
  });
};
exports.removeSubjectGroup = async (req, res) => {
  const id = req.params.subjectGroupID;
  const currentSD = await SchoolDataModel.findOne({
    current: true,
    locked: false,
  });
  if (!currentSD) {
    return res.status(404).send({
      message: "There are no active school data",
    });
  }

  await SissModel.findById(id).remove().exec();
  await Schedu;

  return res.status(200).send({
    message: "Successfully deleted this class",
  });
};
