import "./App.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//? components
import Pages from "./pages/Pages";
import Navbar from "./components/navbar/Navbar";
import Toast from "./components/toast/Toast";
import Loading from "./components/loading/Loading";

//? global states
import { authenticate as stateAuthenticate } from "./features/authSlice";
import { showToast } from "./features/toastSlice";
import { startScreenLoading, stopScreenLoading } from "./features/loadingSlice";
import { populate } from "./features/dataSlice";

//? api
import { authenticate as apiAuthenticate } from "./api/auth";
import { getAllUsers, getAllStaffs } from "./api/user";
import { getAllStudents } from "./api/student";
import { getAllSubjects, getAllClasses } from "./api/general";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.loading);
  const auth = useSelector((state) => state.auth);
  const toast = useSelector((state) => state.toast);

  useEffect(() => {
    checkCredentials();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (auth.loggedInPerson !== null) {
      populateTables();
    }
    // eslint-disable-next-line
  }, [auth]);

  const checkCredentials = async () => {
    const token = localStorage.getItem("token");
    dispatch(startScreenLoading());
    if (token) {
      const result = await apiAuthenticate(token);
      dispatch(
        showToast({
          body: result.message,
        })
      );
      if (result.status === 200) {
        dispatch(
          stateAuthenticate({
            loggedInPerson: result.data.person,
          })
        );
        navigate("/");
      } else {
        navigate("/login");
        localStorage.clear(); // clear localstorage if token is there but invalid
      }
    } else {
      navigate("/login");
    }
    dispatch(stopScreenLoading());
  };
  const populateTables = async () => {
    dispatch(startScreenLoading());

    //? fetch all users
    const usersResult = await getAllUsers();
    if (usersResult.status === 200) {
      dispatch(
        populate({
          populateType: 1,
          data: usersResult.data,
        })
      );
    }
    const staffsResult = await getAllStaffs();
    if (staffsResult.status === 200) {
      dispatch(
        populate({
          populateType: 2,
          data: staffsResult.data,
        })
      );
    }

    const studentsResult = await getAllStudents();
    if (studentsResult.status === 200) {
      dispatch(
        populate({
          populateType: 3,
          data: studentsResult.data,
        })
      );
    }

    const subjectsResult = await getAllSubjects();
    if (subjectsResult.status === 200) {
      dispatch(
        populate({
          populateType: 4,
          data: subjectsResult.data,
        })
      );
    }
    const subjectGroupsResult = await getAllClasses();
    if (subjectGroupsResult.status === 200) {
      dispatch(
        populate({
          populateType: 5,
          data: subjectGroupsResult.data,
        })
      );
    }
    dispatch(stopScreenLoading());
  };

  return (
    <div
      className={"App" + (auth.loggedInPerson === null ? "" : " app-authed")}
    >
      {loading.screenLoading && <Loading />}
      {toast.shown && <Toast />}
      <Navbar />
      <Pages />
    </div>
  );
}

export default App;
