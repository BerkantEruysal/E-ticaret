import store from "./redux/store";

export function getCurrentUrlObject(currentUrl) {
  let newUrl = currentUrl;
  newUrl = newUrl.split("/");
  newUrl.splice(0, 2);
  newUrl = newUrl.join("/");

  let index;
  index = store.getState().navigation.topMenuPages.findIndex((item) => {
    return item.SeName == newUrl;
  });

  if (index != -1) {
    return store.getState().navigation.topMenuPages[index];
  }

  index = store.getState().navigation.routes.findIndex((item) => {
    return item.url == newUrl;
  });

  if (index != -1) {
    return store.getState().navigation.routes[index];
  }

  index = store.getState().navigation.detailPages.findIndex((item) => {
    return item.Slug == newUrl;
  });

  if (index != -1) {
    return store.getState().navigation.detailPages[index];
  }
}
