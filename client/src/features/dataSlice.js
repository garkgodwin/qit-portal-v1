import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedData: null,
  selectedType: "",
  /*
   "accounts", "staffs", "instructors" , "students", "subjects", "subject-groups", ""
    
 */
  accounts: [],
  staffs: [],
  instructors: [],
  students: [],
  subjects: [],
  subjectGroups: [],
  rooms: [],
  populateType: 0, // 1 - accounts, 2- staffs , 3 - students, 4 - subjects, 5- subjectGroups, 6- rooms, 0 - for none
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    select: (state, action) => {
      const p = action.payload;
      state.selectedData = p.data;
      state.selectedType = p.selectedType;
    },
    unSelect: (state) => {
      state.selectedData = null;
      state.selectedType = 0;
    },
    populate: (state, action) => {
      const p = action.payload;
      const t = p.populateType;
      const d = p.data;
      if (t === 1) {
        state.accounts = d;
      } else if (t === 2) {
        state.staffs = d;
      } else if (t === 3) {
        state.instructors = d;
      } else if (t === 4) {
        state.students = d;
      } else if (t === 5) {
        state.subjects = d;
      } else if (t === 6) {
        state.subjectGroups = d;
      } else if (t === 7) {
        state.rooms = d;
      }
    },
    update: (state, action) => {
      const p = action.payload;
      const t = p.updateType;
      const d = p.data;
      if (t === "account") {
        state.accounts = state.accounts.map((acc) => {
          if (acc._id === d._id) {
            return d;
          } else {
            return acc;
          }
        });
      } else if (t === "staff") {
        state.staffs = state.staffs.map((acc) => {
          if (acc._id === d._id) {
            return d;
          } else {
            return acc;
          }
        });
      }
    },
    append: (state, action) => {
      const p = action.payload;
      const t = p.removeAppend;
      const d = p.data;
      if (t === "account") {
        state.accounts.push(d);
      } else if (t === "staff") {
        state.staffs.push(d);
      } else if (t === "student") {
        state.students.push(d);
      } else if (t === "subjectGroup") {
        state.subjectGroups.push(d);
      }
    },
    remove: (state, action) => {
      localStorage.clear();
      const p = action.payload;
      const t = p.removeAppend;
      const d = p.data;
      if (t === "account") {
        state.accounts = state.accounts.filter((item) => {
          return item._id !== d._id;
        });
      } else if (t === "staff") {
        state.staffs = state.staffs.filter((item) => {
          return item._id !== d._id;
        });
      } else if (t === "student") {
        state.students = state.students.filter((item) => {
          return item._id !== d._id;
        });
      } else if (t === "subjectGroup") {
        state.subjectGroups = state.subjectGroups.filter((item) => {
          return item._id !== d._id;
        });
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { select, unSelect, populate, update, append, remove } =
  dataSlice.actions;

export default dataSlice.reducer;
