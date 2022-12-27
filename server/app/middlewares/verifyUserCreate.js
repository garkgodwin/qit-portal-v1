const db = require("../models");
const User = db.users;
//helpers
const checkObject = require("../helpers/checkObject");

checkDuplicateUsernameOrEmail = (req, res, next) => {
  req.verificationResult = "";
  req.verificationStatus = 200;
  const b = req.body;
  if (checkObject.isEmpty(b)) {
    req.verificationResult = "No input found";
    req.verificationStatus = 400;
    return next();
  }

  if (!b.username || !b.password || !b.email || !b.role) {
    req.verificationResult = "Required fields are empty";
    req.verificationStatus = 400;
    return next();
  }

  User.findOne({ username: req.body.username })
    .then((data) => {
      if (data) {
        req.verificationResult = "Failed! Username is already in use.";
        req.verificationStatus = 400;
      }
      return next();
    })
    .catch((error) => {
      console.log(error);
      req.verificationResult = error;
      req.verificationStatus = 500;
      return next();
    });
  User.findOne({ email: req.body.email })
    .then((data) => {
      if (data) {
        req.verificationResult = "Failed! Username is already in use.";
        req.verificationStatus = 400;
      }
      return next();
    })
    .catch((error) => {
      console.log(error);
      req.verificationResult = error;
      req.verificationStatus = 500;
      return next();
    });
};

checkDuplicateEmail = (req, res, next) => {
  req.verificationResult = "";
  req.verificationStatus = 200;
  const b = req.body.user;
  if (checkObject.isEmpty(b)) {
    req.verificationResult = "No input found";
    req.verificationStatus = 400;
    next();
  }

  if (!b.email) {
    req.verificationResult = "Required fields are empty";
    req.verificationStatus = 400;
    next();
  }

  User.findOne({ email: b.email })
    .then((data) => {
      if (data) {
        req.verificationResult = "Failed! Email is already in use.";
        req.verificationStatus = 400;
      }
      next();
    })
    .catch((error) => {
      req.verificationResult = error;
      req.verificationStatus = 500;
      next();
    });
};

checkDuplicateUsername = (req, res, next) => {
  req.verificationResult = "";
  req.verificationStatus = 200;
  const b = req.body.user;
  if (checkObject.isEmpty(b)) {
    req.verificationResult = "No input found";
    req.verificationStatus = 400;
    next();
  }

  if (!b.email) {
    req.verificationResult = "Required fields are empty";
    req.verificationStatus = 400;
    next();
  }

  User.findOne({ username: b.username })
    .then((data) => {
      if (data) {
        req.verificationResult = "Failed! Email is already in use.";
        req.verificationStatus = 400;
      }
      next();
    })
    .catch((error) => {
      req.verificationResult = error;
      req.verificationStatus = 500;
      next();
    });
};

//TODO: ADD MORE

module.exports = {
  checkDuplicateUsernameOrEmail,
  checkDuplicateEmail,
  checkDuplicateUsername,
};
