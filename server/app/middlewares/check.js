const db = require("../models");
const PersonModel = db.persons;
const UserModel = db.users;

exports.createEmailExists = async (req, res, next) => {
  const u = req.body.user;
  const emailExists = await UserModel.findOne({
    email: u.email,
  }).exec();
  if (emailExists) {
    return res.status(409).send({
      message: `The email ${u.email} already exists.`,
    });
  }
  return next();
};
exports.updateEmailExists = async (req, res, next) => {
  const u = req.body.user;
  const id = req.params.userID;
  const emailExists = await UserModel.findOne({
    email: u.email,
    _id: {
      $ne: id,
    },
  });
  if (emailExists) {
    return res.status(409).send({
      message: `The email ${u.email} already exists.`,
    });
  }
  return next();
};

exports.createPersonNameExists = async (req, res, next) => {
  const p = req.body.person;
  const n = p.name;
  const personNameExists = await PersonModel.findOne({
    name: {
      $and: [
        {
          "name.first": n.first,
        },
        {
          "name.middle": n.middle,
        },
        {
          "name.last": n.last,
        },
      ],
    },
  }).exec();
  if (personNameExists) {
    return res.status(409).send({
      message: `The name ${n.first} ${n.middle} ${n.last} has already been used.`,
    });
  }
  return next();
};
exports.updatePersonNameExists = async (req, res, next) => {
  const p = req.body.person;
  const n = p.name;
  const personID = req.params.personID;
  const personNameExists = await PersonModel.findOne({
    $and: [
      {
        "name.first": n.first,
      },
      {
        "name.middle": n.middle,
      },
      {
        "name.last": n.last,
      },
      {
        _id: {
          $ne: personID,
        },
      },
    ],
  }).exec();
  if (personNameExists) {
    return res.status(409).send({
      message: `The name ${n.first} ${n.middle} ${n.last} has already been used.`,
    });
  }
  return next();
};
