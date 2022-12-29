const db = require("../models");
const PersonModel = db.persons;
const UserModel = db.users;

const isUsernameValidAndUnique = async (username, type, userID) => {
  if (username === "") {
    return {
      status: 409,
      message: "The username is missing",
    };
  }

  //? Type = 1 is for creation
  if (type === 1) {
    const usernameExists = await UserModel.findOne({
      username: username,
    });
    if (usernameExists) {
      return {
        status: 409,
        message: "The username has already been used.",
      };
    }
    return {
      status: 200,
      message: "Username is all good to use for creation.",
    };
  } else if (type === 2) {
    const usernameExists = await UserModel.findOne({
      $and: [
        {
          username: username,
        },
        {
          _id: { $ne: userID },
        },
      ],
    });
    if (usernameExists) {
      return {
        status: 409,
        message: "The username has already been used.",
      };
    }
    return {
      status: 200,
      message: "Username is all good to use for update.",
    };
  }

  return {
    status: 409,
    message: "To use the check helper, please fill in the 'type' paramater",
  };
};
const isEmailValidAndUnique = async (email, type, userID) => {
  if (email === "") {
    return {
      status: 409,
      message: "The email is missing",
    };
  }

  //? Type = 1 is for creation
  if (type === 1) {
    const emailExists = await UserModel.findOne({
      email: email,
    });
    if (emailExists) {
      return {
        status: 409,
        message: "The email has already been used.",
      };
    }
    return {
      status: 200,
      message: "Email is all good to use for creation.",
    };
  } else if (type === 2) {
    const emailExists = await UserModel.findOne({
      $and: [
        {
          email: email,
        },
        {
          _id: { $ne: userID },
        },
      ],
    });
    if (emailExists) {
      return {
        status: 409,
        message: "The email has already been used.",
      };
    }
    return {
      status: 200,
      message: "Email is all good to use for update.",
    };
  }
  return {
    status: 409,
    message: "To use the check helper, please fill in the 'type' paramater",
  };
};
const isNameValidAndUnique = async (name, type, personID) => {
  if (name.first === "" || name.last === "") {
    return {
      status: 409,
      message: "First and last names must be filled.",
    };
  }
  if (type === 1) {
    const fullNameExists = await PersonModel.findOne({
      $and: [
        { "name.first": name.first },
        { "name.middle": name.middle },
        { "name.last": name.last },
        { "name.extension": name.extension },
      ],
    });
    if (fullNameExists) {
      return {
        status: 409,
        message: "Full name has already been used",
      };
    }
    return {
      status: 200,
      message: "Name is all good for creation",
    };
  } else if (type === 2) {
    const fullNameExists = await PersonModel.findOne({
      $and: [
        { "name.first": name.first },
        { "name.middle": name.middle },
        { "name.last": name.last },
        { "name.extension": name.extension },
        { _id: { $ne: personID } },
      ],
    });
    if (fullNameExists) {
      return {
        status: 409,
        message: "Full name has already been used",
      };
    }
    return {
      status: 200,
      message: "Name is all good for update",
    };
  }

  return {
    status: 409,
    message: "To use the check helper, please fill in the 'type' paramater",
  };
};
const isMobileNumberValidAndUnique = async (mobileNumber, type, personID) => {
  if (mobileNumber === "" || mobileNumber.length > 13) {
    return {
      status: 409,
      message: "Mobile number must be filled right.",
    };
  }

  if (type === 1) {
    const mobileNumberExists = await PersonModel.findOne({
      mobileNumber: mobileNumber,
    });

    if (mobileNumberExists) {
      return {
        status: 409,
        message: "Mobile number has already been used",
      };
    }
    return {
      status: 200,
      message: "Mobiel number is all good for creation",
    };
  } else if (type === 2) {
    const mobileNumberExists = await PersonModel.findOne({
      $and: [{ mobileNumber: mobileNumber }, { _id: { $ne: personID } }],
    });
    if (mobileNumberExists) {
      return {
        status: 409,
        message: "Mobile number has already been used",
      };
    }
    return {
      status: 200,
      message: "Mobile number is all good for update",
    };
  }

  return {
    status: 409,
    message: "To use the check helper, please fill in the 'type' paramater",
  };
};

exports.isStudentValidForCreation = async (
  type,
  username,
  email,
  name,
  mobileNumber
) => {
  let check = await isUsernameValidAndUnique(username, type);
  if (check.status === 200) {
    check = await isEmailValidAndUnique(email, type);
    if (check.status === 200) {
      check = await isNameValidAndUnique(name, type);
      if (check.status === 200) {
        check = await isMobileNumberValidAndUnique(mobileNumber, type);
        if (check.status === 200) {
          return {
            status: 200,
            message: "Student is valid for creation or update",
          };
        }
      }
    }
  }
  return {
    status: 409,
    message: check.message,
  };
};

exports.isStudentValidForUpdate = async (
  type,
  personID,
  name,
  mobileNumber
) => {
  let check = await isNameValidAndUnique(name, type, personID);
  if (check.status === 200) {
    check = await isMobileNumberValidAndUnique(mobileNumber, type, personID);
    if (check.status === 200) {
      return {
        status: 200,
        message: "Student is valid for creation or update",
      };
    }
  }

  return {
    status: 409,
    message: check.message,
  };
};

exports.isGuardianValidForCreation = async (
  type,
  username,
  email,
  name,
  mobileNumber
) => {
  let check = await isUsernameValidAndUnique(username, type);
  if (check.status === 200) {
    check = await isEmailValidAndUnique(email, type);
    if (check.status === 200) {
      check = await isNameValidAndUnique(name, type);
      if (check.status === 200) {
        check = await isMobileNumberValidAndUnique(mobileNumber, type);
        if (check.status === 200) {
          return {
            status: 200,
            message: "Guardian is valid for creation or update",
          };
        }
      }
    }
  }
  return {
    status: 409,
    message: check.message,
  };
};
