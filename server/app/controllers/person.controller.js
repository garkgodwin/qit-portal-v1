const e = require("express");
const handleErrors = require("../helpers/checkError");
const db = require("../models");
const User = db.users;
const Person = db.persons;

exports.createNewPerson = async (p, userID) => {
  let message = "";
  let status = 500;
  let {
    name,
    gender,
    age,
    birthDate,
    address1,
    address2,
    mobileNumber,
    telephoneNumber,
  } = p;
  gender = parseInt(gender);
  age = parseInt(age);
  birthDate = new Date(birthDate);
  let person = new Person({
    name: name,
    age: age,
    birthDate: birthDate,
    gender: gender,
    address1: address1,
    address2: address2,
    mobileNumber: mobileNumber,
    telephoneNumber: telephoneNumber,
    user: userID,
  });
  await person.save();
  if (person) {
    person = await person.populate("user");
    if (person) {
      status = 200;
      message = "Success";
    } else {
      status = 500;
      message = "Something went wrong";
    }
  } else {
    status = 500;
    message = "Something went wrong";
  }
  return {
    status,
    message,
    newPerson: person,
  };
};
