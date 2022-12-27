// This is the maximum school years a student is allowed for this school.
const STUDENT_MAXIMUM_SCHOOL_YEAR_LEVEL = 9;

//? SECTIONS FOR BSIT
const SECTIONS_BSIT = [
  {
    yearLevel: 1,
    description: "A year level for freshmen",
    sections: [
      {
        code: "A",
        name: "Aquarius",
        description: "Section of cool kids in BSIT",
      },
      {
        code: "B",
        name: "Libra",
        description: "Section of smart kids in BSIT",
      },
    ],
  },
  {
    yearLevel: 2,
    description: "A year level for sophomores",
    sections: [
      {
        code: "A",
        name: "Aztec",
        description: "Section of cool kids in BSIT",
      },
      {
        code: "B",
        name: "Gold",
        description: "Section of smart kids in BSIT",
      },
    ],
  },
  {
    yearLevel: 3,
    description: "A year level for juniors",
    sections: [
      {
        code: "A",
        name: "Mist",
        description: "Section of cool kids in BSIT",
      },
      {
        code: "B",
        name: "Air",
        description: "Section of smart kids in BSIT",
      },
    ],
  },
  {
    yearLevel: 4,
    description: "A year level for seniors",
    sections: [
      {
        code: "A",
        name: "Great",
        description: "Section of cool kids in BSIT",
      },
      {
        code: "B",
        name: "Wisdom",
        description: "Section of smart kids in BSIT",
      },
    ],
  },
  {
    yearLevel: 5,
    description: "A year level for engineers",
    sections: [
      {
        code: "A",
        name: "Awesome",
        description: "Section of cool kids in BSIT",
      },
      {
        code: "B",
        name: "Life",
        description: "Section of smart kids in BSIT",
      },
    ],
  },
  {
    yearLevel: -1,
    description: "A year level for irregulars",
    sections: [
      {
        code: "A",
        name: "Seems",
        description: "Section of cool kids in BSIT",
      },
      {
        code: "B",
        name: "Like",
        description: "Section of smart kids in BSIT",
      },
    ],
  },
];

//? COURSES
// types: 1 - College, 2 - Junior High School, 3 - Senior High School
const COURSES = [
  {
    type: 1,
    code: "BSIT",
    name: "Bachelor of Science in Information Technology",
  },
  {
    type: 2,
    code: "BSBA",
    name: "Bachelor of Science in Business Administration",
  },
];
const COURSE_BSIT = {
  name: "Bachelor of Science in Information Technology",
  code: "BSIT",
  description: "A course for awesome people.",
  completion: 4, // years to complete,
  maximumSchoolCompletion: 8, // years to complete in same school (QIT)
  minimumSchoolUnits: 180, // number of units minimum
};

const DEPARTMENTS = ["IT", "GE"];

const SUBJECT_TYPES = ["major", "minor", "extra"];

/*
 FOR SUBJECTS
    https://www.ue.edu.ph/mla/p/curriculum.php?c=CIT2019
*/
// types: 1 - College, 2 - Junior High School, 3 - Senior High School
const SUBJECTS = [
  /* Start of 1st year subjects - 1st semester */
  {
    code: "CCP 1101",
    name: "Computer Programming 1",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 1, semester: 1 },
  },
  {
    code: "CIC 1101",
    name: "Introduction to Computing",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 1, semester: 1 },
  },
  {
    code: "CSP 1101",
    name: "Social and Professional Issues in Computing",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 1, semester: 1 },
  },
  {
    code: "MLC 1101",
    name: "Literacy/Civic Welfare/Military Science 1",
    units: 3,
    type: "extra",
    toTake: { type: 1, yearLevel: 1, semester: 1 },
  },
  {
    code: "PPE 1101",
    name: "Physical Education 1",
    units: 2,
    type: "extra",
    toTake: { type: 1, yearLevel: 1, semester: 1 },
  },
  {
    code: "ZGE 1102",
    name: "The Contemporary World",
    units: 3,
    type: "minor",
    toTake: { type: 1, yearLevel: 1, semester: 1 },
  },
  {
    code: "ZGE 1108",
    name: "Understanding Self",
    units: 3,
    type: "minor",
    toTake: { type: 1, yearLevel: 1, semester: 1 },
  },
  /* End of 1st year subjects */
  /* Start OF 1st year subjects - 2nd semester */
  {
    code: "CCP 1102",
    name: "Computer Programming 2",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 1, semester: 2 },
  },
  {
    code: "CDS 1101",
    name: "Data Structures and Algorithms",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 1, semester: 2 },
  },
  {
    code: "CFD 1101",
    name: "Fundamentals of Database Systems",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 1, semester: 2 },
  },
  {
    code: "MLC 1102",
    name: "Literacy/Civic Welfare/Military Science 2",
    units: 3,
    type: "extra",
    toTake: { type: 1, yearLevel: 1, semester: 2 },
  },
  {
    code: "PPE 1102",
    name: "Physical Education 2",
    units: 2,
    type: "extra",
    toTake: { type: 1, yearLevel: 1, semester: 2 },
  },
  {
    code: "ZGE 1104",
    name: "Mathematics in Modern World",
    units: 3,
    type: "minor",
    toTake: { type: 1, yearLevel: 1, semester: 2 },
  },
  {
    code: "ZGE 1105",
    name: "Purposive Communication",
    units: 3,
    type: "minor",
    toTake: { type: 1, yearLevel: 1, semester: 2 },
  },
  {
    code: "ZGE 1106",
    name: "Readings in Philippines History",
    units: 3,
    type: "minor",
    toTake: { type: 1, yearLevel: 1, semester: 2 },
  },
  /* Start of 2nd year - 1st sem */
  {
    code: "CBM 1101",
    name: "Business Process Management",
    units: 3,
    type: "minor",
    toTake: { type: 1, yearLevel: 2, semester: 1 },
  },
  {
    code: "CCP 1103",
    name: "Computer Programming 3",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 2, semester: 1 },
  },
  {
    code: "CDE 1101",
    name: "Applications Development and Emerging Technologies",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 2, semester: 1 },
  },
  {
    code: "CDM 1101",
    name: "Discrete Mathematics for ITE",
    units: 3,
    type: "minor",
    toTake: { type: 1, yearLevel: 2, semester: 1 },
  },
  {
    code: "CIT 2101",
    name: "Application of Statistics in IT",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 2, semester: 1 },
  },
  {
    code: "CIT 2102",
    name: "Hardware, Software, and Peripherals",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 2, semester: 1 },
  },
  {
    code: "PPE 1103",
    name: "Physical Education 3",
    units: 2,
    type: "extra",
    toTake: { type: 1, yearLevel: 2, semester: 1 },
  },
  /* End of 2nd year - 1st sem*/

  /* Start of 2nd year - 2nd sem */
  {
    code: "CDT 1101",
    name: "Data Analytics",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 2, semester: 2 },
  },
  {
    code: "CHC 1101",
    name: "Human Computer Interaction",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 2, semester: 2 },
  },
  {
    code: "CIA 1101",
    name: "Information Assurance Security 1",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 2, semester: 2 },
  },
  {
    code: "CIP 1101",
    name: "Integrative Programming and Technologies 1",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 2, semester: 2 },
  },
  {
    code: "CIT 2201",
    name: "Networking 1",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 2, semester: 2 },
  },
  {
    code: "CSA 1101",
    name: "Systems Analysis, Design and Prototyping",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 2, semester: 2 },
  },
  {
    code: "PPE 1104",
    name: "Physical Education 4",
    units: 2,
    type: "extra",
    toTake: { type: 1, yearLevel: 2, semester: 2 },
  },
  {
    code: "ZGE EL01",
    name: "GE Elective 1",
    units: 3,
    type: "minor",
    toTake: { type: 1, yearLevel: 2, semester: 2 },
  },
  /* End of 2nd year - 2nd sem */

  /* Start of 3rd year - 1st sem */
  {
    code: "CIA 1102",
    name: "Information Assurance and Security 2",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 3, semester: 1 },
  },
  {
    code: "CIT 3101",
    name: "Networking 2",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 3, semester: 1 },
  },
  {
    code: "CIT 3102",
    name: "Systems Integration and Architecture",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 3, semester: 1 },
  },
  {
    code: "CIT EL01",
    name: "Professional Elective 1",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 3, semester: 1 },
  },
  {
    code: "CMR 1101",
    name: "Methods of Research for IT/IS",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 3, semester: 1 },
  },
  {
    code: "CMS 1101",
    name: "Multimedia Systems",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 3, semester: 1 },
  },
  {
    code: "ZGE 1103",
    name: "Ethics",
    units: 3,
    type: "minor",
    toTake: { type: 1, yearLevel: 3, semester: 1 },
  },
  {
    code: "ZGE 1109",
    name: "Life and Works of Rizal",
    units: 3,
    type: "minor",
    toTake: { type: 1, yearLevel: 3, semester: 1 },
  },
  /* End of 3rd year - 1st sem */

  /* Start of 3rd year - 2nd sem */
  {
    code: "CIT 3201",
    name: "Networking 3",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 3, semester: 2 },
  },
  {
    code: "CIT EL02",
    name: "Professional Elective 2",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 3, semester: 2 },
  },
  {
    code: "CNA 1101",
    name: "Numerical Analysis for ITE",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 3, semester: 2 },
  },
  {
    code: "CPP 4980",
    name: "Capstone Project and Research 1",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 3, semester: 2 },
  },
  {
    code: "ZGE 1101",
    name: "Art Appreciation",
    units: 3,
    type: "minor",
    toTake: { type: 1, yearLevel: 3, semester: 2 },
  },
  {
    code: "ZGE 1107",
    name: "Science, Technology, and Society",
    units: 3,
    type: "minor",
    toTake: { type: 1, yearLevel: 3, semester: 2 },
  },
  {
    code: "ZGE EL02",
    name: "GE Elective 2",
    units: 3,
    type: "minor",
    toTake: { type: 1, yearLevel: 3, semester: 2 },
  },
  {
    code: "ZPD 1102",
    name: "Effective Communication with Personality Development",
    units: 3,
    type: "minor",
    toTake: { type: 1, yearLevel: 3, semester: 2 },
  },
  /* End of 3rd year - 2nd sem */

  /* End of 4th year - 1st sem */
  {
    code: "CIT 4101",
    name: "Certification Course",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 4, semester: 1 },
  },
  {
    code: "CIT 4102",
    name: "System Administration and Maintenance",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 4, semester: 1 },
  },
  {
    code: "CIT EL03",
    name: "Professional Elective 3",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 4, semester: 1 },
  },
  {
    code: "CIT EL04",
    name: "Professional Elective 4",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 4, semester: 1 },
  },
  {
    code: "CPD 4990",
    name: "Caponse Project and Research 2",
    units: 3,
    type: "major",
    toTake: { type: 1, yearLevel: 4, semester: 1 },
  },
  {
    code: "CQM 1101",
    name: "Quantitative Methods (including Modeling and Simulation)",
    units: 3,
    type: "minor",
    toTake: { type: 1, yearLevel: 4, semester: 1 },
  },
  {
    code: "ZGE EL03",
    name: "GE Elective 3",
    units: 3,
    type: "minor",
    toTake: { type: 1, yearLevel: 4, semester: 1 },
  },
  /* End of 4th year - 1st sem */

  /* Start of 4th year - 2nd sem */
  {
    code: "CPR 4970",
    name: "Practicum for IT/IS",
    units: 6,
    type: "major",
    toTake: { type: 1, yearLevel: 4, semester: 2 },
  },
  /* End of 4th year - 2nd sem */
];

const GRADING_SYSTEM_PER_SEM_V1 = [
  {
    min: 96,
    max: 100,
    point: 1.0,
  }, //? 1.0
  {
    min: 90,
    max: 95,
    point: 1.25,
  }, //? 1.25
  {
    min: 85,
    max: 89,
    point: 1.5,
  }, //? 1.5
  {
    min: 80,
    max: 84,
    point: 1.75,
  }, //? 1.75
  {
    min: 75,
    max: 79,
    point: 2.0,
  }, //? 2.0
  {
    min: 70,
    max: 74,
    point: 2.25,
  }, //? 2.25
  {
    min: 65,
    max: 69,
    point: 2.5,
  }, //? 2.5
  {
    min: 60,
    max: 64,
    point: 2.75,
  }, //? 2.75
  {
    min: 55,
    max: 59,
    point: 3.0,
  }, //? 3.0
  {
    min: 50,
    max: 54,
    point: 3.25,
  }, //? 3.25
  {
    min: 45,
    max: 49,
    point: 3.5,
  }, //? 3.0
  {
    min: 40,
    max: 44,
    point: 3.75,
  }, //? 3.0
  {
    min: 35,
    max: 39,
    point: 4.0,
  }, //? 4.0
  {
    min: 30,
    max: 34,
    point: 4.25,
  }, //? 4.25
  {
    min: 25,
    max: 29,
    point: 4.5,
  }, //? 4.5
  {
    min: 20,
    max: 24,
    point: 4.75,
  }, //? 4.75
  {
    min: 0,
    max: 19,
    point: 5.0,
  }, //? 5.0
];
const ROOMS = [
  "101",
  "102",
  "103",
  "104",
  "105",
  "106",
  "C101",
  "C102",
  "C103",
  "T101",
  "T102",
  "S101",
  "S102",
  "201",
  "202",
  "203",
  "204",
  "205",
  "301",
  "302",
  "303",
  "304",
  "401",
  "402",
  "403",
  "405",
];

module.exports = {
  STUDENT_MAXIMUM_SCHOOL_YEAR_LEVEL,
  COURSE_BSIT,
  SECTIONS_BSIT,
  DEPARTMENTS,
  SUBJECTS,
  ROOMS,
  COURSES,
  GRADING_SYSTEM_PER_SEM: GRADING_SYSTEM_PER_SEM_V1,
};
