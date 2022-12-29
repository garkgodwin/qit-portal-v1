import React, { useEffect, useState } from "react";
import "./Profile.css";
import { getFullName } from "../../helpers/formatText";

const Profile = ({ data, type }) => {
  const [person, setPerson] = useState(null);

  useEffect(() => {
    console.log(data);
    if (data) {
      if (type === "admin-view-student") {
        const student = data.student;
        const sGrades = data.grades;
        const sPerson = student.person;
        setPerson(sPerson);
      }
    }
  }, [data]);
  if (data === null) {
    return (
      <>
        <h1>Fetching data</h1>
      </>
    );
  }
  return (
    <>
      <div className="Profile">
        <div className="profile-image">Image Here</div>
        <div className="profile-desc">
          <h5>{person && getFullName(person)}</h5>
        </div>
      </div>
    </>
  );
};

export default Profile;
