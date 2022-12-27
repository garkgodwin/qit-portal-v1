import React from "react";

const InfoCardField = ({ text, title }) => {
  return (
    <div className="info-card-field">
      <p>{text}</p>
      <span>{title}</span>
    </div>
  );
};

export default InfoCardField;
