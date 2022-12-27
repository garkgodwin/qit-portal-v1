const { verifyUserCreate, authJwt, verifyPerson } = require("../middlewares");
const controller = require("../controllers/auth.controller");
let router = require("express").Router();

module.exports = function (app) {
  router.get("/authenticate", [authJwt.verifyToken], controller.authenticate);

  //? THIS IS THE PERMANENT ROUTE FOR CREATING USERS
  router.post(
    "/register",
    [
      authJwt.verifyToken,
      authJwt.isAdmin,
      verifyPerson.checkPersonExists,
      verifyUserCreate.checkDuplicateUsernameOrEmail,
    ],
    controller.createUserAndAssignToPerson
  );

  router.put("/first-setup/:userId", controller.registerFirstSetup);

  router.post("/login", controller.login);

  router.post("/logout", controller.logout);

  app.use("/api/v1/auth", router);
};
