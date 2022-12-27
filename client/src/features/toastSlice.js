import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "Info",
  body: "",
  shown: false,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action) => {
      const p = action.payload;
      state.shown = true;
      state.body = p.body;
    },
    hideToast: (state, action) => {
      state.shown = false;
      state.body = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;
