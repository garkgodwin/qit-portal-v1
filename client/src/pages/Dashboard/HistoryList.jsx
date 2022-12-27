import React from "react";
import { useNavigate } from "react-router-dom";

const HistoryList = () => {
  const navigate = useNavigate();

  const histories = [
    "Something happened in the system...",
    "Something happened in the system...",
    "Something happened in the system...",
    "Something happened in the system...",
    "Something happened in the system...",
    "Something happened in the system...",
    "Something happened in the system...",
    "Something happened in the system...",
    "Something happened in the system...",
  ];

  const handleHistory = () => {
    navigate("/history");
  };
  return (
    <div className="page-content-history">
      <div className="page-content-history-top">
        <h4>History</h4>
        <ul>
          {histories.map((h, index) => {
            return <li key={index}>{index + 1 + ". " + h}</li>;
          })}
        </ul>
      </div>
      <div className="functions">
        <button
          className="function"
          onClick={(e) => {
            e.preventDefault();
            handleHistory();
          }}
        >
          Go to history
        </button>
      </div>
    </div>
  );
};

export default HistoryList;
