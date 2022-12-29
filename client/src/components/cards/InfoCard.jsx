import React from "react";
import {
  getFormattedDate,
  getFormattedRole,
  getFormattedStudentType,
  getFormattedYearLevel,
  getFullName,
  getFormmatedSchoolData,
  getFormattedRecommendationType,
  getFormattedRecommendation,
} from "../../helpers/formatText";
import "./InfoCard.css";
import InfoCardField from "./InfoCardField";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { remove, select as selectData } from "../../features/dataSlice";
import { update } from "../../features/dataSlice";
import { showToast } from "../../features/toastSlice";
import { lockOrUnlockAccount } from "../../api/user";
import { removeSubjectGroup } from "../../api/subjectGroup";

const InfoCard = ({ data, type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  /*
  types: 1 - accounts, 2 - staffs, 3 - students , 4 - subjects, 5 - classes
  */

  // Account page actions
  const handleUpdateAccountDetails = () => {
    const user = data;
    dispatch(
      selectData({
        selectedType: "update-account-details",
        data: user._id,
      })
    );
    navigate("/accounts/form");
  };
  const handleLockAccount = async () => {
    const user = data;
    const result = await lockOrUnlockAccount(user._id);
    dispatch(
      showToast({
        body: result.message,
      })
    );
    if (result.status === 200) {
      dispatch(
        update({
          updateType: "account",
          data: result.data,
        })
      );
    }
  };

  // Staff page actions
  const handleUpdatePersonDetails = () => {
    const person = data.person;
    dispatch(
      selectData({
        selectedType: "update-person-details",
        data: person._id,
      })
    );
    navigate("/staffs/form");
  };

  // Student page actions
  const handleUpdateStudentDetails = () => {
    const studentID = data._id;
    dispatch(
      selectData({
        selectedType: "student-update-details",
        data: studentID,
      })
    );
    navigate("/students/form");
  };

  const handleAddGuardian = () => {
    const studentID = data._id;
    dispatch(
      selectData({
        selectedType: "student-add-guardian",
        data: studentID,
      })
    );
    navigate("/students/form");
  };

  const handleViewStudentInfo = () => {
    const studentID = data._id;
    dispatch(
      selectData({
        selectedType: "student-view-info",
        data: studentID,
      })
    );
    navigate("/students/info");
  };

  //? SUBJECTS AND SUBJECT GROUPS
  const handleViewCLassesOfThisSubject = () => {
    const code = data.code;
    dispatch(
      selectData({
        selectedType: "subject",
        data: code,
      })
    );
    navigate("/classes");
  };
  const handleViewSchedulesOfThisSubject = () => {
    const code = data.code;
    dispatch(
      selectData({
        selectedType: "subject",
        data: code,
      })
    );
    navigate("/schedules");
  };

  //? CLASSES
  const handleRemoveClass = async () => {
    const subjectGroupID = data._id;
    const result = await removeSubjectGroup(subjectGroupID);
    dispatch(
      showToast({
        body: result.message,
      })
    );
    if (result.status === 200) {
      dispatch(
        remove({
          removeAppend: "subjectGroup",
          data: data,
        })
      );
    }
  };
  const handleAddStudentToClass = async () => {
    const subjectGroupID = data._id;
    dispatch(
      selectData({
        data: subjectGroupID,
        selectedType: "class-info",
      })
    );
    navigate("/classes/info");
  };
  return (
    <div className="InfoCard">
      {type === 1 || type === 2 ? (
        <>
          <div className="info-card-top">
            {type === 1 && (
              <>
                <InfoCardField text={data.username} title="Username" />
                <InfoCardField text={data.email} title="Email" />
              </>
            )}
            <InfoCardField text={getFormattedRole(data.role)} title="Role" />
            <InfoCardField
              text={data.isFirstSetup ? "Incomplete" : "Complete"}
              title="Completed Setup"
            />
          </div>
          <div className="info-card-mid">
            <InfoCardField text={getFullName(data.person)} title="Name" />
            <InfoCardField text={data.person.age} title="Age" />
            <InfoCardField text={data.person.birthDate} title="Birth Date" />
          </div>
          <div className="info-card-bot">
            <InfoCardField
              text={getFormattedDate(data.createdAt)}
              title="Created Date"
            />
            <InfoCardField
              text={getFormattedDate(data.updatedAt)}
              title="Updated Date"
            />
            {type === 1 ? (
              <>
                <button
                  className="info-card-function"
                  onClick={(e) => {
                    e.preventDefault();
                    handleUpdateAccountDetails();
                  }}
                >
                  Update account details
                </button>
                <button
                  className="info-card-function"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLockAccount();
                  }}
                >
                  {data.locked ? "Unlock account" : "Lock account"}
                </button>
              </>
            ) : type === 2 ? (
              <>
                <button
                  className="info-card-function"
                  onClick={(e) => {
                    e.preventDefault();
                    handleUpdatePersonDetails();
                  }}
                >
                  Update person's details
                </button>
              </>
            ) : null}
          </div>
        </>
      ) : type === 3 ? (
        <>
          <div className="info-card-top">
            <InfoCardField
              text={data.course ? data.course : "No course"}
              title="Course"
            />
            <InfoCardField
              text={getFormattedStudentType(data.studentType)}
              title="Student Status"
            />
            <InfoCardField
              text={getFormattedYearLevel(data.yearLevel, data.studentType)}
              title="Year Level"
            />
            <InfoCardField text={data.section} title="Section" />
            <InfoCardField
              text={getFormmatedSchoolData(data.currentSchoolData)}
              title="Enrolled in"
            />
          </div>
          <div className="info-card-mid">
            <InfoCardField text={getFullName(data.person)} title="Name" />
            <InfoCardField
              text={data.guardians.length}
              title="Number of guardians"
            />
            <button
              className="info-card-function"
              onClick={(e) => {
                e.preventDefault();
                handleAddGuardian();
              }}
            >
              New guardian
            </button>
          </div>
          <div className="info-card-bot">
            <InfoCardField
              text={getFormattedDate(data.createdAt)}
              title="Created Date"
            />
            <InfoCardField
              text={getFormattedDate(data.updatedAt)}
              title="Updated Date"
            />
            {auth.loggedInPerson.user.role === 1 && (
              <>
                <button
                  className="info-card-function"
                  onClick={(e) => {
                    e.preventDefault();
                    handleUpdateStudentDetails();
                  }}
                >
                  Update student details
                </button>
              </>
            )}
            <button
              className="info-card-function"
              onClick={(e) => {
                e.preventDefault();
                handleViewStudentInfo();
              }}
            >
              View student details
            </button>
          </div>
        </>
      ) : type === 4 ? (
        <>
          <div className="info-card-top">
            <InfoCardField text={data.code} title="Subject Code" />
            <InfoCardField
              text={getFormattedRecommendationType(data.toTake.type)}
              title="Students"
            />
            <InfoCardField
              text={getFormattedRecommendation(data.toTake)}
              title="Recommended Year and Semester"
            />
            <InfoCardField text={data.type} title="Subject Type" />
            <InfoCardField text={data.units} title="# of Units" />
          </div>
          <div className="info-card-mid">
            <InfoCardField text={100} title="# of students" />
            <InfoCardField text={4} title="# of instructors" />
            <InfoCardField text={10} title="# of classes" />
          </div>
          <div className="info-card-bot">
            <InfoCardField text={data.name} title="Subject Name" />
            <button
              className="info-card-function"
              onClick={(e) => {
                e.preventDefault();
                handleViewCLassesOfThisSubject();
              }}
            >
              View classes
            </button>
            <button
              className="info-card-function"
              onClick={(e) => {
                e.preventDefault();
                handleViewSchedulesOfThisSubject();
              }}
            >
              View schedules
            </button>
          </div>
        </>
      ) : type === 5 ? (
        <>
          <div className="info-card-top">
            <InfoCardField text={data.subjectCode} title="Subject Code" />
          </div>
          <div className="info-card-mid">
            <InfoCardField
              text={getFullName(data.instructor.person)}
              title="Instructor"
            />
            <InfoCardField text={data.students.length} title="# of students" />
            <InfoCardField
              text={data.schedules.length}
              title="# of schedules"
            />
          </div>
          <div className="info-card-bot">
            <InfoCardField
              text={getFormattedDate(data.createdAt)}
              title="Created Date"
            />
            <InfoCardField
              text={getFormattedDate(data.updatedAt)}
              title="Updated Date"
            />
            <button
              className="info-card-function"
              onClick={(e) => {
                e.preventDefault();
                handleRemoveClass();
              }}
            >
              Remove Class
            </button>
            <button
              className="info-card-function"
              onClick={(e) => {
                e.preventDefault();
                handleAddStudentToClass();
              }}
            >
              Add students
            </button>
          </div>
        </>
      ) : (
        <>None</>
      )}
    </div>
  );
};

export default InfoCard;
