import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import "./Pages.css";
import PageLogin from "./Login/Login";
import PageNotFound from "./NotFound/NotFound";
import PageDashboard from "./Dashboard/Dashboard";

import PageAccounts from "./Accounts/Account";
import PageAccountsHome from "./Accounts/AccountHome";
import PageAccountsForm from "./Accounts/AccountForm";

import PageStaffs from "./Staffs/Staff";
import PageStaffsHome from "./Staffs/StaffHome";
import PageStaffSForm from "./Staffs/StaffForm";

import PageStudents from "./Students/Student";
import PageStudentsHome from "./Students/StudentsHome";
import PageStudentsForm from "./Students/StudentsForm";
import PageStudentsInfo from "./Students/StudentsInfo";
import PageStudentsSubjects from "./Students/StudentsSubjects";

import PageSubjects from "./Subjects/Subjects";
import PageSubjectsHome from "./Subjects/SubjectsHome";
import PageSubjectsForm from "./Subjects/SubjectsForm";

import PageSubjectGroups from "./SubjectGroups/SubjectGroups";
import PageSubjectGroupsHome from "./SubjectGroups/SubjectGroupsHome";
import PageSubjectGroupsForm from "./SubjectGroups/SubjectGroupsForm";
import PageSubjectGroupsInfo from "./SubjectGroups/SubjectGroupsInfo";
import PageSubjectGroupNewStudent from "./SubjectGroups/SubjectGroupNewStudent";

import PageSchedules from "./Schedules/Schedules";
import PageSchedulesHome from "./Schedules/SchedulesHome";
import PageSchedulesForm from "./Schedules/SchedulesForm";

const Pages = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <main
      className={"Page" + (auth.loggedInPerson === null ? "" : " page-authed")}
    >
      <Routes>
        {auth.loggedInPerson === null ? (
          <Route index path="/login" element={<PageLogin />} />
        ) : auth.loggedInPerson.user.role === 1 ? (
          <>
            <Route index path="" element={<PageDashboard />} />
            <Route path="accounts" element={<PageAccounts />}>
              <Route path="" element={<PageAccountsHome />} />
              <Route path="form" element={<PageAccountsForm />} />
            </Route>
            <Route path="staffs" element={<PageStaffs />}>
              <Route path="" element={<PageStaffsHome />} />
              <Route path="form" element={<PageStaffSForm />} />
            </Route>
            <Route path="students" element={<PageStudents />}>
              <Route path="" element={<PageStudentsHome />} />
              <Route path="form" element={<PageStudentsForm />} />
              <Route path="info" element={<PageStudentsInfo />} />
              <Route path="subjects" element={<PageStudentsSubjects />} />
            </Route>
            <Route path="subjects" element={<PageSubjects />}>
              <Route path="" element={<PageSubjectsHome />} />
              <Route path="form" element={<PageSubjectsForm />} />
            </Route>
            <Route path="classes" element={<PageSubjectGroups />}>
              <Route path="" element={<PageSubjectGroupsHome />} />
              <Route path="form" element={<PageSubjectGroupsForm />} />
              <Route path="info" element={<PageSubjectGroupsInfo />} />
              <Route
                path="info/new-student"
                element={<PageSubjectGroupNewStudent />}
              />
            </Route>
            <Route path="schedules" element={<PageSchedules />}>
              <Route path="" element={<PageSchedulesHome />} />
              <Route path="form" element={<PageSchedulesForm />} />
            </Route>
          </>
        ) : auth.loggedInPerson.user.role === 2 ? (
          <>
            <Route index path="/" element={<PageDashboard />} />
            <Route path="students" element={<PageStudents />}>
              <Route path="" element={<PageStudentsHome />} />
              <Route path="form" element={<PageStudentsForm />} />
              <Route path="info" element={<PageStudentsInfo />} />
              <Route path="subjects" element={<PageStudentsSubjects />} />
            </Route>
            <Route path="subjects" element={<PageSubjects />}>
              <Route path="" element={<PageSubjectsHome />} />
              <Route path="form" element={<PageSubjectsForm />} />
            </Route>
            <Route path="classes" element={<PageSubjectGroups />}>
              <Route path="" element={<PageSubjectGroupsHome />} />
              <Route path="form" element={<PageSubjectGroupsForm />} />
              <Route path="info" element={<PageSubjectGroupsInfo />} />
              <Route
                path="info/new-student"
                element={<PageSubjectGroupNewStudent />}
              />
            </Route>
            <Route path="schedules" element={<PageSchedules />}>
              <Route path="" element={<PageSchedulesHome />} />
              <Route path="form" element={<PageSchedulesForm />} />
            </Route>
          </>
        ) : auth.loggedInPerson.user.role === 3 ? (
          <>
            <Route index path="/" element={<PageDashboard />} />
            <Route path="students" element={<PageStudents />}>
              <Route path="" element={<PageStudentsHome />} />
              <Route path="form" element={<PageStudentsForm />} />
              <Route path="info" element={<PageStudentsInfo />} />
              <Route path="subjects" element={<PageStudentsSubjects />} />
            </Route>
            <Route path="subjects" element={<PageSubjects />}>
              <Route path="" element={<PageSubjectsHome />} />
              <Route path="form" element={<PageSubjectsForm />} />
            </Route>
            <Route path="classes" element={<PageSubjectGroups />}>
              <Route path="" element={<PageSubjectGroupsHome />} />
              <Route path="form" element={<PageSubjectGroupsForm />} />
              <Route path="info" element={<PageSubjectGroupsInfo />} />
              <Route
                path="info/new-student"
                element={<PageSubjectGroupNewStudent />}
              />
            </Route>
            <Route path="schedules" element={<PageSchedules />}>
              <Route path="" element={<PageSchedulesHome />} />
              <Route path="form" element={<PageSchedulesForm />} />
            </Route>
          </>
        ) : auth.loggedInPerson.user.role === 4 ? (
          <>
            <Route index path="/" element={<PageDashboard />} />
            <Route path="subjects" element={<PageSubjects />}>
              <Route path="" element={<PageSubjectsHome />} />
              <Route path="form" element={<PageSubjectsForm />} />
            </Route>
            <Route path="classes" element={<PageSubjectGroups />}>
              <Route path="" element={<PageSubjectGroupsHome />} />
              <Route path="form" element={<PageSubjectGroupsForm />} />
              <Route path="info" element={<PageSubjectGroupsInfo />} />
              <Route
                path="info/new-student"
                element={<PageSubjectGroupNewStudent />}
              />
            </Route>
            <Route path="schedules" element={<PageSchedules />}>
              <Route path="" element={<PageSchedulesHome />} />
              <Route path="form" element={<PageSchedulesForm />} />
            </Route>
          </>
        ) : auth.loggedInPerson.user.role === 5 ? (
          <>
            <Route index path="/" element={<PageDashboard />} />
            <Route path="subjects" element={<PageSubjects />}>
              <Route path="" element={<PageSubjectsHome />} />
              <Route path="form" element={<PageSubjectsForm />} />
            </Route>
            <Route path="classes" element={<PageSubjectGroups />}>
              <Route path="" element={<PageSubjectGroupsHome />} />
              <Route path="form" element={<PageSubjectGroupsForm />} />
              <Route path="info" element={<PageSubjectGroupsInfo />} />
              <Route
                path="info/new-student"
                element={<PageSubjectGroupNewStudent />}
              />
            </Route>
            <Route path="schedules" element={<PageSchedules />}>
              <Route path="" element={<PageSchedulesHome />} />
              <Route path="form" element={<PageSchedulesForm />} />
            </Route>
          </>
        ) : null}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </main>
  );
};

export default Pages;
