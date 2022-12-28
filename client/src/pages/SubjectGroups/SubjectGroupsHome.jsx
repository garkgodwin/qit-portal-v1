import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InfoCard from "../../components/cards/InfoCard";

const SubjectGroupsHome = () => {
  const navigate = useNavigate();
  const { subjectGroups } = useSelector((state) => state.data);

  useEffect(() => {
    console.log(subjectGroups);
  }, [subjectGroups]);
  const handleCreateClass = () => {
    navigate("/classes/form");
  };
  return (
    <>
      <div className="page-filters">
        <div className="page-filter filter-1">
          <label>Search</label>
          <input type="text" placeholder="Search class" />
        </div>
        <div className="page-filter filter-2">
          <label>Class type</label>
          <select>
            <option>All</option>
            <option>College</option>
            <option>Senior High School</option>
            <option>Junior High School</option>
          </select>
        </div>
        <div className="page-filter filter-3">
          <label>Year level</label>
          <select>
            <option>All</option>
            <option>1st year</option>
            <option>2nd year</option>
            <option>3rd year</option>
            <option>4th year</option>
          </select>
        </div>
      </div>
      <div className="page-content">
        <div className="page-content-list">
          {subjectGroups.map((a, i) => {
            return <InfoCard key={i} data={a} type={5} />;
          })}
          {subjectGroups.length === 0 && (
            <div className="page-content-list-empty">
              <p>
                There are no classes created yet. To create a class, please
                click on 'Create new class' button at the bottom of the page
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="page-functions functions">
        <button
          className="function"
          onClick={(e) => {
            e.preventDefault();
            handleCreateClass();
          }}
        >
          Create new class
        </button>
      </div>
    </>
  );
};

export default SubjectGroupsHome;
