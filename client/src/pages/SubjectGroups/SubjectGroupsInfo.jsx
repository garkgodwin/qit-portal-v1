import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./SubjectGroupsInfo.css";
import { getClassDetails } from "../../api/subjectGroup";
import { getFullName } from "../../helpers/formatText";
const SubjectGroupsInfo = () => {
  const [sGroup, setSGroup] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.data);

  useEffect(() => {
    if (data.selectedType === "class-info") {
      fetchSubjectGroupInfo();
    } else {
      navigate("/classes");
    }
  }, [data]);

  const fetchSubjectGroupInfo = async () => {
    const id = data.selectedData;
    const result = await getClassDetails(id);
    console.log(result);
    if (result.status === 200) {
      setSGroup(result.data);
    } else {
      navigate("/classes");
    }
  };
  if (sGroup === null) {
    return (
      <>
        <h1>Fetching</h1>
      </>
    );
  }
  return (
    <>
      <div className="class-box">
        <div className="class-headers">
          <div className="class-header class-header-1">
            <h1>{sGroup.subjectCode}</h1>
            <span>Name of subject</span>
          </div>
          <div className="class-header class-header-1">
            <h2>{getFullName(sGroup.instructor.person)}</h2>
            <span>Instructor</span>
          </div>
        </div>
        <div className="class-body">
          <div className="class-student">
            <div className="class-student-field">
              <span>Name of student</span>
              <h6>Student</h6>
            </div>
            <div className="class-student-field">
              <span>1-A</span>
              <h6>Year&Section</h6>
            </div>
            <div className="class-student-field">
              <span>50.24</span>
              <h6>Current Grade</h6>
            </div>
            <div className="class-student-functions">
              <button className="class-function">Grade</button>
            </div>
          </div>
          <div className="class-student-plus">
            <button>+</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubjectGroupsInfo;
