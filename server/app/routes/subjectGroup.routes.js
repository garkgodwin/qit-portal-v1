const { authJwt, check } = require("../middlewares");
const controller = require("../controllers/subjectGroup.controller.js");
let router = require("express").Router();

module.exports = (app) => {
  // subject groups
  router.post("/", controller.createSubjectGroup);
  router.get("/:code/classes", controller.getSubjectGroupsOfThisSubject);

  app.use("/api/v1/subject-groups", router);
};
