const {
  authJwt,
  verifyUserCreate,
  verifyPersonCreate,
} = require("../middlewares");
const controller = require("../controllers/user.controller");
let router = require("express").Router();

const uploadImage = require("../helpers/uploadImage");

module.exports = (app) => {
  //TODO: ADD MORE ROUTES HERE

  router.get(
    "/students",
    // [
    //   authJwt.verifyToken,
    //   authJwt.isAdmin,
    //   authJwt.isRegistrar,
    //   authJwt.isInstructor,
    // ],
    controller.getStudents
  );
  router.get(
    "/staffs/",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.getStaffs
  );
  router.get(
    "/instructors/",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.getInstructors
  );
  router.get(
    "/all/",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllUsers
  );

  router.get(
    "/:userID",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.getUserDetails
  );

  router.post(
    "/create-staff",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.createNewStaff
  );

  router.post(
    "/create-student",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createStudent
  );

  router.get(
    "/details-for-update/:userID/:type",
    // [authJwt.verifyToken],
    controller.getDetailsForUpdate
  );
  app.use("/api/v1/users", router);
};
