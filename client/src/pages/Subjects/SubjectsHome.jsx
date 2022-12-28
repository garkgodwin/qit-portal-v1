import React from "react";
import { useSelector } from "react-redux";
import InfoCard from "../../components/cards/InfoCard";

const SubjectsHome = () => {
  const { subjects } = useSelector((state) => state.data);

  return (
    <>
      <div className="page-filters">
        <div className="page-filter filter-1">
          <label>Search</label>
          <input type="text" placeholder="Search subject" />
        </div>
        <div className="page-filter filter-2">
          <label>Subject status</label>
          <select>
            <option>All</option>
            <option>College</option>
            <option>Senior High School</option>
            <option>Junior High School</option>
          </select>
        </div>
        <div className="page-filter filter-3">
          <label>Recommended year level</label>
          <select>
            <option>All</option>
            <option>1st year</option>
            <option>2nd year</option>
            <option>3rd year</option>
            <option>4th year</option>
          </select>
        </div>
        <div className="page-filter filter-4">
          <label>Recommended semester</label>
          <select>
            <option>All</option>
            <option>1st semester</option>
            <option>2nd semester</option>
          </select>
        </div>
      </div>
      <div className="page-content">
        <div className="page-content-list">
          {subjects.map((a, i) => {
            return <InfoCard key={i} data={a} type={4} />;
          })}
        </div>
      </div>
      <div className="page-functions functions">
        <div className="function-tip">
          We can only view subjects here, to add a new subject, please contact
          your IT.
        </div>
      </div>
    </>
  );
};

export default SubjectsHome;
