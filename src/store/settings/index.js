import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dark: false,
};

export const settingSlice = createSlice({
  name: "settingSlice",
  initialState,
  reducers: {
    setDark: (state, action) => {
      state.dark = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDark } = settingSlice.actions;

export default settingSlice.reducer;
