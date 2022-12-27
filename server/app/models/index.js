const mongoose = require("mongoose");
Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

//? PERSONAL DETAILS
db.persons = require("./person.model")(mongoose);

//? AUTHENTICATION
db.users = require("./user.model")(mongoose);

//? PORTAL
db.instructors = require("./instructors.model")(mongoose);
db.students = require("./students.model")(mongoose);
db.grades = require("./grades.model")(mongoose);
db.siss = require("./SISS.model")(mongoose);
db.schedules = require("./schedules.model")(mongoose);
db.guardians = require("./guardian.model")(mongoose);

//? GENERAL
db.schoolData = require("./school.model")(mongoose);
db.notifications = require("./notification.model")(mongoose);

module.exports = db;
