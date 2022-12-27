import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideToast } from "../../features/toastSlice";
import "./Toast.css";

const Toast = () => {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.toast);
  const handleClose = () => {
    dispatch(hideToast());
  };
  return (
    <div className="Toast">
      <h3 className="toast-title">{toast.title}</h3>
      <div className="toast-extra"></div>
      <p className="toast-body">{toast.body}</p>
      <div className="toast-functions">
        <button
          className="toast-function"
          onClick={(e) => {
            e.preventDefault();
            handleClose();
          }}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default Toast;
