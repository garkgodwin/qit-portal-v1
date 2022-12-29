import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InfoCard from "../../components/cards/InfoCard";

const StudentsHome = () => {
  const auth = useSelector((state) => state.auth);
  const { students } = useSelector((state) => state.data);
  const navigate = useNavigate();

  console.log(students);
  const handleNewStudent = () => {
    navigate("/students/form");
  };
  return (
    <>
      <div className="page-filters">
        <div className="page-filter filter-1">
          <label>Search</label>
          <input type="text" placeholder="Search student" />
        </div>
        <div className="page-filter filter-2">
          <label>Year Level</label>
          <select>
            <option>All</option>
            <option>1st year</option>
            <option>2nd year</option>
            <option>3rd year</option>
            <option>4th year</option>
          </select>
        </div>
        <div className="page-filter filter-2">
          <label>Student Type</label>
          <select>
            <option>All</option>
            <option>College</option>
            <option>Highschool</option>
          </select>
        </div>
      </div>
      <div className="page-content">
        <div className="page-content-list">
          {students.map((a, i) => {
            return <InfoCard key={i} data={a} type={3} />;
          })}
        </div>
      </div>
      <div className="page-functions functions">
        {auth.loggedInPerson.user.role === 1 ? (
          <button
            className="function"
            onClick={(e) => {
              e.preventDefault();
              handleNewStudent();
            }}
          >
            Create new student
          </button>
        ) : (
          <div className="function-tip">
            Only admin can add or update students details.
          </div>
        )}
      </div>
    </>
  );
};

export default StudentsHome;
