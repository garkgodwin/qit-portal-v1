const XLSX = require("xlsx");
const path = require("path");
const db = require("../models");
const UserModel = db.users;
const PersonModel = db.persons;
const InstructorModel = db.instructors;
const StudentModel = db.students;
const GuardianModel = db.guardians;
const SchoolDataModel = db.schoolData;
const { generateHashedPassword } = require("../helpers/generate");

exports.createStaffs = async (req, res) => {
  //?SAMPLE XLSX IMPORT
  const filePath = path.resolve(__dirname, "../../StaffsAndStudents.xlsx");
  const workbook = XLSX.readFile(filePath);
  const sheet_name_list = workbook.SheetNames;
  console.log("Creating staffs");
  const staffs = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  staffs.map(async (values) => {
    const title = values.title;
    const first = values.first;
    const last = values.last;
    const age = values.age;
    const birthDate = values.birthDate;
    const gender = values.gender;
    const username = values.username;
    const password = "Qwerty123";
    const role = values.role;
    const staffExists = await UserModel.findOne({
      username: username,
    });
    if (staffExists) {
      return;
    }
    const newPerson = PersonModel({
      name: {
        title: title,
        first: first,
        middle: "",
        last: last,
        extension: "",
      },
      age: age,
      birthDate: birthDate,
      gender: gender,
    });
    const newUser = UserModel({
      username: username,
      email: "qitportalstudent1@gmail.com",
      password: generateHashedPassword(password),
      role: role,
      isFirstSetup: false,
      activated: true,
      locked: false,
    });
    newPerson.user = newUser._id;
    newUser.person = newPerson._id;
    await newPerson.save();
    await newUser.save();
    if (role === 3) {
      //? add instructor data
      const newInstructor = InstructorModel({
        user: newUser._id,
        person: newPerson._id,
        department: "IT",
      });
      await newInstructor.save();
    }
  });
  console.log("Staffs created");
};
exports.createStudents = async (req, res) => {
  //? school data

  const currentSD = await SchoolDataModel.findOne({
    current: true,
    locked: false,
  });
  if (!currentSD) {
    console.log("No active school data");
    return;
  }

  //?SAMPLE XLSX IMPORT
  const filePath = path.resolve(__dirname, "../../StaffsAndStudents.xlsx");
  const workbook = XLSX.readFile(filePath);
  const sheet_name_list = workbook.SheetNames;
  console.log("Creating students");
  const students = XLSX.utils.sheet_to_json(
    workbook.Sheets[sheet_name_list[1]]
  );
  const guardians = XLSX.utils.sheet_to_json(
    workbook.Sheets[sheet_name_list[2]]
  );
  let guardianIndex = 0;
  students.map(async (values) => {
    // student person data
    const first = values.first;
    const last = values.last;
    const extension = values.extension;
    const age = values.age;
    const birthDate = values.birthDate;
    const gender = values.gender;
    // student user data
    const username = values.username;
    const password = "Qwerty123";
    const role = 4;
    // student data
    const course = values.course;
    const yearLevel = values.yearLevel;
    const section = values.section;
    const studentType = values.studentType;

    // student - guardian person;
    const gFirst = guardians[guardianIndex].first;
    const gLast = guardians[guardianIndex].last;
    const gExtension = guardians[guardianIndex].extension;
    const gAge = guardians[guardianIndex].age;
    const gBirthDate = guardians[guardianIndex].birthDate;
    const gGender = guardians[guardianIndex].gender;
    // student - guardian user;
    const gUsername = guardians[guardianIndex].username;
    const gPassword = "Qwerty123";
    const gRole = 5;
    // student - guardian data
    const guardianType = guardians[guardianIndex].guardianType;
    const studentExists = await UserModel.findOne({
      username: username,
    }).exec();
    if (studentExists) {
      return;
    }

    const newPerson = PersonModel({
      name: {
        title: "",
        first: first,
        middle: "",
        last: last,
        extension: extension,
      },
      age: age,
      birthDate: birthDate,
      gender: gender,
    });
    const newUser = UserModel({
      username: username,
      email: "qitportalstudent1@gmail.com",
      password: generateHashedPassword(password),
      role: role,
      isFirstSetup: false,
      activated: true,
      locked: false,
    });
    const newStudent = StudentModel({
      course: course,
      yearLevel: yearLevel,
      section: section,
      studentType: studentType,
      currentSchoolData: currentSD._id,
    });
    const newGuardianPerson = PersonModel({
      name: {
        title: "",
        first: gFirst,
        middle: "",
        last: gLast,
        extension: gExtension,
      },
      age: gAge,
      birthDate: gBirthDate,
      gender: gGender,
    });
    const newGuardianUser = UserModel({
      username: gUsername,
      email: "qitportalstudent1@gmail.com",
      password: generateHashedPassword(gPassword),
      role: gRole,
      isFirstSetup: false,
      activated: true,
      locked: false,
    });
    const newGuardian = GuardianModel({
      guardianType: guardianType,
    });
    //? student update
    newPerson.user = newUser._id;
    newUser.person = newPerson._id;
    newStudent.person = newPerson._id;
    newStudent.user = newUser._id;
    newStudent.guardians = [newGuardian._id];
    //? guardian update
    newGuardian.students = [newStudent._id];
    newGuardianPerson.user = newGuardianUser._id;
    newGuardianUser.person = newGuardianPerson._id;

    await newPerson.save();
    await newUser.save();
    await newStudent.save();
    await newGuardianPerson.save();
    await newGuardianUser.save();
    await newGuardian.save();
    guardianIndex += 1;
  });
  console.log("Students and guardians created");
};
