const { authJwt } = require("../middlewares");
const controller = require("../controllers/instructor.controller");
let router = require("express").Router();

module.exports = function (app) {
  router.get("/", controller.getAllInstructors);
  app.use("/api/v1/instructors", router);
};
