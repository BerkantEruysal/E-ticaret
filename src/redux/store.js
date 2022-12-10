import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./accountSlice";
import languageReducer from "./languageSlice";
import navigationReducer from "./navigationSlice";
import settingsSlice from "./settingsSlice";
import { loadState } from "../browserStorage";
import contentSlice from "./contentSlice";
import modalSlice from "./modalSlice";
import searchSlice from "./searchSlice";
import dateSlice from "./dateSlice";
import currencySlice from "./currencySlice";
import mapSlice from "./mapSlice";
export default configureStore({
  reducer: {
    account: accountReducer,
    navigation: navigationReducer,
    language: languageReducer,
    settings: settingsSlice,
    content: contentSlice,
    modal: modalSlice,
    search: searchSlice,
    date: dateSlice,
    currency: currencySlice,
    map: mapSlice,
  },
  preloadedState: loadState(),
});
