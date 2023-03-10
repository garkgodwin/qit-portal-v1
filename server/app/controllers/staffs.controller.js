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

exports.getAllStaffs = async (req, res) => {
  let staffs = await PersonModel.find({
    $and: [
      {
        "user.role": 1,
      },
      {
        "user.role": 2,
      },
      {
        "user.role": 3,
      },
    ],
  })
    .populate({
      path: "user",
    })
    .exec();
  console.log(staffs);
  return res.status(200).send({
    message: "Successfully fetched all staffs",
    data: staffs,
  });
};
exports.getStaffDetailsForUpdate = async (req, res) => {
  const id = req.params.personID;
  const user = await UserModel.findOne({
    person: id,
  });
  if (!user) {
    return res.status(404).send({
      message: "User does not exist",
    });
  }
  const person = await PersonModel.findOne({ _id: id });
  if (!person) {
    return res.status(404).send({
      message: "Person does not exist",
    });
  }
  if (user.role === 3) {
    const instructor = await InstructorModel.findOne({ user: id });
    return res.status(200).send({
      message: "Successfully fetched staff details",
      data: {
        person: person,
        user: user,
        staff: instructor,
      },
    });
  } else {
    return res.status(200).send({
      message: "Successfully fetched staff details",
      data: {
        person: person,
        user: user,
        staff: {
          department: "N/A",
        },
      },
    });
  }
};
exports.updateStaffDetails = async (req, res) => {
  //? only person details can be updated
  const id = req.params.userID;
  const b = req.body;
  const name = b.person.name;
  const fullNameExists = await PersonModel.findOne({
    $and: [
      {
        "name.first": name.first,
      },
      {
        "name.middle": name.middle,
      },
      {
        "name.last": name.last,
      },
      {
        "name.extension": name.extension,
      },
    ],
  }).exec();
  if (fullNameExists) {
    return res.status(409).send({
      message: "This full name has already been used.",
    });
  }

  let person = await PersonModel.findOne({
    user: id,
  });
  person.name = b.person.name;
  person.age = b.person.age;
  person.birthDate = b.person.birthDate;
  person.gender = b.person.gender;
  await person.save();

  const user = await UserModel.findById(id)
    .populate({
      path: "person",
    })
    .exec();

  return res.status(200).send({
    message: "Successfully update staff details",
    data: user,
  });
};
exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await InstructorModel.find({})
      .populate({
        path: "person",
      })
      .populate({
        path: "user",
      });
    return res.status(200).send({
      message: "Successfully fetched all instructors",
      data: instructors,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Something went wrong",
    });
  }
};

exports.createStaff = async (req, res) => {
  const b = req.body;
  const p = b.person;
  const u = b.user;
  const i = b.instructor;

  const newUser = UserModel(u);
  const newPerson = PersonModel(p);
  newUser.person = newPerson._id;
  await newUser.save();
  newPerson.user = newUser._id;
  await newPerson.save();
  if (u.role === 3) {
    // instructor
    const newInstructor = InstructorModel(i);
    newInstructor.user = newUser._id;
    newInstructor.person = newPerson._id;
    await newInstructor.save();
  }

  const newStaff = await PersonModel.findOne({
    _id: newPerson._id,
  }).exec();

  res.status(200).send({
    message: "Successfully created a new staff",
    data: newStaff,
  });
};
exports.getStaff = async (req, res) => {
  const id = req.params.personID;
  let staff = await PersonModel.findById(id).populate({ path: "user" });
  return res.status(200).send({
    message: "Successfully fetched staff details",
    staff: staff,
  });
};
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

  return res.status(200).send({
    message: "Successfully created a subject group",
    data: newSubjectGroup,
  });
};
exports.deleteSubjectGroup = async (req, res) => {
  // only admin can delete
  const subjectGroupID = req.params.subjectGroupID;

  await SissModel.findOneAndDelete({
    _id: subjectGroupID,
  }).exec();

  await GradeModel.deleteMany({
    subjectGroup: subjectGroupID,
  }).exec();

  return res.status(200).send({
    message:
      "Successfully deleted a subject group and the grades of the students",
  });
};
exports.getStudents = async (req, res) => {
  const instructorID = req.params.instructorID;

  const currentSD = await SchoolDataModel.findOne({
    current: true,
    locked: false,
  });
  if (!currentSD) {
    return res.status(404).send({
      message: "There are no active school data",
    });
  }

  const students = SissModel.find({
    instructor: instructorID,
    schoolData: currentSD._id,
  })
    .populate({
      path: "instructor",
    })
    .populate({
      path: "students",
    })
    .populate({
      path: "person",
    })
    .exec();
  return res.status(200).send({
    message: "Successfully fetched the students of this instructor",
    data: students,
  });
};

exports.getSubjects = async (req, res) => {
  const instructorID = req.params.instructorID;

  const currentSD = await SchoolDataModel.findOne({
    current: true,
    locked: false,
  });
  if (!currentSD) {
    return res.status(404).send({
      message: "There are no active school data",
    });
  }
  const subjects = SissModel.find({
    instructor: instructorID,
    schoolData: currentSD._id,
    $group: {
      subjectCode: $subjectCode,
    },
  }).exec();
  return res.status(200).send({
    message: "Successfully fetched the subjects of this instructor",
    data: subjects,
  });
};
exports.getStudentsOfInstructorForThisSubject = async (req, res) => {
  let { instructorID, subjectCode } = req.params;
  const currentSD = await SchoolDataModel.findOne({
    current: true,
    locked: false,
  });
  if (!currentSD) {
    return res.status(404).send({
      message: "There are no active school data",
    });
  }
  let students = await SissModel.find({
    instructor: instructorID,
    subjectCode: subjectCode,
  })
    .populate({
      path: "students",
    })
    .populate({
      path: "person",
    });
  return res.status(200).send({
    message:
      "Successfully fetched the students of this instructor for this subject",
    data: students,
  });
};
exports.createGradeByInstructor = async (req, res) => {
  const { instructorID, subjectGroupID, studentID, subjectCode } = req.params;
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

  const newGrade = GradeModel({
    subjectCode: subjectCode,
    subjectGroup: subjectGroupID,
    instructor: instructorID,
    studentID: studentID,
    term: b.term,
    type: b.type,
    achieved: b.achieved,
    total: b.total,
    description: b.description,
    schoolData: currentSD._id,
  });
  await newGrade.save();

  return res.status(200).send({
    message: "Successfully added a new grade for this student",
  });
};
exports.deleteGradeByInstructor = async (req, res) => {
  const { instructorID, subjectGroupID, studentID, subjectCode } = req.params;
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

  await GradeModel.deleteOne({
    instructor: instructorID,
    subjectCode: subjectCode,
    subjectGroup: subjectGroupID,
    student: studentID,
  }).exec();

  return res.status(200).send({
    message: "Successfully deleted a subject",
  });
};
