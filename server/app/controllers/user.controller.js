const db = require("../models");
const UserModel = db.users;
const PersonModel = db.persons;
const StudentModel = db.students;
const InstructorModel = db.instructors;
const otpGenerator = require("otp-generator");

const { createNewPerson } = require("./person.controller");
const { createNewStudent } = require("./student.controller");
const {
  checkDuplicateName,
  checkDuplicateEmail,
} = require("../helpers/checkDuplicate");

//?constants
const { DEPARTMENTS } = require("../constants/schoolInfo");
const handleErrors = require("../helpers/checkError");
const { students } = require("../models");

exports.getAllUsers = async (req, res) => {
  await UserModel.find({})
    .populate("person")
    .then((data) => {
      return res.status(200).send({
        data: data,
        message: "Successful",
      });
    })
    .catch((error) => {
      return res.status(500).send({
        message: error.message,
      });
    });
};
exports.getUserDetails = async (req, res) => {
  let user = await UserModel.findById(req.params.userID)
    .populate("person")
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return null;
    });
  if (user) {
    return res.status(200).send({
      message: "Successful",
      data: user,
    });
  } else {
    return res.status(500).send({
      message: "Something went wrong",
    });
  }
};

exports.getDetailsForUpdate = async (req, res) => {
  const params = req.params;
  const userID = params.userID;
  const type = parseInt(params.type);
  let user = await UserModel.findById(userID)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return null;
    });
  if (!user) {
    console.log("No user");
    return res.status(500).send({
      message: "Something went wrong",
    });
  }
  let person = await PersonModel.findOne({ user: userID })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return null;
    });
  if (!person) {
    console.log("No person");
    return res.status(500).send({
      message: "Something went wrong",
    });
  }
  if (type === 2) {
    // fetch staff
    let instructor = await InstructorModel.findOne({ user: userID })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return null;
      });
    if (!instructor) {
      instructor = {
        department: "IT",
      };
    }
    return res.status(200).send({
      message: "Successful",
      data: {
        user: user,
        person: person,
        staff: instructor,
      },
    });
  } else if (type === 3) {
    // fetch student
    let student = await StudentModel.findOne({ user: userID })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return null;
      });
    if (!student) {
      console.log("no instructor");
      return res.status(500).send({ message: "Something went wrong" });
    }
    return res.status(200).send({
      message: "Successful",
      data: {
        user: user,
        person: person,
        student: student,
      },
    });
  } else {
    console.log("System: No type selected to fetch user.");
    return res.status(500).send({
      message: "Something went wrong",
    });
  }
};
exports.getStaffs = async (req, res) => {
  await UserModel.find({})
    .populate("person")
    .then((data) => {
      let newData = data.filter((d) => {
        return d.role === 1 || d.role == 2 || d.role == 3;
      });
      return res.status(200).send({
        message: "Successful",
        data: newData,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).send({
        message: "Something went wrong",
      });
    });
};
exports.getInstructors = async (req, res) => {
  let instructors = [];
  await InstructorModel.find()
    .populate({
      path: "person",
    })
    .populate({
      path: "user",
    })
    .then((data) => {
      instructors = data;
    })
    .catch((error) => {
      return res.status(500).send({
        message: error.message,
      });
    });
  return res.status(200).send({
    data: instructors,
    message: "Successful",
  });
};
exports.getStudents = async (req, res) => {
  let students = [];
  await StudentModel.find()
    .populate({
      path: "person",
    })
    .populate({
      path: "user",
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
    message: "Successful",
  });
};
const createNewUser = async (user) => {
  let message = "";
  let status = 500;
  let newUser = null;
  //* START OF OTP BLOCK
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: true,
    specialChars: false,
  });
  //* END OF OTP BLOCK
  await UserModel.create({
    username: user.email,
    email: user.email,
    role: user.role,
    otp: otp,
  })
    .then((data) => {
      if (data) {
        newUser = data;
        status = 200;
        message = "User created successfully";
      }
    })
    .catch((error) => {
      const newError = handleErrors(error);
      message = newError.message;
      status = newError.status;
    });
  return {
    message,
    status,
    newUser,
  };
};

//? CREATE NEW STAFF
exports.createNewStaff = async (req, res) => {
  //?  must be instructor or registrar only
  //? check if email is duplicate?
  //? check if title + first name + middle name + last name + ext is existing
  //? generate and check OTP uniqueness
  //? create user and person data and save image
  //TODO send otp to email/number
  const b = req.body;
  const u = b.user;
  const p = b.person;
  const i = b.staff;
  const user = {
    ...u,
    role: parseInt(u.role),
  };
  if (user.role < 2 && user.role > 3) {
    return res.status(422).send({ message: "Can only create staff here" });
  }
  /* START CHECK FULL NAME AND EMAIL DUPLICATES */
  const duplicateName = await checkDuplicateName(p.name);
  const duplicateEmail = await checkDuplicateEmail(user.email);
  if (duplicateName.status !== 200) {
    return res
      .status(duplicateName.status)
      .send({ message: duplicateName.message });
  }
  if (duplicateEmail.status !== 200) {
    return res
      .status(duplicateEmail.status)
      .send({ message: duplicateEmail.message });
  }
  /* END CHECK FULL NAME AND EMAIL DUPLICATES */

  /* CREATE USER BLOCK */
  let newUserData = await createNewUser(user);
  if (newUserData.status !== 200) {
    return res.status(newUserData.status).send({
      message: newUserData.message,
    });
  }
  /* END OF CREATE USER BLOCK */

  /* START OF CREATE PERSON BLOCK */
  let newUser = newUserData.newUser;
  let userID = newUser._id;
  let newPersonData = await createNewPerson(p, userID);
  if (newPersonData.status !== 200) {
    await UserModel.delete({ _id: newUserData.newUser._id }).exec();
    return res
      .status(newPersonData.status)
      .send({ message: newPersonData.message });
  }
  newUser.person = newPersonData.newPerson._id;
  newUser.save();
  /* END OF CREATE PERSON BLOCK */

  /* START OF CREATE INSTRUCTOR BLOCK */
  if (user.role === 3) {
    const instructor = InstructorModel({
      user: userID,
      person: newPersonData.newPerson._id,
      department: i.department,
    });
    await instructor.save();
    if (!instructor) {
      await PersonModel.delete({ _id: newPersonData.newPerson._id }).exec();
      await UserModel.delete({ _id: newUserData.newUser._id }).exec();
      return res.status(200).send({
        message: "Staff creation failed",
      });
    }
  }
  /* END OF CREATE INSTRUCTOR BLOCK */
  return res.status(200).send({
    message: "Created Staff Successfully",
    data: {
      person: newPersonData.newPerson,
      user: newUserData.newUser,
    },
  });

  //TODO: SEND SMS/EMAIL ABOUT THE USERNAME AND OTP TO PERSON's number or email
};

//? CREATE NEW STUDENT
exports.createStudent = async (req, res) => {
  //? check if email is duplicate?
  //? check if title + first name + middle name + last name + ext is existing
  //? generate and check OTP uniqueness
  //? create user and person data
  //? create new student
  //TODO send otp to email/number
  const b = req.body;
  const u = b.user;
  const p = b.person;
  let s = b.student;
  const user = {
    ...u,
    role: 4,
  };
  /* START OF CHECKING DUPLICATES */
  const duplicateName = await checkDuplicateName(p.name);
  if (duplicateName.status !== 200) {
    return res
      .status(duplicateName.status)
      .send({ message: duplicateName.message });
  }
  const duplicateEmail = await checkDuplicateEmail(user.email);
  if (duplicateEmail.status !== 200) {
    return res
      .status(duplicateEmail.status)
      .send({ message: duplicateEmail.message });
  }
  /* END OF CHECKING DUPLICATES */

  /* START OF CREATING USER */
  let newUserData = await createNewUser(user);
  if (newUserData.status !== 200) {
    return res
      .status(newUserData.status)
      .send({ message: newUserData.message });
  }
  /* END OF CREATING USER */

  /* START OF CREATING PERSON */
  let userID = newUserData.newUser._id;
  let newPersonData = await createNewPerson(p, userID);
  if (newPersonData.status !== 200) {
    await UserModel.delete({ _id: newUserData.newUser._id }).exec();
    return res
      .status(newPersonData.status)
      .send({ message: newPersonData.message });
  }
  /* END OF CREATING PERSON */

  /* START OF CREATING STUDENT */
  let personID = newPersonData.newPerson._id;
  s = {
    ...s,
    userId: userID,
    personId: personID,
  };
  let newStudentData = await createNewStudent(s);
  if (newStudentData.status !== 200) {
    await PersonModel.delete({ _id: newUserData.newPerson._id }).exec();
    await UserModel.delete({ _id: newUserData.newUser._id }).exec();
    return res
      .status(newStudentData.status)
      .send({ message: newStudentData.message });
  }
  /* END OF CREATING STUDENT */

  return res.status(200).send({
    message: "Created Student Successfully",
    data: {
      user: newUserData.newUser,
      student: newStudentData.data,
    },
  });
};
