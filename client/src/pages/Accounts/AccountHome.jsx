import React from "react";
import { useSelector } from "react-redux";
import InfoCard from "../../components/cards/InfoCard";

const AccountHome = () => {
  const { accounts } = useSelector((state) => state.data);
  return (
    <>
      <div className="page-filters">
        <div className="page-filter filter-1">
          <label>Search</label>
          <input type="text" placeholder="Search account" />
        </div>
        <div className="page-filter filter-2">
          <label>Role</label>
          <select>
            <option>All users</option>
            <option>Admin</option>
            <option>Registrar</option>
            <option>Instructor</option>
            <option>Student</option>
            <option>Guardian</option>
          </select>
        </div>
        <div className="page-filter filter-3">
          <label>Status</label>
          <select>
            <option>All status</option>
            <option>Setup Incomplete</option>
            <option>Setup Complete</option>
          </select>
        </div>
      </div>
      <div className="page-content">
        <div className="page-content-list">
          {accounts.map((a, i) => {
            return <InfoCard key={i} data={a} type={1} />;
          })}
        </div>
      </div>
      <div className="page-functions functions">
        <div className="function-tip">
          To create a new account, you must create a staff/student/guardian
          information from their respective pages.
        </div>
      </div>
    </>
  );
};

export default AccountHome;
