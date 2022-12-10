import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  localizationSettings: null,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
