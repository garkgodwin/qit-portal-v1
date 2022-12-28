import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login as stateLogin } from "../../features/authSlice";
import {
  startScreenLoading,
  stopScreenLoading,
} from "../../features/loadingSlice";
import { login as apiLogin } from "../../api/auth";
import Form from "../../components/forms/Form";
import { showToast } from "../../features/toastSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pShown, setPShown] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    console.log(inputs);
    dispatch(startScreenLoading());
    const result = await apiLogin(inputs);
    dispatch(showToast({ body: result.message }));
    if (result.status === 200) {
      dispatch(
        stateLogin({
          loggedInPerson: result.data.person,
          token: result.data.token,
        })
      );
      navigate("/");
    }
    dispatch(stopScreenLoading());
    // dispatch(startScreenLoading());
    // dispatch(
    //   login({
    //     loggedInPerson: loggedInPerson,
    //     token: token,
    //   })
    // );
    // navigate("/");
    // dispatch(stopScreenLoading());
  };
  return (
    <>
      <Form>
        <div className="form-title">
          <h1>Welcome! Please login to continue</h1>
        </div>
        <div className="form-body">
          <div className="input-fields input-fields-center input-fields-login">
            <div className="input-field">
              <label>Username/email/student-id</label>
              <input
                type="text"
                value={inputs.username}
                onChange={(e) => {
                  setInputs({
                    ...inputs,
                    username: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="input-fields input-fields-center input-fields-login">
            <div className="input-field">
              <label>Password</label>
              <div className="input-password">
                <input
                  type={pShown ? "text" : "password"}
                  value={inputs.password}
                  onChange={(e) => {
                    setInputs({
                      ...inputs,
                      password: e.target.value,
                    });
                  }}
                />
                <button
                  className="input-show"
                  onClick={(e) => {
                    e.preventDefault();
                    setPShown(!pShown);
                  }}
                >
                  {pShown ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="form-functions">
          <button
            className="form-function form-function-login"
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            Login
          </button>
        </div>
      </Form>
    </>
  );
};

export default Login;
