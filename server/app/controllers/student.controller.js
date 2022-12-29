const db = require("../models");
const StudentModel = db.students;
const UserModel = db.users;
const PersonModel = db.persons;
const GuardianModel = db.guardians;
const NotificationModel = db.notifications;
const GradeModel = db.grades;
const SchoolDataModel = db.schoolData;
//? helpers
const {
  generateOtp,
  generateStudentAndSchoolID,
} = require("../helpers/generate");
const {
  checkDuplicateEmail,
  checkDuplicateName,
} = require("../helpers/checkDuplicate");
const {
  calculateTotalGradesForThisSemAndSY,
  calculateSubjectGrades,
} = require("../helpers/calculate");
const {
  isStudentValidForCreation,
  isStudentValidForUpdate,
  isGuardianValidForCreation,
} = require("../helpers/check");
//? constants

//? FETCH
exports.getAllStudents = async (req, res) => {
  let students = [];
  await StudentModel.find()
    .populate({
      path: "person",
    })
    .populate({
      path: "user",
    })
    .populate({
      path: "guardians",
    })
    .populate({
      path: "currentSchoolData",
    })
    .then((data) => {
      students = data;
    })
    .catch((error) => {
      return res.status(500).send({
        message: error.message,
      });
    });
  // let students = [];
  // await StudentModel.find({})
  //   .then((data) => {
  //     students = data;
  //   })
  //   .catch((error) => {
  //     return res.status(500).send({ message: "Something went wrong" });
  //   });
  return res.status(200).send({
    // data: {
    //   persons,
    //   students,
    // },
    data: students,
    message: "Successfully fetched all students",
  });
};
exports.getStudentForUpdate = async (req, res) => {
  const studentID = req.params.studentID;
  const student = await StudentModel.findById(studentID)
    .populate({
      path: "person",
    })
    .populate({
      path: "currentSchoolData",
    });
  return res.status(200).send({
    message: "Successfully fetched the student details for update",
    data: student,
  });
};
exports.getStudentSubjectGrades = async (req, res) => {
  const p = req.params;
  const studentID = p.studentID;
  const code = p.subjectCode;
  const schoolData = await SchoolDataModel.findOne({
    current: true,
    locked: false,
  });
  if (!schoolData) {
    return res.status(404).send({
      message: "There are no active school data.",
    });
  }
  let student = await StudentModel.findOne({
    _id: studentID,
    schoolData: schoolData._id,
  })
    .populate({
      path: "person",
    })
    .populate({
      path: "user",
    });
  if (!student) {
    return res.status(404).send({
      message:
        "There student is not currently enrolled for this shool year semester.",
    });
  }
  const grades = await GradeModel.find({
    student: student._id,
    subjectCode: code,
    schoolData: schoolData._id,
  }).exec();

  const calculated = calculateSubjectGrades(grades);
  return res.status(200).send({
    message: "Successfully fetched the calculated grades for this subject.",
    data: {
      code: code,
      grades: calculated,
    },
  });
};

//? POST AND PUT
exports.createStudent = async (req, res) => {
  const b = req.body;
  const inputUser = b.user;
  const inputPerson = b.person;
  const inputStudent = b.student;

  const checkValidity = await isStudentValidForCreation(
    1,
    inputUser.username,
    inputUser.email,
    inputPerson.name,
    inputPerson.mobileNumber
  );
  if (checkValidity.status !== 200) {
    return res.status(checkValidity.status).message({
      message: checkValidity.message,
    });
  }

  const currentSD = await SchoolDataModel.findOne({
    current: true,
    locked: false,
  });

  if (!currentSD) {
    return res.status(404).send({
      message: "There are no active school data",
    });
  }

  let newPerson = PersonModel(inputPerson);
  let newUser = UserModel(inputUser);
  let newStudent = StudentModel(inputStudent);
  //? FOR USER
  newUser.person = newPerson._id;
  newUser.otp = generateOtp();
  newUser.role = 4;
  // newUser.password = generateHashedPassword(); ---- this will be generated once registered on first setup
  //? FOR PERSON
  newPerson.user = newUser._id;
  //? FOR STUDENT
  studentids = await generateStudentAndSchoolID();
  newStudent.user = newUser._id;
  newStudent.person = newPerson._id;
  newStudent.studentUniqueID = studentids.studentID;
  newStudent.schoolUniqueID = studentids.schoolUniqueID;
  newStudent.currentSchoolData = currentSD._id;

  await newPerson.save();
  await newUser.save();
  await newStudent.save();

  let newNotification = NotificationModel({
    subject: "Hi! Good day!",
    body: `Your information has been created in the system.
    To start using the system, please setup first your account:
    Username: ${newUser.email}
    OTP: ${newUser.otp}
  `,
    mobileNumber: newPerson.mobileNumber,
    email: newPerson.email,
    sent: false,
    shootDate: new Date().toISOString().split("T")[0],
  });
  await newNotification.save();

  let s = await StudentModel.findById(newStudent._id)
    .populate({
      path: "person",
    })
    .populate({
      path: "user",
    })
    .populate({
      path: "currentSchoolData",
    });
  const user = await UserModel.findById(newUser._id).populate({
    path: "person",
  });
  res.status(200).send({
    message: "Succesfuly in creating new student",
    data: {
      student: s,
      user: user,
    },
  });
};
exports.updateStudent = async (req, res) => {
  const b = req.body;
  const id = req.params.studentID;

  const currentSD = await SchoolDataModel.findOne({
    current: true,
    locked: false,
  });

  const studentInfo = await StudentModel.findById(id);

  if (currentSD) {
    // can only update person
    const personToUpdate = await PersonModel.findById(studentInfo.person);
    const validityCheck = await isStudentValidForUpdate(
      2,
      personToUpdate._id,
      b.person.name,
      b.person.mobileNumber
    );
    if (validityCheck.status !== 200) {
      return res.status(validityCheck.status).send({
        message: validityCheck.message,
      });
    }
    personToUpdate.name = b.person.name;
    personToUpdate.age = b.person.age;
    personToUpdate.birthDate = b.person.birthDate;
    personToUpdate.gender = b.person.gender;
    personToUpdate.mobileNumber = b.person.mobileNumber;
    await personToUpdate.save();
    await studentInfo.save();
  } else {
    const person = b.person;
    const student = b.student;
    const personToUpdate = await PersonModel.findById(studentInfo.person);
    const validityCheck = await isStudentValidForUpdate(
      2,
      personToUpdate._id,
      b.person.name,
      b.person.mobileNumber
    );
    if (validityCheck.status !== 200) {
      return res.status(validityCheck.status).send({
        message: validityCheck.message,
      });
    }
    studentInfo.yearLevel = student.yearLevel;
    studentInfo.section = student.section;
    studentInfo.course = student.course;
    student.studentType = student.studentType;
    personToUpdate.name = person.name;
    personToUpdate.age = person.age;
    personToUpdate.birthDate = person.birthDate;
    personToUpdate.gender = person.gender;
    personToUpdate.mobileNumber = person.mobileNumber;
    await personToUpdate.save();
    await studentInfo.save();
  }
  const updatedStudent = await StudentModel.findById(id).populate({
    path: "person",
  });
  res.status(200).send({
    message: "Succesfuly in updated the student",
    data: updatedStudent,
  });
};
exports.createNewGuardian = async (req, res) => {
  const b = req.body;
  const studentID = req.params.studentID;
  const inputUser = b.user;
  const inputPerson = b.person;
  const inputGuardian = b.guardian;

  const validityCheck = await isGuardianValidForCreation(
    1,
    inputUser.username,
    inputUser.guardian,
    inputPerson.name,
    inputPerson.mobileNumber
  );
  if (validityCheck.status !== 200) {
    return res.status(validityCheck.status).send({
      message: validityCheck.message,
    });
  }

  let newPerson = PersonModel(inputPerson);
  let newUser = UserModel(inputUser);
  let newGuardian = GuardianModel(inputGuardian);
  let oldStudent = await StudentModel.findById(studentID)
    .populate({
      path: "person",
    })
    .populate({
      path: "user",
    })
    .populate({
      path: "guardians",
    });
  if (oldStudent.guardians.length === 2) {
    return res.status(409).send({
      message: "Cannot add more than 2 guardians",
    });
  }
  newUser.person = newPerson._id;
  newUser.otp = generateOtp();
  newUser.role = 5;
  // newUser.password = generateHashedPassword(); ---- this will be generated once registered on first setup
  newPerson.user = newUser._id;
  oldStudent.guardians = [...oldStudent.guardians, newGuardian._id];
  newGuardian.students = [...newGuardian.students, oldStudent._id];
  await newPerson.save();
  await newUser.save();
  await newGuardian.save();
  await oldStudent.save();

  let newNotification = NotificationModel({
    subject: "Hi! Good day!",
    body: `Your information has been updated in the system.
      To start using the system, please setup first your account:
      Username: ${newUser.email}
      OTP: ${newUser.otp}
    `,
    mobileNumber: newPerson.mobileNumber,
    email: newUser.email,
    sent: false,
    shootDate: new Date().toISOString().split("T")[0],
  });
  await newNotification.save();

  res.status(200).send({
    message: "Succesfuly in creating new guardian",
    data: oldStudent,
  });
};
exports.getStudentFullInfo = async (req, res) => {
  const id = req.params.studentID;
  const studentPopObj = {
    path: "guardians",
    populate: {
      path: "person",
      // select: "name",
    },
  };
  const student = await StudentModel.findById(id)
    .populate({
      path: "person",
    })
    .populate({
      path: "user",
    })
    .populate(studentPopObj);
  const gradesPopObj = {
    path: "instructor",
    populate: {
      path: "person",
    },
  };
  const grades = await GradeModel.find({
    student: id,
  })
    .populate(gradesPopObj)
    .populate({
      path: "schoolData",
    });
  const data = {
    student: student,
    grades: grades,
  };
  return res.status(200).send({
    message: "Successfully fetched student's full info",
    data: data,
  });
};
//? BULK FOR SCHOOL DATA
exports.updateStudentsSchoolData = async (req, res) => {
  const b = req.body;
  // b is student ids
  const schoolData = await SchoolDataModel.findOne({
    current: true,
    locked: false,
  });
  if (!schoolData) {
    return res.status(404).send({
      message: "There are no active school data.",
    });
  }
  b.map(async (id) => {
    const student = await StudentModel.findById(id);
    student.currentSchoolData = schoolData._id;
    await student.save();
  });

  return res.status(200).send({
    message: "Students' school data has been updated",
  });
};
//? BULK - NOTIFY GRADES
exports.notifyStudentsAndGuardiansForGrades = async (req, res) => {
  const b = req.body;
  const schoolData = await SchoolDataModel.findOne({
    current: true,
    locked: false,
  });
  if (!schoolData) {
    return res.status(404).send({
      message: "There are no active school data.",
    });
  }

  let students = [];
  if (!b) {
    students = await StudentModel.find({
      schoolData: schoolData._id,
    })
      .populate({
        path: "person",
      })
      .populate({
        path: "user",
      })
      .exec();
  } else {
    b.map(async (s_id) => {
      let student = await StudentModel.findOne({
        schoolData: schoolData._id,
        _id: s_id,
      })
        .populate({
          path: "person",
        })
        .populate({
          path: "user",
        })
        .exec();
      students.push(student);
    });
  }

  students.map(async (student) => {
    const grades = await GradeModel.find({
      student: student._id,
      schoolData: schoolData._id,
    });
    const calculation = calculateTotalGradesForThisSemAndSY(grades);
    let newNotificationForStudent = NotificationModel({
      subject: "Hi! Good day!",
      body: `Your current grade for this sem is ${calculation.totalGrade} which is equivalent to ${calculation.point}.`,
      mobileNumber: student.person.mobileNumber,
      email: student.user.email,
      sent: false,
      shootDate: new Date().toISOString().split("T")[0],
    });
    await newNotificationForStudent.save();
    guardians = await GuardianModel.find({
      students: { $in: student._id },
    })
      .populate({
        path: "person",
      })
      .populate({
        path: "user",
      })
      .exec();
    guardians.map(async (g) => {
      let newNotificationForGuardian = NotificationModel({
        subject: "Hi! Good day!",
        body: `Your current grade for this sem is ${calculation.totalGrade} which is equivalent to ${calculation.point}.`,
        mobileNumber: g.person.mobileNumber,
        email: g.user.email,
        sent: false,
        shootDate: new Date().toISOString().split("T")[0],
      });
      await newNotificationForGuardian.save();
    });
  });

  return res.status(200).send({
    message:
      "Notifications have been created, notifications are currently being sent to the students and their guardians.",
  });
};

//? GET, POST, PUT, DELETE FOR GRADES
exports.getStudentGradesForThisSchoolData = async (req, res) => {
  const id = req.params.studentID;
  const schoolData = await SchoolDataModel.findOne({
    current: true,
    locked: false,
  });
  if (!schoolData) {
    return res.status(404).send({
      message: "There are no active school data.",
    });
  }
  const grades = await GradeModel.find({
    student: id,
    schoolData: schoolData._id,
  }).exec();
  return res.status(200).send({
    message: "Successfully fetched the grades of this student",
    data: grades,
  });
};
exports.createStudentGradeForThisSchoolData = async (req, res) => {
  const body = req.body;
  // semester, yearLevel are in schoolData already
  const schoolData = await SchoolDataModel.findOne({
    current: true,
    locked: false,
  });
  if (!schoolData) {
    return res.status(404).send({
      message: "There are no active school data.",
    });
  }
  //? find existing term and type
  if (body.type === 4) {
    const existingTermType = await GradeModel.findOne({
      term: body.term,
      type: body.type,
    }).exec();
    if (existingTermType) {
      return res.status(409).send({
        message: "Cannot add multiple exam grades",
      });
    }
  }
  let newGrade = GradeModel(body);
  await newGrade.save();

  return res.status(200).send({
    message: "Successfully added a grade",
    data: newGrade,
  });
};
exports.deleteStudentGrade = async (req, res) => {
  const gradeID = req.params.gradeID;
  // semester, yearLevel are in schoolData already
  const schoolData = await SchoolDataModel.findOne({
    current: true,
    locked: false,
  });
  if (!schoolData) {
    return res.status(404).send({
      message: "There are no active school data.",
    });
  }
  await GradeModel.findByIdAndDelete(gradeID).exec();
  return res.status(200).send({
    message: "Successfully deleted a student grade",
  });
};
