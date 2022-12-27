import React from "react";
import { useSelector } from "react-redux";
import "./Loading.css";
const Loading = () => {
  const loading = useSelector((state) => state.loading);
  return (
    <div
      className={
        "Loading" +
        (loading.screenLoading
          ? " loading-screen"
          : loading.formLoading
          ? " loading-form"
          : "")
      }
    >
      <h1>...Loading...</h1>
    </div>
  );
};

export default Loading;
