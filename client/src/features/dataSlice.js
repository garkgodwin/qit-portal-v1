import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedData: null,
  accounts: [],
  staffs: [],
  students: [],
  subjects: [],
  subjectGroups: [],
  populateType: 0, // 1 - accounts, 2- staffs , 3 - students, 4 - subjects, 5- subjectGroups, 0 - for none
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    select: (state, action) => {
      state.selectedData = action.payload.data;
    },
    unSelect: (state, action) => {
      state.selectedData = null;
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
        state.students = d;
      } else if (t === 4) {
        state.subjects = d;
      } else if (t === 5) {
        state.subjectGroups = d;
      }
    },
    append: (state, action) => {
      const p = action.payload;
      const t = p.populateType;
      const d = p.data;
      if (t === 1) {
        state.accounts.push(d);
      } else if (t === 2) {
        state.staffs.push(d);
      } else if (t === 3) {
        state.students.push(d);
      } else if (t === 4) {
        state.subjects.push(d);
      } else if (t === 5) {
        state.subjectGroups.push(d);
      }
    },
    remove: (state, action) => {
      localStorage.clear();
      const p = action.payload;
      const t = p.populateType;
      const d = p.data;
      if (t === 1) {
        state.accounts = state.accounts.filter((item) => {
          return item._id !== d._id;
        });
      } else if (t === 2) {
        state.staffs = state.staffs.filter((item) => {
          return item._id !== d._id;
        });
      } else if (t === 3) {
        state.students = state.students.filter((item) => {
          return item._id !== d._id;
        });
      } else if (t === 4) {
        // do nothing
      } else if (t === 5) {
        state.subjectGroups = state.subjectGroups.filter((item) => {
          return item._id !== d._id;
        });
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { select, unSelect, populate, append, remove } = dataSlice.actions;

export default dataSlice.reducer;
