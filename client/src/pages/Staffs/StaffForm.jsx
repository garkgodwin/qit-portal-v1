import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startFormLoading, stopFormLoading } from "../../features/loadingSlice";
import Form from "../../components/forms/Form";
import {
  getStaffDetailsForUpdate,
  updateStaffDetails,
  createStaffDetails,
} from "../../api/staffs";
import { showToast } from "../../features/toastSlice";
import { append, update } from "../../features/dataSlice";

const StaffForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.data);
  const [inputs, setInputs] = useState({
    user: {
      username: "",
      email: "",
      role: 3,
    },
    staff: {
      department: "N/A",
    },
    person: {
      name: {
        title: "",
        first: "",
        middle: "",
        last: "",
        extension: "",
      },
      age: 0,
      birthDate: new Date().toISOString().substring(0, 10),
      gender: 1,
    },
  });

  useEffect(() => {
    if (data.selectedData !== null) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [data]);

  const fetchData = async () => {
    dispatch(startFormLoading());
    const result = await getStaffDetailsForUpdate(data.selectedData);
    if (result.status === 200) {
      const d = result.data;
      const staff = d.staff;
      const person = d.person;
      const user = d.user;
      setInputs({
        staff: staff,
        person: {
          ...person,
          birthDate: new Date(person.birthDate).toISOString().substring(0, 10),
        },
        user: user,
      });
    } else {
      navigate("/staffs");
    }
    dispatch(stopFormLoading());
  };
  const handleCancel = () => {
    navigate("/staffs");
  };
  const handleSubmit = async () => {
    dispatch(startFormLoading());
    if (data.selectedData === null) {
      //? create new staff
      // submit only the person and user details
      const result = await createStaffDetails(inputs);
      dispatch(
        showToast({
          body: result.message,
        })
      );
      if (result.status === 200) {
        dispatch(
          append({
            removeAppend: "staff",
            data: result.data,
          })
        );
        navigate("/staffs");
      }
    } else {
      //? update staff details
      const result = await updateStaffDetails(data.selectedData, inputs);
      dispatch(
        showToast({
          body: result.message,
        })
      );
      if (result.status === 200) {
        dispatch(
          update({
            updateType: "staff",
            data: result.data,
          })
        );
      }
    }
    dispatch(stopFormLoading());
  };

  return (
    <>
      <Form>
        <div className="form-title">
          <h1>Staff Form</h1>
        </div>
        <div className="form-body">
          {data.selectedData === null && (
            <div className="input-fields">
              <span className="input-fields-title">User information</span>
              <div className="input-field">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="username"
                  value={inputs.user.username}
                  onChange={(e) => {
                    setInputs({
                      ...inputs,
                      user: {
                        ...inputs.user,
                        username: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              <div className="input-field">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="email"
                  value={inputs.user.email}
                  onChange={(e) => {
                    setInputs({
                      ...inputs,
                      user: {
                        ...inputs.user,
                        email: e.target.value,
                      },
                    });
                  }}
                />
              </div>
              <div className="input-field">
                <label>Role</label>
                <select
                  value={inputs.user.role}
                  onChange={(e) => {
                    setInputs({
                      ...inputs,
                      user: {
                        ...inputs.user,
                        role: parseInt(e.target.value),
                      },
                    });
                  }}
                >
                  <option value={3}>Instructor</option>
                  <option value={2}>Registrar</option>
                </select>
              </div>
              <div className="input-field">
                <label>Department</label>
                <select
                  value={inputs.staff.department}
                  onChange={(e) => {
                    setInputs({
                      ...inputs,
                      staff: {
                        ...inputs.staff,
                        department: e.target.value,
                      },
                    });
                  }}
                >
                  <option value="N/A">No department</option>
                  <option value="IT">Information Tech.</option>
                  <option value="GE">General Ed.</option>
                </select>
              </div>
            </div>
          )}
          <div className="input-fields">
            <span className="input-fields-title">Personal information</span>
            <div className="input-fields">
              <div className="input-field">
                <label>Title</label>
                <input
                  type="text"
                  placeholder="e.g: MIT, MBA"
                  value={inputs.person.name.title}
                  onChange={(e) => {
                    setInputs({
                      ...inputs,
                      person: {
                        ...inputs.person,
                        name: {
                          ...inputs.person.name,
                          title: e.target.value,
                        },
                      },
                    });
                  }}
                />
              </div>
              <div className="input-field">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="e.g: John, Apple"
                  value={inputs.person.name.first}
                  onChange={(e) => {
                    setInputs({
                      ...inputs,
                      person: {
                        ...inputs.person,
                        name: {
                          ...inputs.person.name,
                          first: e.target.value,
                        },
                      },
                    });
                  }}
                />
              </div>
              <div className="input-field">
                <label>Middle Name</label>
                <input
                  type="text"
                  placeholder="e.g: Paumar, Lazatin"
                  value={inputs.person.name.middle}
                  onChange={(e) => {
                    setInputs({
                      ...inputs,
                      person: {
                        ...inputs.person,
                        name: {
                          ...inputs.person.name,
                          middle: e.target.value,
                        },
                      },
                    });
                  }}
                />
              </div>
              <div className="input-field">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="e.g: Pamor"
                  value={inputs.person.name.last}
                  onChange={(e) => {
                    setInputs({
                      ...inputs,
                      person: {
                        ...inputs.person,
                        name: {
                          ...inputs.person.name,
                          last: e.target.value,
                        },
                      },
                    });
                  }}
                />
              </div>
              <div className="input-field">
                <label>ext.</label>
                <input
                  type="text"
                  placeholder="e.g: Jr., Sr."
                  value={inputs.person.name.extension}
                  onChange={(e) => {
                    setInputs({
                      ...inputs,
                      person: {
                        ...inputs.person,
                        name: {
                          ...inputs.person.name,
                          extension: e.target.value,
                        },
                      },
                    });
                  }}
                />
              </div>
            </div>

            <div className="input-field">
              <label>Age</label>
              <input
                type="number"
                placeholder="e.g: 23, 24"
                min={0}
                max={100}
                value={inputs.person.age}
                onChange={(e) => {
                  setInputs({
                    ...inputs,
                    person: {
                      ...inputs.person,
                      age: parseInt(e.target.value),
                    },
                  });
                }}
              />
            </div>

            <div className="input-field">
              <label>Birth Date</label>
              <input
                type="date"
                placeholder="birthdate"
                value={inputs.person.birthDate}
                onChange={(e) => {
                  setInputs({
                    ...inputs,
                    person: {
                      ...inputs.person,
                      birthDate: e.target.value,
                    },
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

export default StaffForm;
