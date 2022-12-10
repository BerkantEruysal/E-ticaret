import { config, getData, getUserToken } from "./main";
import {
  setUserCredentials,
  login as reduxLogin,
  logout as reduxLogout,
} from "../redux/accountSlice";
import store from "../redux/store";
import { saveState } from "../browserStorage";
import {
  getAllLanguages,
  getAllResources,
  getLastViews,
  getWishListItems,
} from "./common";

export const login = async ({ email, password }) => {
  try {
    const response = await getData("/Auth/Login", {
      email: email,
      password: password,
    });

    if (response.Data.User != undefined) {
      store.dispatch(setUserCredentials(response.Data.User));
      store.dispatch(reduxLogin());
      getWishListItems();
      getLastViews();

      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export const guestLogin = async () => {
  try {
    const response = await fetch(`${config.baseUrl}/Auth/GetUserInfo`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });

    return response.json();
  } catch (err) {
    console.log(err);
    return await guestLogin();
  }
};

export const logout = async () => {
  const token = await getUserToken();
  store.dispatch(reduxLogout());
  await fetch(`${config.baseUrl}/Auth/Logout`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  saveState(store.getState());
  window.location.reload();
};

export const register = async (data) => {
  const response = await getData("/Auth/Register", data);

  if (response.StatusCode) {
    return false;
  }

  store.dispatch(setUserCredentials(response.User));
  store.dispatch(reduxLogin());

  return true;
};
