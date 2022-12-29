import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getStudentFullInfo } from "../../api/student";

const StudentsInfo = () => {
  const data = useSelector((state) => state.data);

  useEffect(() => {
    if (data.selectedType === "student-view-info") {
      fetchData();
    }
    // eslint-disable-next-line
  }, [data]);

  const fetchData = async () => {
    const studentID = data.selectedData;
    console.log("StudentID: ", studentID);
    const result = await getStudentFullInfo(studentID);
    console.log(result);
  };
  return <>Student info</>;
};

export default StudentsInfo;
