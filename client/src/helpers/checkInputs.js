export const checkStudentCreation = (userData, personData, studentData) => {
  let check =
    userEmailMissingOrIvalid(userData) ||
    nameMissingOrInvalid(personData.name) ||
    studentDataIsMissing(studentData) ||
    mobileNumberIsInvalidOrMissing(personData);
  return check;
};

export const userEmailMissingOrIvalid = (userData) => {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (userData.username === "") {
    return "Please make sure to fill in the username field";
  }
  if (userData.email === "") {
    return "Please make sure to fill in the email field";
  }
  if (!userData.email.match(pattern)) {
    return "Please make sure the email you entered is valid";
  }
  return "";
};
export const nameMissingOrInvalid = (name) => {
  if (name.first === "") {
    return "Please make sure the first name is filled";
  } else if (name.last === "") {
    return "Please make sure the last name is filled";
  } else {
    return "";
  }
};

export const studentDataIsMissing = (studentData) => {
  if (studentData.studentType === 0) {
    return "Please make sure the student is either in college | senior highschool | junior highschool";
  } else if (studentData.course === "") {
    return "Please make sure a course for this student is selected";
  } else if (studentData.yearLevel === 0) {
    return "Please make sure a year level for this student is selected.";
  } else return "";
};
export const mobileNumberIsInvalidOrMissing = (personData) => {
  if (personData.mobileNumber === "") {
    return "Please make sure the mobile number is not missing";
  }
  const pattern = /^(09|\+639)\d{9}$/;
  if (!personData.mobileNumber.match(pattern)) {
    return "Please make sure you enter a valid mobile number.";
  }
  return "";
};
