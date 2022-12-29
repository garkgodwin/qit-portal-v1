import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "../../components/forms/Form";
import { checkStudentCreation } from "../../helpers/checkInputs";

//? GLOBAL STATES
import { append, update } from "../../features/dataSlice";
import { showToast } from "../../features/toastSlice";
import { startFormLoading, stopFormLoading } from "../../features/loadingSlice";

//? API
import {
  createNewStudent,
  getStudentDetailsForUpdate,
  updateStudentDetails,
  createNewGuardian,
} from "../../api/student";
import { getCurrentSchoolData } from "../../api/school";

const StudentsForm = () => {
  const [formType, setFormType] = useState("");
  const [canUpdateStudentDetails, setCanUpdateStudentDetails] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });
  const [guardianData, setGuardianData] = useState({
    guardianType: 1,
  });
  const [studentData, setStudentData] = useState({
    studentType: 1,
    course: "",
    yearLevel: 0,
    section: "A",
  });
  const [personData, setPersonData] = useState({
    name: {
      title: "",
      first: "",
      middle: "",
      last: "",
      extension: "",
    },
    age: 0,
    birthDate: new Date().toISOString().substring(0, 10),
    gender: 1,
    mobileNumber: "",
  });

  useEffect(() => {
    if (data.selectedData !== null) {
      if (data.selectedType === "student-update-details") {
        fetchCurrentSchoolData();
        setFormType("student-update");
        fetchStudentDetailsForUpdate();
      } else if (data.selectedType === "student-add-guardian") {
        setFormType("student-create-guardian");
      }
    } else {
      setFormType("student-create");
    }
  }, [data]);

  //? This block of code will help to check whether we should show student details or not.
  const fetchCurrentSchoolData = async () => {
    const result = await getCurrentSchoolData();
    console.log(result);
    if (result.status === 200) {
      setCanUpdateStudentDetails(false);
    } else {
      setCanUpdateStudentDetails(true);
    }
  };
  //? This block of code will fetch the students details for update
  const fetchStudentDetailsForUpdate = async () => {
    dispatch(startFormLoading());
    const result = await getStudentDetailsForUpdate(data.selectedData);
    if (result.status === 200) {
      const student = result.data;
      const person = student.person;
      const cd = student.currentSchoolData;
      if (cd.current && !cd.locked) {
        // update person details only
      } else {
        // can update student details as well
        setStudentData({
          studentType: student.studentType,
          course: student.course,
          yearLevel: student.yearLevel,
          section: student.section,
        });
      }
      setPersonData({
        name: person.name,
        age: person.age,
        birthDate: person.birthDate,
        gender: person.gender,
        mobileNumber: person.mobileNumber ? person.mobileNumber : "",
      });
    } else {
      navigate("/students");
    }
    dispatch(stopFormLoading());
  };

  //? when the student type changes, the other student details will be reverted back to 'None'
  useEffect(() => {
    setStudentData({
      ...studentData,
      course: "",
      yearLevel: 0,
    });
  }, [studentData.studentType]);

  //? This block will navigate back to the home of students
  const handleCancel = () => {
    navigate("/students");
  };

  /* This block will handle the submit button:
    1. Create student
    2. Update student
    3. New Guardian
  */
  const handleSubmit = async () => {
    console.log(data.selectedType);
    dispatch(startFormLoading());
    if (data.selectedData === null) {
      //? CREATE NEW STUDENT
      const check = checkStudentCreation(userData, personData, studentData);
      if (check !== "") {
        dispatch(
          showToast({
            body: check,
          })
        );
      } else {
        const inputs = {
          user: userData,
          person: personData,
          student: studentData,
        };
        const result = await createNewStudent(inputs);
        dispatch(
          showToast({
            body: result.message,
          })
        );
        if (result.status === 200) {
          dispatch(
            append({
              removeAppend: "student",
              data: result.data.student,
            })
          );
          dispatch(
            append({
              removeAppend: "account",
              data: result.data.user,
            })
          );
          navigate("/students");
        }
      }
    } else {
      //? check what to do - maybe it is not update
      if (data.selectedType === "student-update-details") {
        const inputs = {
          student: studentData,
          person: personData,
        };
        const result = await updateStudentDetails(data.selectedData, inputs);
        dispatch(
          showToast({
            body: result.message,
          })
        );
        if (result.status === 200) {
          dispatch(
            update({
              updateType: "student",
              data: result.data,
            })
          );
          navigate("/students");
        }
      } else if (data.selectedType === "student-add-guardian") {
        const inputs = {
          user: userData,
          person: personData,
          guardian: guardianData,
        };
        const result = await createNewGuardian(data.selectedData, inputs);
        dispatch(
          showToast({
            body: result.message,
          })
        );
        if (result.status === 200) {
          dispatch(
            update({
              updateType: "student",
              data: result.data,
            })
          );
        }
      }
    }
    dispatch(stopFormLoading());
  };

  const showUserFields = () => {
    if (
      formType === "student-create" ||
      formType === "student-create-guardian"
    ) {
      // it means for creationg
      return userFields();
    }
  };
  const showStudentFields = () => {
    if (
      formType === "student-create" ||
      (formType === "student-update" && canUpdateStudentDetails)
    ) {
      return studentFields;
    }
  };
  const showPersonFields = () => {
    if (
      formType === "student-create" ||
      formType === "student-update" ||
      formType === "student-create-guardian"
    )
      return personFields();
  };

  const userFields = () => {
    return (
      <div className="input-fields">
        <span className="input-fields-title">User information</span>
        <div className="input-field">
          <label>Username</label>
          <input
            type="text"
            placehoder="username"
            value={userData.username}
            onChange={(e) => {
              setUserData({
                ...userData,
                username: e.target.value,
              });
            }}
          />
        </div>
        <div className="input-field">
          <label>Email</label>
          <input
            type="email"
            placehoder="email"
            value={userData.email}
            onChange={(e) => {
              setUserData({
                ...userData,
                email: e.target.value,
              });
            }}
          />
        </div>
        {formType === "student-create-guardian" && (
          <div className="input-field">
            <label>Guardian Type</label>
            <select
              value={guardianData.guardianType}
              onChange={(e) => {
                setGuardianData({
                  ...guardianData,
                  guardianType: parseInt(e.target.value),
                });
              }}
            >
              <option value={1}>Father</option>
              <option value={2}>Mother</option>
              <option value={3}>Other</option>
            </select>
          </div>
        )}
      </div>
    );
  };
  const studentFields = () => {
    return (
      <div className="input-fields">
        <span className="input-fields-title">Student information</span>
        <div className="input-field">
          <label>Student is</label>
          <select
            value={studentData.studentType}
            onChange={(e) => {
              setStudentData({
                ...studentData,
                studentType: parseInt(e.target.value),
              });
            }}
          >
            <option value={1}>College</option>
            <option value={2}>Senior Highschool</option>
            <option value={3}>Junior Highschool</option>
          </select>
        </div>
        <div className="input-field">
          <label>Course</label>
          <select
            value={studentData.course}
            onChange={(e) => {
              setStudentData({
                ...studentData,
                course: e.target.value,
              });
            }}
          >
            <option value={""}>None</option>
            {studentData.studentType === 1 ? (
              <>
                <option value={"BSIT"}>BSIT</option>
                <option value={"BSBA"}>BSBA</option>
              </>
            ) : studentData.studentType === 2 ? (
              <>
                <option value="Programming">Programming</option>
              </>
            ) : studentData.studentType === 3 ? (
              <option value="TLE">TLE</option>
            ) : null}
          </select>
        </div>
        <div className="input-field">
          <label>Year Level</label>
          <select
            value={studentData.yearLevel}
            onChange={(e) => {
              setStudentData({
                ...studentData,
                yearLevel: parseInt(e.target.value),
              });
            }}
          >
            <option value={0}>None</option>
            {studentData.studentType === 1 ? (
              <>
                <option value={1}>1st year</option>
                <option value={2}>2nd year</option>
                <option value={3}>3rd year</option>
                <option value={4}>4th year</option>
              </>
            ) : studentData.studentType === 2 ? (
              <>
                <option value={1}>Grade 11</option>
                <option value={2}>Grade 12</option>
              </>
            ) : studentData.studentType === 3 ? (
              <>
                <option value={1}>Grade 7</option>
                <option value={2}>Grade 8</option>
                <option value={3}>Grade 9</option>
                <option value={4}>Grade 10</option>
              </>
            ) : null}
          </select>
        </div>
        <div className="input-field">
          <label>Section</label>
          <select
            value={studentData.section}
            onChange={(e) => {
              setStudentData({
                ...studentData,
                section: e.target.value,
              });
            }}
          >
            <option value={"A"}>Section A</option>
            <option value={"B"}>Section B</option>
          </select>
        </div>
      </div>
    );
  };
  const personFields = () => {
    return (
      <div className="input-fields">
        <span className="input-fields-title">Personal information</span>
        <div className="input-fields">
          <div className="input-field">
            <label>Title</label>
            <input
              type="text"
              placeholder="e.g: MIT, MBA"
              value={personData.name.title}
              onChange={(e) => {
                setPersonData({
                  ...personData,
                  name: {
                    ...personData.name,
                    title: e.target.value,
                  },
                });
              }}
            />
          </div>
          <div className="input-field">
            <label>First name</label>
            <input
              type="text"
              placeholder="e.g: John, Jane"
              value={personData.name.first}
              onChange={(e) => {
                setPersonData({
                  ...personData,
                  name: {
                    ...personData.name,
                    first: e.target.value,
                  },
                });
              }}
            />
          </div>
          <div className="input-field">
            <label>Middle name</label>
            <input
              type="text"
              placeholder="e.g: Paumar"
              value={personData.name.middle}
              onChange={(e) => {
                setPersonData({
                  ...personData,
                  name: {
                    ...personData.name,
                    middle: e.target.value,
                  },
                });
              }}
            />
          </div>
          <div className="input-field">
            <label>Last name</label>
            <input
              type="text"
              placeholder="e.g: Pamor"
              value={personData.name.last}
              onChange={(e) => {
                setPersonData({
                  ...personData,
                  name: {
                    ...personData.name,
                    last: e.target.value,
                  },
                });
              }}
            />
          </div>
          <div className="input-field">
            <label>.ext</label>
            <input
              type="text"
              placeholder="e.g: Jr. Sr."
              value={personData.name.extension}
              onChange={(e) => {
                setPersonData({
                  ...personData,
                  name: {
                    ...personData.name,
                    extension: e.target.value,
                  },
                });
              }}
            />
          </div>
        </div>
        <div className="input-field">
          <label>Age</label>
          <input
            type="number"
            placeholder="e.g: 23, 52"
            value={personData.age}
            onChange={(e) => {
              setPersonData({
                ...personData,
                age: parseInt(e.target.value),
              });
            }}
          />
        </div>
        <div className="input-field">
          <label>Birth Date</label>
          <input
            type="date"
            value={personData.birthDate}
            onChange={(e) => {
              setPersonData({
                ...personData,
                birthDate: e.target.value,
              });
            }}
          />
        </div>
        <div className="input-field">
          <label>Gender</label>
          <select
            value={personData.gender}
            onChange={(e) => {
              setPersonData({
                ...personData,
                gender: parseInt(e.target.value),
              });
            }}
          >
            <option value={1}>Male</option>
            <option value={0}>Female</option>
          </select>
        </div>
        <div className="input-field">
          <label>Mobile Number</label>
          <input
            type="text"
            placeholder="e.g: 09362101653"
            value={personData.mobileNumber}
            onChange={(e) => {
              setPersonData({
                ...personData,
                mobileNumber: e.target.value,
              });
            }}
          />
        </div>
      </div>
    );
  };
  return (
    <>
      <Form>
        <div className="form-title">
          <h1>Student Form</h1>
        </div>
        <div className="form-body">
          {showUserFields()}
          {showStudentFields()}
          {showPersonFields()};
        </div>
        <div className="form-functions">
          <button
            className="form-function"
            onClick={(e) => {
              e.preventDefault();
              handleCancel();
            }}
          >
            Cancel
          </button>
          <button
            className="form-function"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Submit
          </button>
        </div>
      </Form>
    </>
  );
};

export default StudentsForm;
