import moment from "moment";

export const getFullName = (person) => {
  const name = person.name;
  const gender = person.gender;
  let fullName =
    (gender === 1 ? "Mr." : "Ms.") + " " + name.first + " " + name.last;
  return fullName;
};

export const getFormattedDate = (date) => {
  return moment(date).calendar();
};

export const getFormattedRole = (role) => {
  let t = "";
  switch (role) {
    case 1:
      t = "Admin";
      break;
    case 2:
      t = "Registrar";
      break;
    case 3:
      t = "Instructor";
      break;
    case 4:
      t = "Student";
      break;
    case 5:
      t = "Guardian";
      break;
    default:
      t = "";
      break;
  }
  return t;
};

export const getFormattedYearLevel = (level, type) => {
  if (type === 1) {
    if (level === 1) {
      return "1st year";
    } else if (level === 2) {
      return "2nd year";
    } else if (level === 3) {
      return "3rd year";
    } else if (level === 4) {
      return "4th year";
    } else {
      return "No grade level";
    }
  } else if (type === 2) {
    if (level === 1) {
      return "Grade 7";
    } else if (level === 2) {
      return "Grade 8";
    } else if (level === 3) {
      return "Grade 9";
    } else if (level === 4) {
      return "Grade 10";
    } else if (level === 5) {
      return "Grade 11";
    } else if (level === 6) {
      return "Grade 12";
    } else {
      return "No grade level";
    }
  } else {
    return "No grade level";
  }
};
export const getFormattedStudentType = (type) => {
  if (type === 1) {
    return "College";
  } else if (type === 2) {
    return "Highschool";
  } else {
    return "";
  }
};

export const getFormmatedSchoolData = (schoolData) => {
  const sy = schoolData.sy;
  const sem = schoolData.sem;
  let semText = sem === 1 ? "1st semester" : sem === 2 ? "2nd semester" : "";
  return `S.Y. ${sy} for ${semText}`;
};

export const getFormattedRecommendationType = (type) => {
  if (type === 1) {
    return "College";
  } else if (type === 2) {
    return "Junior High School";
  } else if (type === 3) {
    return "Senior High School";
  } else return "";
};

export const getFormattedRecommendation = (r) => {
  const l = r.yearLevel;
  const semText =
    r.semester === 1
      ? "1st semester"
      : r.semester === 2
      ? "2nd semester"
      : "No semester";
  if (r.type === 1) {
    const yearText =
      l === 1
        ? "1st year"
        : l === 2
        ? "2nd year"
        : l === 3
        ? "3rd year"
        : l === 4
        ? "4th year"
        : "No year level";
    return `${yearText} | ${semText}`;
  } else if (r.type === 2) {
    const yearText =
      l === 1
        ? "Grade 7"
        : l === 2
        ? "Grade 8"
        : l === 3
        ? "Grade 9"
        : l === 4
        ? "Grade 10"
        : "No grade level";
    return `${yearText} | ${semText}`;
  } else if (r.type === 3) {
    const yearText =
      l === 1 ? "Grade 11" : l === 2 ? "Grade 12" : "No grade level";
    return `${yearText} | ${semText}`;
  } else {
    return "No recommendation";
  }
};
