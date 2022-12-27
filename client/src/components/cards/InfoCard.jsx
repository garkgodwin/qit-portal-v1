import React from "react";
import { useEffect } from "react";
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

const InfoCard = ({ data, type }) => {
  useEffect(() => {
    console.log(data);
  }, [data]);
  /*
  types: 1 - accounts, 2 - staffs, 3 - students , 4 - subjects, 5 - classes
  */

  return (
    <div className="InfoCard">
      {type === 1 || type === 2 ? (
        <>
          <div className="info-card-top">
            <InfoCardField text={getFullName(data.person)} title="Name" />
            <InfoCardField text={data.username} title="Username" />
            <InfoCardField text={data.email} title="Email" />
            <InfoCardField text={getFormattedRole(data.role)} title="Role" />
            <InfoCardField
              text={data.isFirstSetup ? "Incomplete" : "Complete"}
              title="Completed Setup"
            />
          </div>
          <div className="info-card-mid">
            <InfoCardField text={data.person.age} title="Age" />
            <InfoCardField text={data.person.birthDate} title="Birth Date" />
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
                <button className="info-card-function">
                  Update person's details
                </button>
                <button className="info-card-function">
                  Update account details
                </button>
                <button className="info-card-function">Lock account</button>
              </>
            ) : type === 2 ? (
              <>
                <button className="info-card-function">
                  Update staff details
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
            <button className="info-card-function">
              Update student details
            </button>
            <button className="info-card-function">
              Move to current SY and Sem
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
            <button className="info-card-function">View classes</button>
            <button className="info-card-function">View schedules</button>
          </div>
        </>
      ) : (
        <>None</>
      )}
    </div>
  );
};

export default InfoCard;
