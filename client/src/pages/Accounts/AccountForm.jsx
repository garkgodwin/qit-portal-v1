import React, { useState, useEffect } from "react";
import Form from "../../components/forms/Form";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../features/dataSlice";
import { startFormLoading, stopFormLoading } from "../../features/loadingSlice";
import { useNavigate } from "react-router-dom";
import { getAccountDetails, updateAccountDetails } from "../../api/user";
import { showToast } from "../../features/toastSlice";
const AccountForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    if (data.selectedData !== null) {
      fetchSelectedData();
    }
    // eslint-disable-next-line
  }, [data]);

  const fetchSelectedData = async () => {
    dispatch(startFormLoading());
    const result = await getAccountDetails(data.selectedData);

    if (result.status === 200) {
      const d = result.data;
      setInputs({
        username: d.username,
        email: d.email,
      });
    } else {
      navigate("/accounts");
    }
    dispatch(stopFormLoading());
  };

  const handleCancel = () => {
    navigate("/accounts");
  };
  const handleSubmit = async () => {
    dispatch(startFormLoading());
    if (data.selectedData !== null) {
      const result = await updateAccountDetails(data.selectedData, inputs);
      console.log(result);
      dispatch(
        showToast({
          body: result.message,
        })
      );
      if (result.status === 200) {
        const d = result.data;
        dispatch(
          update({
            updateType: "account",
            data: d,
          })
        );
        navigate("/accounts");
      }
    }
    dispatch(stopFormLoading());
  };
  return (
    <>
      <Form>
        <div className="form-title">
          <h1>Account Form</h1>
        </div>
        <div className="form-body">
          <div className="input-fields">
            <div className="input-field">
              <label>Username</label>
              <input
                type="text"
                placeholder="username"
                value={inputs.username}
                onChange={(e) => {
                  setInputs({
                    ...inputs,
                    username: e.target.value,
                  });
                }}
              />
            </div>
            <div className="input-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="email"
                value={inputs.email}
                onChange={(e) => {
                  setInputs({
                    ...inputs,
                    email: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        </div>
        <div className="form-functions">
          <button
            className="form-function"
            onClick={(e) => {
              e.preventDefault();
              handleCancel();
            }}
          >
            Cancel
          </button>
          <button
            className="form-function"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Submit
          </button>
        </div>
      </Form>
    </>
  );
};

export default AccountForm;
