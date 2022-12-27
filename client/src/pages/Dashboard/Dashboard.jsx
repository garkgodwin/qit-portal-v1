import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CountCard from "../../components/cards/CountCard";
import AdminFunctions from "./AdminFunctions";
import "./Dashboard.css";
import HistoryList from "./HistoryList";

const Dashboard = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const data = [
    {
      achieved: 100,
      total: 100,
      title: "Students",
      functionText: "Go to students",
      handleClick: () => {
        navigate("/students");
      },
    },
    {
      achieved: 50,
      total: 100,
      title: "Enrolled students",
      functionText: "Go to students",
      handleClick: () => {
        navigate("/students");
      },
    },
    {
      achieved: 20,
      total: 20,
      title: "Staffs",
      functionText: "Go to staffs",
      handleClick: () => {
        navigate("/staffs");
      },
    },
    {
      achieved: 100,
      total: 100,
      title: "Classes",
      functionText: "Go to classes",
      handleClick: () => {
        navigate("/classes");
      },
    },
    {
      achieved: 100,
      total: 100,
      title: "Subjects",
      functionText: "Go to subjects",
      handleClick: () => {
        navigate("/subjects");
      },
    },
    {
      achieved: 10,
      total: 10,
      title: "Number of rooms",
    },
  ];

  return (
    <>
      <div className="page-content">
        <div className="page-content-left">
          <div className="page-content-left-top">
            {data.map((c, i) => {
              return <CountCard key={i} data={c} />;
            })}
          </div>
          <div className="page-content-left-bot">
            {auth.loggedInPerson.user.role === 1 && <AdminFunctions />}
          </div>
        </div>
        <div className="page-content-right">
          <HistoryList />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
