const db = require("../models");
var bcrypt = require("bcryptjs");
const UserModel = db.users;
const PersonModel = db.persons;
const GradesModel = db.grades;
const NotificationModel = db.notifications;
const StudentModel = db.students;
const InstructorModel = db.instructors;
const SissModel = db.siss;
const ScheduleModel = db.schedules;
const SchoolDataModel = db.schoolData;
const GuardianModel = db.guardians;

const { createStaffs, createStudents } = require("./import.controller");

//TODO: update admin data
exports.createAdmin = async () => {
  console.log("System: creating admin");
  let adminExist = false;
  await UserModel.findOne({ role: 1 }).then((data) => {
    if (data) {
      adminExist = true;
    }
  });
  if (adminExist) {
    console.log("System: admin exist");
    return;
  }
  const user = new UserModel({
    username: "admin",
    password: bcrypt.hashSync("Qwerty123", 8),
    email: "admin1@gmail.com",
    role: 1,
    isFirstSetup: false,
    activated: true,
    locked: false,
  });
  const person = new PersonModel({
    name: {
      title: "MIT",
      first: "Vlad",
      middle: "",
      last: "Dracula",
      extension: "",
    },
    age: 23,
    birthDate: "2000-01-01",
    gender: 1,
  });
  user.person = person._id;
  person.user = user._id;
  await person.save();
  await user.save();
  console.log("System: admin created");
};
exports.createSchoolData = async () => {
  console.log("System: creating school data");
  const newSchoolData = SchoolDataModel({
    sy: "21-22",
    sem: 1,
    current: true,
    startDate: "2022-06-2022",
    endDate: "2023-03-2022",
    locked: false,
  });
  await newSchoolData.save();
  console.log("System: school data created");
};
exports.deleteAll = async () => {
  console.log("System: deleting collections");
  await UserModel.collection.drop();
  await PersonModel.collection.drop();
  await GradesModel.collection.drop();
  await NotificationModel.collection.drop();
  await StudentModel.collection.drop();
  await InstructorModel.collection.drop();
  await SissModel.collection.drop();
  await ScheduleModel.collection.drop();
  await GuardianModel.collection.drop();
  await SchoolDataModel.collection.drop();
  console.log("System: collections deleted");
};

exports.startSeed = async () => {
  await this.deleteAll();
  await this.createAdmin();
  await this.createSchoolData();
  await createStaffs();
  await createStudents();
};
