import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getStudentFullInfo } from "../../api/student";
import Profile from "../Profile/Profile";

const StudentsInfo = () => {
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState(null);
  const data = useSelector((state) => state.data);

  useEffect(() => {
    if (data.selectedType === "student-view-info") {
      fetchData();
    }
    // eslint-disable-next-line
  }, [data]);

  const fetchData = async () => {
    const studentID = data.selectedData;
    const result = await getStudentFullInfo(studentID);
    console.log(result);
    if (result.status === 200) {
      setStudentInfo(result.data);
    } else {
      navigate("/students");
    }
  };
  return (
    <>
      <Profile data={studentInfo} type="admin-view-student" />
    </>
  );
  // return (
  //   <>
  //     {studentInfo !== null ? (
  //       <Profile data={studentInfo} type="admin-view-student" />
  //     ) : (
  //       "No data"
  //     )}
  //   </>
  // );
};

export default StudentsInfo;
