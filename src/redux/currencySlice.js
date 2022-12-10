import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currencyList: [
    {
      id: 1,
      name: "Tl",
    },
    {
      id: 2,
      name: "Euro",
    },
    {
      id: 3,
      name: "Dollar",
    },
  ],
  defaultCurrency: {
    id: 1,
    name: "Tl",
  },
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setDefaultCurrency: (state, action) => {
      state.defaultCurrency = action.payload;
      return state;
    },
  },
});

export const { setDefaultCurrency } = currencySlice.actions;

export default currencySlice.reducer;
