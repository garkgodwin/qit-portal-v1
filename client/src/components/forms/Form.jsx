import React from "react";
import "./Form.css";
import Loading from "../loading/Loading";
import { useSelector } from "react-redux";

const Form = (props) => {
  const loading = useSelector((state) => state.loading);

  return (
    <form>
      {loading.formLoading && <Loading />}
      {props.children}
    </form>
  );
};

export default Form;
