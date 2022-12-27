const db = require("../models");
const handleErrors = require("./checkError");
const PersonModel = db.persons;
const UserModel = db.users;

exports.checkDuplicateName = async (name) => {
  let message = "";
  let status = 500;
  if (Object.keys(name).length === 0) {
    message = "No input found";
    status = 400;
  } else {
    if (!name.first || !name.last) {
      message = "Required fields are empty";
      status = 400;
    } else {
      await PersonModel.findOne({
        $and: [
          {
            "name.first": name.first,
          },
          {
            "name.middle": name.middle,
          },
          {
            "name.last": name.last,
          },
          {
            "name.extension": name.extension,
          },
        ],
      })
        .then((data) => {
          if (data) {
            message = "Full name is already used";
            status = 400;
          } else {
            message = "Person with this full name does not exist";
            status = 200;
          }
        })
        .catch((error) => {
          const newError = handleErrors(error);
          message = newError.message;
          status = newError.status;
        });
    }
  }
  return {
    message,
    status,
  };
};

exports.checkDuplicateEmail = async (email) => {
  let message = "";
  let status = 500;
  await UserModel.findOne({ email: email })
    .then((data) => {
      if (data) {
        message = "Email is already used";
        status = 400;
      } else {
        message = "Person with this email does not exist";
        status = 200;
      }
    })
    .catch((error) => {
      const newError = handleErrors(error);
      message = newError.message;
      status = newError.status;
    });
  return {
    message,
    status,
  };
};

exports.checkDuplicateNameUpdate = async (newName, oldName) => {
  let message = "";
  let status = 500;
  if (newName === oldName) {
    return {
      message: "Same name",
      status: 200,
    };
  }
  let name = newName;
  if (Object.keys(name).length === 0) {
    message = "No input found";
    status = 400;
  } else {
    if (!name.first || !name.last) {
      message = "Required fields are empty";
      status = 400;
    } else {
      await PersonModel.findOne({
        $and: [
          {
            "name.first": name.first,
          },
          {
            "name.middle": name.middle,
          },
          {
            "name.last": name.last,
          },
          {
            "name.extension": name.extension,
          },
        ],
      })
        .then((data) => {
          if (data) {
            message = "Full name is already used";
            status = 400;
          } else {
            message = "Person with this full name does not exist";
            status = 200;
          }
        })
        .catch((error) => {
          const newError = handleErrors(error);
          message = newError.message;
          status = newError.status;
        });
    }
  }
  return {
    message,
    status,
  };
};

exports.checkDuplicateEmailUpdate = async (newEmail, oldEmail) => {
  let message = "";
  let status = 500;
  if (newEmail === oldEmail) {
    message = "Same email";
    status = 200;
  } else {
    await UserModel.findOne({ email: email })
      .then((data) => {
        if (data) {
          message = "Email is already used";
          status = 400;
        } else {
          message = "Person with this email does not exist";
          status = 200;
        }
      })
      .catch((error) => {
        const newError = handleErrors(error);
        message = newError.message;
        status = newError.status;
      });
  }
  return {
    message,
    status,
  };
};
