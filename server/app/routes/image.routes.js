const {
  authJwt,
  verifyUserCreate,
  verifyPersonCreate,
} = require("../middlewares");
const controller = require("../controllers/image.controller");
let router = require("express").Router();

const uploadImage = require("../helpers/uploadImage");

module.exports = (app) => {
  router.post(
    "/upload/:personId",
    uploadImage.single("photo"),
    controller.uploadImage
  );

  app.use("/api/v1/images", router);
};
