import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "../../components/forms/Form";
import {
  getFullName,
  getFormattedRecommendationType,
} from "../../helpers/formatText";
import { createNewClass } from "../../api/subjectGroup";
import { append } from "../../features/dataSlice";
import { startFormLoading, stopFormLoading } from "../../features/loadingSlice";
import { useEffect } from "react";

const SubjectGroupsForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const [inputs, setInputs] = useState({
    subjectCode: "",
    instructor: "",
  });

  const handleCancel = () => {
    navigate("/classes");
  };

  const handleSubmit = async () => {
    dispatch(startFormLoading());
    const result = await createNewClass(inputs);
    if (result.status === 200) {
      dispatch(
        append({
          removeAppend: "subjectGroup",
          data: result.data,
        })
      );
      navigate("/classes");
      dispatch(stopFormLoading());
    }
    dispatch(stopFormLoading());
  };
  useEffect(() => {
    setInputs({
      subjectCode: data.subjects[0].code,
      instructor: data.instructors[0]._id,
    });
  }, [data.instructors, data.subjects]);
  return (
    <>
      <Form>
        <div className="form-title">
          <h1>Class Form</h1>
        </div>
        <div className="form-note">
          <p>This class will be created by the registrar</p>
        </div>
        <div className="form-body">
          <div className="input-fields">
            <div className="input-field  input-field-100">
              <label>Subject</label>
              <select
                size={10}
                value={inputs.subjectCode}
                onChange={(e) => {
                  setInputs({
                    ...inputs,
                    subjectCode: e.target.value,
                  });
                }}
              >
                {data.subjects.map((s, i) => {
                  return (
                    <option key={i} value={s.code}>
                      {getFormattedRecommendationType(s.toTake.type)}
                      {"  :  "}
                      {s.code}
                      {"  :  "}
                      {s.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="input-fields">
            <div className="input-field  input-field-100">
              <label>Instructor</label>
              <select
                size={10}
                value={inputs.instructor}
                onChange={(e) => {
                  setInputs({
                    ...inputs,
                    instructor: e.target.value,
                  });
                }}
              >
                {data.instructors.map((ins, i) => {
                  return (
                    <option key={i} value={ins._id}>
                      {getFullName(ins.person)}
                    </option>
                  );
                })}
              </select>
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

export default SubjectGroupsForm;
