import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isListScreenMapExtended: false,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setIsListScreenMapExtended: (state, action) => {
      state.isListScreenMapExtended = action.payload;
    },
  },
});

export const { setIsListScreenMapExtended } = mapSlice.actions;

export default mapSlice.reducer;
