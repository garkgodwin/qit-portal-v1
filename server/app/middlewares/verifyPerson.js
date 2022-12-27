const db = require("../models");
const PersonModel = db.persons;

checkPersonExists = (req, res, next) => {
  PersonModel.findById(req.bod.personID)
    .then((data) => {
      if (data) {
        return next();
      } else {
        return res.status(500).send({
          message: "Something went wrong.",
          error: error,
        });
      }
    })
    .catch((error) => {
      return res.status(500).send({
        message: "Something went wrong.",
        error: error,
      });
    });
};

module.exports = {
  checkPersonExists,
};
