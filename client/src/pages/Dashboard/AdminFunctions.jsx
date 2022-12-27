import React from "react";

const AdminFunctions = () => {
  const handleViewClick = () => {};
  const handleIncrementClick = () => {};
  const handleLockClick = (e) => {};
  return (
    <div className="functions">
      <span className="functions-title">Admin privelages</span>
      <button
        className="function"
        onClick={(e) => {
          e.preventDefault();
          handleViewClick();
        }}
      >
        View school year and semester data
      </button>
      <button
        className="function"
        onClick={(e) => {
          e.preventDefault();
          handleIncrementClick();
        }}
      >
        Increment school year and semester
      </button>
      <button
        className="function"
        onClick={(e) => {
          e.preventDefault();
          handleLockClick();
        }}
      >
        Lock school year and semester
      </button>
    </div>
  );
};

export default AdminFunctions;
