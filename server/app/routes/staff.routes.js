const { authJwt, check } = require("../middlewares");
const controller = require("../controllers/staffs.controller");
let router = require("express").Router();

module.exports = (app) => {
  //TODO: ADD MORE ROUTES HERE

  router.get("/", controller.getAllStaffs);
  router.get("/instructors", controller.getAllInstructors);
  router.post("/new", controller.createStaff);
  router.get("/:personID", controller.getStaff);
  router.delete(
    "/instructors/:instructorID/subject-groups/:subjectGroupID",
    controller.deleteSubjectGroup
  );
  router.get("/instructors/:instructorID/students", controller.getStudents);
  router.get("/instructors/:instructorID/subjects", controller.getSubjects);
  router.get(
    "/instructors/:instructorID/:subjectCode/students",
    controller.getStudentsOfInstructorForThisSubject
  );

  router.post(
    "/instructors/:instructorID/subject-groups/:subjectGroupID/students/:studentID/subjects/:subjectCode",
    controller.createGradeByInstructor
  );
  router.delete(
    "/instructors/:instructorID/subject-groups/:subjectGroupID/students/:studentID/subjects/:subjectCode",
    controller.deleteGradeByInstructor
  );

  // subject groups
  router.post("/subjectGroups", controller.createSubjectGroup);

  app.use("/api/v1/staffs", router);
};
