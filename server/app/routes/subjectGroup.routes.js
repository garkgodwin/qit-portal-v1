const { authJwt, check } = require("../middlewares");
const controller = require("../controllers/subjectGroup.controller.js");
let router = require("express").Router();

module.exports = (app) => {
  // subject groups
  router.post("/", controller.createSubjectGroup);
  router.get("/:subjectGroupID", controller.getClassDetails);
  router.get("/:code/classes", controller.getSubjectGroupsOfThisSubject);
  router.put("/:subjectGroupID/new-students", controller.newStudents);
  router.get(
    "/:subjectGroupID/available-students",
    controller.getAvailableStudentsToAdd
  );
  router.delete("/:subjectGroupID", controller.removeSubjectGroup);

  app.use("/api/v1/subject-groups", router);
};
