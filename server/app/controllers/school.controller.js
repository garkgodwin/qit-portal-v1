const db = require("../models");
const SchoolDataModel = db.schoolData;

exports.getAllSchoolData = async (req, res) => {
  const schoolData = await SchoolDataModel.find({}).exec();
  return res.status(200).send({
    message: "Successfully fetched the school data",
    data: schoolData,
  });
};

exports.getCurrentSchoolData = async (req, res) => {
  const schoolData = await SchoolDataModel.findOne({
    current: true,
    locked: false,
  }).exec();
  if (!schoolData) {
    return res.status(404).send({
      message: "Current school data does not exist.",
    });
  }
  return res.status(200).send({
    message: "Successfully fetched the current school data",
    data: schoolData,
  });
};
exports.createSchoolData = async (req, res) => {
  const b = req.body;
  const newSchooldData = SchoolDataModel({
    sy: b.sy,
    sem: b.sem,
    current: false,
    startDate: b.startDate,
    endDate: b.endDate,
    locked: false,
  });
  const findExisting = await SchoolDataModel.findOne({
    sy: b.sy,
    sem: b.sem,
  }).exec();
  if (findExisting) {
    return res.status(400).send({
      message: "This school school year and semester has already been created",
    });
  }
  await newSchooldData.save();
  return res.status(200).send({
    message: "Successfully created a new school data",
    data: newSchooldData,
  });
};

exports.activateSchoolData = async (req, res) => {
  const id = req.params.schoolDataID;
  const activatedSchoolData = await SchoolDataModel.findOne({
    current: true,
  }).exec();
  if (activatedSchoolData) {
    return res.status(409).send({
      message: "You need to deactivate the current school data first.",
    });
  }
  const activate = await SchoolDataModel.findById(id).exec();
  activate.current = true;
  await activate.save();
  return res.status(200).send({
    message: "Successfully activated a school data.",
    data: activate,
  });
};

exports.lockSchoolData = async (req, res) => {
  const id = req.params.schoolDataID;
  const toLockData = await SchoolDataModel.findById(id).exec();
  toLockData.locked = true;
  await toLockData.save();
  return res.status(200).send({
    message:
      "Data has been locked, cannot create or update the whole scool information",
  });
};
