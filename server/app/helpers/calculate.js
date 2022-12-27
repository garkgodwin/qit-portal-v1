const db = require("../models");
const { SUBJECTS, GRADING_SYSTEM_PER_SEM } = require("../constants/schoolInfo");

exports.calculateTotalGradesForThisSemAndSY = (grades) => {
  //? get grades per term
  let prelim = [];
  let midterm = [];
  let prefi = [];
  let final = [];
  grades.map((grade) => {
    if (grade.term === 1) {
      prelim.push(grade);
    } else if (grade.term === 2) {
      midterm.push(grade);
    } else if (grade.term === 3) {
      prefi.push(grade);
    } else if (grade.term === 4) {
      final.push(grade);
    }
  });

  //? expand grades on different subjects for each term
  let prelimSubjects = subjectsInTerm(prelim);
  let midtermSubjects = subjectsInTerm(midterm);
  let prefiSubjects = subjectsInTerm(prefi);
  let finalSubjects = subjectsInTerm(final);

  //? get total grades for each term
  let prelimGrade = gradeByTerm(prelimSubjects);
  let midtermGrade = gradeByTerm(midtermSubjects);
  let prefiGrade = gradeByTerm(prefiSubjects);
  let finalGrade = gradeByTerm(finalSubjects);

  let totalGrade =
    (prelimGrade * 0.2 +
      midtermGrade * 0.2 +
      prefiGrade * 0.2 +
      finalGrade * 0.4) *
    100;
  let point = 0;
  GRADING_SYSTEM_PER_SEM.map((range) => {
    if (totalGrade >= range.min && totalGrade <= range.max) {
      point = range.point;
    }
  });
  return {
    totalGrade: totalGrade,
    point: point,
  };

  /*
    Grade caluclation
    quiz = 20%
    activities = 20%
    performance = 10%
    exam = 50%
  */
};

exports.calculateSubjectGrades = (subjectGrades) => {
  let pg = [];
  let mg = [];
  let prg = [];
  let fg = [];

  subjectGrades.map((sg) => {
    if (sg.term === 1) {
      pg.push(sg);
    } else if (sg.term === 2) {
      mg.push(sg);
    } else if (sg.term === 3) {
      prg.push(sg);
    } else if (sg.term === 4) {
      fg.push(sg);
    }
  });

  const prelimGrade = gradeByTerm(pg);
  const midtermGrade = gradeByTerm(mg);
  const prefiGrade = gradeByTerm(prg);
  const finalGrade = gradeByTerm(fg);

  return {
    prelimGrade,
    midtermGrade,
    prefiGrade,
    finalGrade,
  };
};

//? get the grade per term
const gradeByTerm = (termSubjects) => {
  let subTermGrade = 0;
  let subTermUnits = 0;
  termSubjects.map((subject) => {
    let units = 0;
    let code = subject[0].subjectCode;
    let subjectGrade = gradeBySubject(subject);
    for (let i = 0; i < SUBJECTS.length; i++) {
      if (SUBJECTS[i].code === code) {
        units = SUBJECTS[i].units;
        break;
      }
    }
    subTermGrade += subjectGrade * units;
    subTermUnits += units;
  });
  let totalTermGrade = subTermGrade / subTermUnits;
  return totalTermGrade;
};

//? groups the sugbjects for each term
const subjectsInTerm = (termGrades) => {
  let termSubjects = [];
  for (let i = 0; i < termGrades.length === 0; i++) {
    if (termSubjects.length === 0) {
      termSubjects.push([]);
      termSubjects[0].push(termGrades[i]);
    } else {
      let exists = false;
      for (let j = 0; i < termSubjects.length; i++) {
        if (termSubjects[j].subjectCode === termGrades[i].subjectCode) {
          termSubjects[j].push(termGrades[j]);
          exists = true;
          break;
        }
      }
      if (exists) {
        termSubjects.push([termSubjects.length]);
        termSubjects.push(termGrades[i]);
      }
    }
  }
  return termSubjects;
};

//? get the grades of each subject
const gradeBySubject = (subject) => {
  let subjectGrade = 0;
  //? GRADE TYPES
  let quizzes = [];
  let activities = [];
  let performances = [];
  let exams = [];
  //? GRADE TYPES TOTAL GRADES
  let quizGrade = 0;
  let activitiesGrade = 0;
  let performanceGrade = 0;
  let examGrade = 0;
  subject.map((grade) => {
    const type = grade.type;
    switch (type) {
      case 1:
        quizzes.push(grade);
        break;
      case 2:
        activities.push(grade);
        break;
      case 3:
        performances.push(grade);
        break;
      case 4:
        exams.push(grade);
        break;
      default:
        break;
    }
  });
  quizzes.map((grade) => {
    const a = grade.achieved;
    const t = grade.total;
    quizGrade += (a / t) * 100;
  });
  quizGrade = quizGrade / quizGrade.length;
  activities.map((grade) => {
    const a = grade.achieved;
    const t = grade.total;
    activitiesGrade += (a / t) * 100;
  });
  activities = activitiesGrade / activities.length;
  performances.map((grade) => {
    const a = grade.achieved;
    const t = grade.total;
    performanceGrade += (a / t) * 100;
  });
  performanceGrade = performanceGrade / performances.length;
  exams.map((grade) => {
    const a = grade.achieved;
    const t = grade.total;
    examGrade += (a / t) * 100;
  });
  examGrade = examGrade / exams.length;
  subjectGrade =
    (quizGrade * 0.2 +
      activitiesGrade * 0.2 +
      performanceGrade * 0.1 +
      examGrade * 0.5) *
    100;

  return subjectGrade;
};
