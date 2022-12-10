import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resource: null,
  defaultLanguage: null,
  languages: null,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setResource: (state, action) => {
      state.resource = action.payload;
    },
    setDefaultLanguage: (state, action) => {
      state.defaultLanguage = action.payload;
    },
    setLanguages: (state, action) => {
      state.languages = action.payload;
    },
    changeLanguage: (state, action) => {
      state.defaultLanguage.IsDefault = false;
      state.defaultLanguage = state.languages.filter(
        (language) => language.Id == action.payload
      )[0];
      state.defaultLanguage.IsDefault = true;
    },
  },
});

export const {
  setResource,
  setDefaultLanguage,
  setLanguages,
  changeLanguage,
} = languageSlice.actions;

export default languageSlice.reducer;
