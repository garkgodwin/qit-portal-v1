import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InfoCard from "../../components/cards/InfoCard";

const StaffHome = () => {
  const navigate = useNavigate();
  const { staffs } = useSelector((state) => state.data);
  const handleCreateStaff = () => {
    navigate("/staffs/form");
  };
  return (
    <>
      <div className="page-filters">
        <div className="page-filter filter-1">
          <label>Search</label>
          <input type="text" placeholder="Search staff" />
        </div>
        <div className="page-filter filter-2">
          <label>Role</label>
          <select>
            <option>All users</option>
            <option>Admin</option>
            <option>Registrar</option>
            <option>Instructor</option>
          </select>
        </div>
      </div>
      <div className="page-content">
        <div className="page-content-list">
          {staffs.map((a, i) => {
            return <InfoCard key={i} data={a} type={2} />;
          })}
        </div>
      </div>
      <div className="page-functions functions">
        <button
          className="function"
          onClick={(e) => {
            e.preventDefault();
            handleCreateStaff();
          }}
        >
          Create new staff
        </button>
      </div>
    </>
  );
};

export default StaffHome;
