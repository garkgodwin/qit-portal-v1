import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  screenLoading: false,
  formLoading: false,
};

/*
  userTypes
  1- admin
  2- registrar
  3- instructor
  4- student
  5- guardian
*/

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    startScreenLoading: (state) => {
      state.screenLoading = true;
    },
    stopScreenLoading: (state) => {
      state.screenLoading = false;
    },
    startFormLoading: (state) => {
      state.formLoading = true;
    },
    stopFormLoading: (state) => {
      state.formLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  startScreenLoading,
  stopScreenLoading,
  startFormLoading,
  stopFormLoading,
} = loadingSlice.actions;

export default loadingSlice.reducer;
