import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedInPerson: null,
};

/*
  userTypes
  1- admin
  2- registrar
  3- instructor
  4- student
  5- guardian
*/

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const p = action.payload;
      localStorage.setItem("token", p.token);
      state.loggedInPerson = p.loggedInPerson;
    },
    authenticate: (state, action) => {
      const p = action.payload;
      state.loggedInPerson = p.loggedInPerson;
    },
    logout: (state) => {
      localStorage.clear();
      state.loggedInPerson = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, authenticate, logout } = authSlice.actions;

export default authSlice.reducer;
