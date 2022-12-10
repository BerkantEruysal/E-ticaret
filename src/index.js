import React from "react";
import ReactDOM from "react-dom/client";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { CustomProvider } from "rsuite";
import Navigation from "./screens/Navigation";
import { debounce } from "debounce";
import { saveState } from "./browserStorage";
require("dotenv").config();

store.subscribe(
  debounce(() => {
    saveState(store.getState());
  }, 800)
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <CustomProvider theme="light">
      <BrowserRouter>
        <Navigation></Navigation>
      </BrowserRouter>
    </CustomProvider>
  </Provider>
);
