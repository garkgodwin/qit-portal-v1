import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import InfoCard from "../../components/cards/InfoCard";

const StaffHome = () => {
  const { staffs } = useSelector((state) => state.data);
  useEffect(() => {
    console.log(staffs);
  }, [staffs]);
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
        <button className="function">Create new staff</button>
      </div>
    </>
  );
};

export default StaffHome;
