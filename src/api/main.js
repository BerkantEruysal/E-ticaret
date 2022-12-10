import { guestLogin } from "./Authentication";
import Cookies from "universal-cookie";
import store from "../redux/store";
import { setUserCredentials } from "../redux/accountSlice";
import { setContentData } from "../redux/contentSlice";

export const config = {
  baseUrl: "https://skiapi.meriz.net/api/v1",
  //baseUrl: "https://localhost:7196/api/v1",
};

//login({
//  email: "deniz.yildiz@webupbilisim.com",
//  password: "123",
//}).then((data) => {});

export const getUserToken = async () => {
  var usertoken = store.getState().account.userCredentials.Token;

  if (usertoken == null || usertoken == "") {
    var token = await guestLogin().then((data) => {
      store.dispatch(setUserCredentials(data.User));

      return data.User.Token;
    });
    return token;
  }
  return usertoken;
};

export const getData = async (url, body) => {
  try {
    const token = await getUserToken();
    const response = await fetch(`${config.baseUrl}` + url, {
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
      body: JSON.stringify({
        ...body,
      }),
    });
    if (response.status == 401) {
      await guestLogin().then((data) => {
        store.dispatch(setUserCredentials(data.User));
      });
      return getData(url, body);
    }
    return response.json();
  } catch (err) {
    console.log(err);
    window.location.reload(false);
    return await getData(url, body);
  }
};

const getLanguageId = () => {
  let result;
  try {
    result = store.getState().language.defaultLanguage.Id;
  } catch {
    result = null;
  }
  return result;
};

export const getById = async (url, id, body) => {
  try {
    var token = await getUserToken();
    const response = await fetch(`${config.baseUrl}` + url + `${id}`, {
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
      body: JSON.stringify({
        ...body,
        languageId: store.getState().language.defaultLanguage.Id,
      }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
    return await getById(url, id, body);
  }
};

export const getMainScreenContent = async () => {
  let cachedData = store.getState().content.mainScreenContent;
  if (cachedData.Hotels) {
    const fetchedData = getData("/Home/Index").then((data) => {
      store.dispatch(
        setContentData({ target: "mainScreenContent", content: data })
      );
    });

    return cachedData;
  }
  const fetchedData = await getData("/Home/Index");

  store.dispatch(
    setContentData({ target: "mainScreenContent", content: fetchedData })
  );
};
