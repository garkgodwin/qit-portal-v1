import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "../../components/forms/Form";
import {
  getAvailableStudentsToAddForThisClass,
  addStudentsToThisSubject,
} from "../../api/subjectGroup";
import { getFullName } from "../../helpers/formatText";
import { showToast } from "../../features/toastSlice";
import { startFormLoading, stopFormLoading } from "../../features/loadingSlice";
import { append, select, update } from "../../features/dataSlice";

const SubjectGroupNewStudent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState([]);
  const data = useSelector((state) => state.data);
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    console.log(data);
    //? get the students that no subject like this
    //? get the students that matches this subject
    //? checkbox for each student
    if (data.selectedType === "class-info-new-student") {
      fecthStudentsAvailableToAdd();
    }
  }, [data]);

  const fecthStudentsAvailableToAdd = async () => {
    const id = data.selectedData;
    const result = await getAvailableStudentsToAddForThisClass(id);
    if (result.status === 200) {
      setFilteredStudents(result.data);
    }
  };

  useEffect(() => {
    console.log(inputs);
  }, [inputs]);

  const handleChange = (checked, id) => {
    if (checked) {
      //? push to inputs
      setInputs([...inputs, id]);
    } else {
      //? remove from inputs
      setInputs(
        inputs.filter((i) => {
          if (i !== id) {
            return i;
          }
        })
      );
    }
  };

  const handleCancel = async () => {
    dispatch(
      select({
        data: data.selectedData,
        selectedType: "class-info",
      })
    );
    navigate("/classes/info");
  };

  const handleSubmit = async () => {
    if (inputs.length === 0) {
      dispatch(
        showToast({ body: "Please select a student to add in this subject." })
      );
      return;
    }
    dispatch(startFormLoading());
    const result = await addStudentsToThisSubject(data.selectedData, {
      ids: inputs,
    });
    console.log(result);
    dispatch(
      showToast({
        body: result.message,
      })
    );
    if (result.status === 200) {
      dispatch(
        update({
          updateType: "subjectGroup",
          data: result.data,
        })
      );
      dispatch(
        select({
          selectedType: "class-info",
          data: data.selectedData,
        })
      );
      navigate("/classes/info");
    }
    dispatch(stopFormLoading());
  };

  return (
    <>
      <Form>
        <div className="form-title">
          <h1>New Students Form</h1>
        </div>
        <div className="form-body">
          {filteredStudents.map((student) => {
            return (
              <div className="input-field input-field-check" key={student._id}>
                <label>
                  {student.course +
                    " " +
                    student.yearLevel +
                    "-" +
                    student.section +
                    " | " +
                    getFullName(student.person)}
                </label>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    handleChange(e.target.checked, student._id);
                  }}
                />
              </div>
            );
          })}
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

export default SubjectGroupNewStudent;
