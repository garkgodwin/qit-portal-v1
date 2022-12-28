import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const StudentsInfo = () => {
  const data = useSelector((state) => state.data);

  useEffect(() => {
    if (data.selectedType === 3) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [data]);

  const fetchData = async () => {};
  return <>Student info</>;
};

export default StudentsInfo;
