const { authJwt, check } = require("../middlewares");
const controller = require("../controllers/student.controller");
let router = require("express").Router();

module.exports = (app) => {
  //TODO: ADD MORE ROUTES HERE

  router.get("/", controller.getAllStudents);
  router.get("/:studentID", controller.getStudent);
  router.get("/:studentID/:subjectCode", controller.getStudentSubjectGrades);
  router.post("/", controller.createStudent);
  router.put("/update/:studentID", controller.updateStudent);
  router.post("/new-guardian/:studentID", controller.createGuardian);

  //? BULK FOR STUDENTS - UPDATES SCHOOL DATA
  router.put("/school-data-update", controller.updateStudentsSchoolData);
  router.post("/notify", controller.notifyStudentsAndGuardiansForGrades);

  //? FOR GRADES
  router.get(
    "/:studentID/grades",
    controller.getStudentGradesForThisSchoolData
  );
  router.delete("/:studentID/grades/:gradeID", controller.deleteStudentGrade);

  app.use("/api/v1/students", router);
};
