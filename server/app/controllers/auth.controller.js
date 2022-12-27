const { SECRET_KEY } = require("../constants/configs");
const db = require("../models");
const User = db.users;
const PersonModel = db.persons;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const otpGenerator = require("otp-generator");

exports.authenticate = async (req, res) => {
  const userId = req.userId;
  let user = await User.findOne({
    _id: userId,
  }).exec();
  if (!user) {
    return res.status(401).send({
      message: "Credentials are invalid. Please login again.",
    });
  }
  let person = await PersonModel.findOne({
    user: user._id,
  })
    .populate({
      path: "user",
    })
    .exec();
  if (!person) {
    return res.status(401).send({
      message: "Credentials are invalid. Please login again.",
    });
  }
  return res.status(200).send({
    message: "Credentials are valid.",
    data: {
      person: person,
    },
  });
};

exports.registerTemp = (req, res) => {
  const b = req.body;

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: true,
    specialChars: false,
  });

  if (b.role < 1 || b.role > 5) {
    return res.status(400).send({ message: "Role does not exist" });
  }

  const user = new User({
    username: b.username,
    password: bcrypt.hashSync(b.password, 8),
    email: b.email,
    role: b.role, // either 2, 3, 4, 5
    otp: otp,
    activated: false,
    locked: false,
  });

  //TODO: CREATE NOTIFICATION BEFORE SENDING

  User.create(user)
    .then((data) => {
      if (!data) {
        return res.status(500).send({ message: "Something went wrong" });
      }
      return res.send({
        message: "User was registered successfully",
      });
    })
    .catch((error) => {
      return res.status(403).send({ message: error.message });
    });
};

exports.createUserAndAssignToPerson = (req, res) => {
  const b = req.body;
  const personID = b.personID;

  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: true,
    specialChars: false,
  });

  if (b.role < 1 || b.role > 5) {
    return res.status(400).send({ message: "Role does not exist" });
  }

  const user = new User({
    username: b.username,
    password: bcrypt.hashSync(b.password, 8),
    email: b.email,
    role: b.role, // either 2, 3, 4, 5
    otp: otp,
    activated: false,
    locked: false,
  });

  //TODO: CREATE NOTIFICATION BEFORE SENDING

  let newUser = User.create(user)
    .then((data) => {
      if (!data) {
        res.status(500).send({ message: "Something went wrong" });
      }
      return data;
    })
    .catch((error) => {
      res.status(403).send({ message: error.message });
    });

  PersonModel.findByIdAndUpdate(personID, { user: newUser._id }).then(
    (data) => {
      if (!data) {
        res.status(500).send({ message: "Something went wrong" });
      } else {
        res.status(200).send({ message: "User assigned to person." });
      }
    }
  );
};

exports.login = async (req, res) => {
  const b = req.body;
  console.log(b);
  let user = await User.findOne({
    username: b.username,
  }).exec();
  if (!user) {
    return res.status(401).send({ message: "Login failed" });
  }

  let person = await PersonModel.findOne({ user: user._id })
    .populate({ path: "user" })
    .exec();
  if (!person) {
    return res.status(401).send({ message: "Login failed" });
  }

  if (!user.isFirstSetup && b.password.length < 5) {
    return res.status(409).send({
      message:
        "The password must be greater than or equal to 5 character in length",
    });
  }

  /* FIRST LOGIN */
  if (!user.activated && user.isFirstSetup) {
    return res.status(203).send({
      message: "User exist and it is his/her first login",
      data: {
        user: user,
        type: "first login",
        person: person,
      },
    });
  }

  /* LOGIN */
  const passwordIsValid = bcrypt.compareSync(b.password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send({
      message: "User does not exist",
    });
  }
  const token = jwt.sign({ id: user._id }, SECRET_KEY, {
    expiresIn: 86400, // 24hours
  });

  return res.status(200).send({
    data: {
      type: "login",
      user: user,
      person: person,
      token: token,
    },
    message: "Your credentials are valid",
  });
};

exports.logout = async (req, res, next) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out" });
  } catch (error) {
    next(error);
  }
};

exports.registerFirstSetup = async (req, res) => {
  //? check if user exists with the ID
  //? check length of texts
  //? check if oldUsername must not match the newUsername
  //? check if newUsername exist except the oldUsername
  //? check if newPassword matches the confirmPassword
  //? check if still firstSetup=true and activated=false
  //? check if otp is valid;
  //? update firstSetup=false,activated=true, otp="";
  //? update username and password
  //TODO: SEND SMS/EMAIL AFTER UPDATE
  const b = req.body;
  const userId = req.params.userId;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).send({
      message: "User does not exist",
    });
  }
  if (
    b.oldUsername.length === 0 ||
    b.newUsername.length === 0 ||
    b.newPassword.length === 0 ||
    b.confirmPassword.length === 0 ||
    b.otp.length === 0
  ) {
    return res.status(409).send({
      message: "Please enter the required fields",
    });
  }
  if (b.oldUsername.length < 6) {
    return res.status(400).send({
      message: "Old username must be greater than or equal 6 character length",
    });
  }
  if (b.newUsername.length < 6) {
    return res.status(400).send({
      message: "New username must be greater than or equal 6 character length",
    });
  }
  if (b.oldUsername === b.newUsername) {
    return res.status(400).send({
      message: "Cannot use the old username to be the new username",
    });
  }
  if (b.newPassword.length < 6) {
    return res.status(400).send({
      message: "New password must be greater than or equal 6 character length",
    });
  }
  if (b.confirmPassword.length < 6) {
    return res.status(400).send({
      message:
        "Confirm password must be greater than or equal 6 character length",
    });
  }
  if (b.newPassword !== b.confirmPassword) {
    return res.status(400).send({
      message: "Passwords does not match",
    });
  }
  if (b.otp.length < 6) {
    return res.status(400).send({
      message: "OTP must be greater than or equal 6 character length",
    });
  }
  const userExistsWithUsername = await User.findOne({
    $and: [
      {
        username: b.newUsername,
      },
      {
        $not: {
          _id: userId,
        },
      },
    ],
  }).exec();
  if (userExistsWithUsername) {
    return res.status(409).send({
      message: "Username has been already used",
    });
  }
  if (user.isFirstSetup === false && user.activated === true) {
    return res.status(409).send({
      message: "This user has been activated already",
    });
  }
  if (user.otp !== b.otp) {
    return res.status(409).send({
      message: "OTP is invalid",
    });
  }

  try {
    user.otp = user._id;
    user.isFirstSetup = false;
    user.activated = true;
    user.username = b.newUsername;
    user.password = bcrypt.hashSync(b.newPassword, 8);
    user.save();
    return res.status(200).send({
      message: "User activated!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Something went wrong",
    });
  }
};
