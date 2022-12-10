import { getData } from "./main";
import { useSelector, useDispatch } from "react-redux/es/exports";
import store from "../redux/store";
import {
  changeLanguage,
  setDefaultLanguage as setDefaultLanguageRedux,
  setLanguages,
  setResource,
} from "../redux/languageSlice";
import { saveState } from "../browserStorage";
import { setSettings } from "../redux/settingsSlice";
import { resetContentData } from "../redux/contentSlice";
import {
  addToLastViews,
  setLastViews,
  setWishList,
  toggleWishListItem as reduxToggleWishListItem,
  addToShoppingCart as reduxAddToShoppingCart,
  removeFromShoppingCart as reduxRemoveFromShoppingCart,
  setShoppingCart,
} from "../redux/accountSlice";
import { useNavigate } from "react-router-dom";
import {
  setTopMenuPages,
  setFooterMenuPages,
  setBottomMenuPages,
} from "../redux/navigationSlice";

export const getAllResources = async (id) => {
  var resources = await getData(`/Common/GetAllResource`, { languageId: id });
  store.dispatch(setResource(resources));
  return resources;
};

export const getAllLanguages = async () => {
  let languages = await getData(`/Common/GetAllLanguage`, {});
  store.dispatch(setLanguages(languages));
  return getDefaultLanguage(languages);
};

export const getDefaultLanguage = async (languages) => {
  const defaultLanguage = languages.filter((language) => language.IsDefault)[0];
  store.dispatch(setDefaultLanguageRedux(defaultLanguage));
  return defaultLanguage.Id;
};

export const changeDefaultLanguage = async (id, currentUrl, navigate) => {
  store.dispatch(changeLanguage(id));
  await getData("/Common/SetLanguage", {
    langid: id,
    returnUrl: "/en/kartalkaya-ski-resort",
  });
  await getAllResources(id);

  store.dispatch(resetContentData());
  store.dispatch(setTopMenuPages([]));
  await getTopMenuPages();
  await getLastViews();
  await saveState(store.getState());
  window.location.reload();
};

export const getAllSettings = async () => {
  const settings = store.getState().settings;
  if (settings.LocalizationSettings == null) {
    let fetchedSettings = await getData(`/Common/GetAllSettings`, {});
    store.dispatch(setSettings(fetchedSettings));
  }
};

export const toggleWishListItem = async ({ data }) => {
  store.dispatch(reduxToggleWishListItem(data));
  const result = await getData("/Common/AddOrRemoveWishItem", {
    entityKey: data.Id,
    entityGroup: data.RecordEntityGroup,
  });
};

export const getWishListItems = async () => {
  getData("/User/Wishes").then((data) => {
    store.dispatch(setWishList(data));
  });
  return store.getState().account.WishList;
};

export const getTopMenuPages = async () => {
  const cachedData = store.getState().navigation.topMenuPages;

  if (!cachedData || cachedData.length == 0) {
    const data = await getData("/Common/GetTopMenuPages");
    store.dispatch(setTopMenuPages(data.Pages));
    return data;
  }
  getData("/Common/GetTopMenuPages").then((data) => {
    store.dispatch(setTopMenuPages(data.Pages));
  });
  return;
};
export const getFooterMenuPages = async () => {
  const cachedData = store.getState().navigation.footerMenuPages;
  if (!cachedData || cachedData.length == 0) {
    const data = await getData("/Common/GetFooterMenuPages");
    store.dispatch(setFooterMenuPages(data.Pages));
    return data;
  }
  getData("/Common/GetFooterMenuPages").then((data) => {
    store.dispatch(setFooterMenuPages(data.Pages));
  });
  return;
};
export const getBottomMenuPages = async () => {
  const cachedData = store.getState().navigation.bottomMenuPages;
  if (!cachedData || cachedData.length == 0) {
    const data = await getData("/Common/GetBottomMenuPages");
    store.dispatch(setBottomMenuPages(data.Pages));
    return data;
  }
  getData("/Common/GetBottomMenuPages").then((data) => {
    store.dispatch(setBottomMenuPages(data.Pages));
  });
  return;
};

export const getLastViews = async () => {
  let mockUpList = [];
  const isAlreadyThere = (item) => {
    return mockUpList.some((i) => {
      console.log(item);
      return item.EntityObject.Title == i.EntityObject.Title;
    });
  };
  getData("/User/Views").then((data) => {
    console.log(data);
    data.ViewList.Views.map((item) => {
      if (!isAlreadyThere(item)) {
        mockUpList.push(item);
      }
    });
    store.dispatch(setLastViews(mockUpList));
  });
};

export const addToShoppingCart = async ({
  id,
  priceId,
  currencyId,
  data,
  startDate,
  endDate,
}) => {
  await getData("/ShoppingCart/AddShoppingCartItem", {
    id,
    priceId,
    currencyId,
    startDate,
    endDate,
  });

  await getShoppingCart();
};

export const removeFromShoppingCart = async ({
  id,
  priceId,
  currencyId,
  data,
}) => {
  await getData("/ShoppingCart/RemoveShoppingCartItem", {
    id,
    priceId,
    currencyId,
  });
  return await getShoppingCart();
};

export const getShoppingCart = async () => {
  const response = await getData("/ShoppingCart/GetShoppingCart");

  if (response.ShoppingCart) {
    store.dispatch(setShoppingCart(response.ShoppingCart.ShoppingCartItems));
    return response.ShoppingCart.ShoppingCartItems;
  }
  store.dispatch(setShoppingCart([]));
  return [];
};

export const createOrder = async () => {
  const response = await getData("/ShoppingCart/GetMiniShoppingCart", {
    userId: store.getState().account.userCredentials.Id,
  });
  await getShoppingCart();
};

export const setCurrency = async (id) => {
  const response = await getData("/Common/SetCurrency", {
    customerCurrency: id,
    returnUrl: "/en/kartalkaya-ski-resort",
  });
};
