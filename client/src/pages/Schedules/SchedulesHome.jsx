import React from "react";
import { useSelector } from "react-redux";
import InfoCard from "../../components/cards/InfoCard";

const SchedulesHome = () => {
  const { schedules } = useSelector((state) => state.data);
  return (
    <>
      <div className="page-filters">
        <div className="page-filter filter-1">
          <label>Search</label>
          <input type="text" placeholder="Search subject or instructor" />
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
        <div className="page-content-list"></div>
      </div>
      <div className="page-functions functions">
        <div className="function-tip">
          To schedule a class, click on the plus button for specific day
        </div>
      </div>
    </>
  );
};

export default SchedulesHome;
