import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  generalDate: { start: null, end: null },
};

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setGeneralDate: (state, action) => {
      state.generalDate = action.payload;
      return state;
    },
  },
});

export const { setGeneralDate } = dateSlice.actions;

export default dateSlice.reducer;
