const db = require("../models");
const { ROOMS, SUBJECTS } = require("../constants/schoolInfo");
const SubjectGroupModel = db.siss;
const SchoolDataModel = db.schoolData;
const { authJwt, check } = require("../middlewares");
let router = require("express").Router();

module.exports = (app) => {
  router.get("/subjects", getSubjects);
  router.get("/rooms", getRooms);
  router.get("/classes", getAllSubjectGroups);
  app.use("/api/v1/general", router);
};

const getSubjects = (req, res) => {
  return res.status(200).send({
    message: "Successfully fetched the subjects of this school",
    data: SUBJECTS,
  });
};
const getRooms = (req, res) => {
  return res.status(200).send({
    message: "Successfully fetched the rooms of this school",
    data: ROOMS,
  });
};
const getAllSubjectGroups = async (req, res) => {
  const schoolData = await SchoolDataModel.findOne({
    current: true,
    locked: false,
  });
  if (!schoolData) {
    return res.status(404).send({
      message: "There are no active school data.",
    });
  }
  const popObj = {
    path: "instructor",
    populate: {
      path: "person",
      // select: "name",
    },
  };

  const classes = await SubjectGroupModel.find({
    schoolData: schoolData._id,
  })
    .populate(popObj)
    .exec();

  return res.status(200).send({
    message:
      "Successfully fetched the classes for this school year and semester",
    data: classes,
  });
};
