const { verifyUserCreate, authJwt } = require("../middlewares");
const controller = require("../controllers/person.controller");
let router = require("express").Router();

module.exports = function (app) {
  app.use("/api/v1/person", router);
};
