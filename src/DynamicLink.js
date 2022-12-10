import store from "./redux/store";

export default function(pageName) {
  let targetPage;

  if (pageName == "home-page") {
    const createdUrl = `/${
      store.getState().language.defaultLanguage.UniqueSeoCode
    }/`;
    return createdUrl;
  }

  store.getState().navigation.topMenuPages.map((page) => {
    if (page.SeName == pageName) {
      targetPage = page;
    }
  });
  if (targetPage != undefined) {
    const createdUrl = `/${
      store.getState().language.defaultLanguage.UniqueSeoCode
    }/${targetPage.SeName}`;
    return createdUrl;
  }

  store.getState().navigation.routes.map((page) => {
    if (page.pageName == pageName) {
      targetPage = page;
    }
  });
  if (targetPage != undefined) {
    const createdUrl = `/${
      store.getState().language.defaultLanguage.UniqueSeoCode
    }/${targetPage.url}`;
    return createdUrl;
  }

  const index = store
    .getState()
    .navigation.detailPages.findIndex((element) => element.Slug == pageName);

  if (index != -1) {
    targetPage = store.getState().navigation.detailPages[index];

    const createdUrl = `/${
      store.getState().language.defaultLanguage.UniqueSeoCode
    }/${targetPage.Slug}`;
    return createdUrl;
  }
}
