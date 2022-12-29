const { verifyUserCreate, authJwt, verifyPerson } = require("../middlewares");
const controller = require("../controllers/school.controller");
let router = require("express").Router();

module.exports = function (app) {
  app.get("/current", controller.getCurrentSchoolData);
  app.post("/new", controller.createSchoolData);
  app.put("/activate/:schoolDataID", controller.activateSchoolData);
  app.put("/lock/:schoolDataID", controller.lockSchoolData);
  app.get("/", controller.getAllSchoolData);

  app.use("/api/v1/school-data", router);
};
