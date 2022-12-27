import React from "react";
import "./CountCard.css";

const CountCard = ({ data }) => {
  return (
    <div className="CountCard">
      <div className="cc-data">
        <h5>{data.title}</h5>
        <div className="count">
          <span className="count-1">{data.achieved}</span>
          <div className="count-extra"></div>
          <span className="count-2">{data.total}</span>
        </div>
      </div>
      <div className="functions">
        {data.functionText && (
          <button
            className="function"
            onClick={(e) => {
              data.handleClick();
            }}
          >
            {data.functionText}
          </button>
        )}
      </div>
    </div>
  );
};

export default CountCard;
