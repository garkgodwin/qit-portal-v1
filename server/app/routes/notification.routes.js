const { authJwt } = require("../middlewares");
const controller = require("../controllers/notification.controller");
let router = require("express").Router();

module.exports = (app) => {
  //TODO: ADD MORE ROUTES HERE

  router.get("/unsent", controller.getUnsentNotification);

  app.use("/api/v1/notifications", router);
};
