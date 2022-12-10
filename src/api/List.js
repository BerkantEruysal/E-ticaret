import { setContentData, setIsDataLoading } from "../redux/contentSlice";
import store from "../redux/store";
import { getData } from "./main";

const cacheChecker = async (listName, name, fetcher) => {
  store.dispatch(setIsDataLoading(true));
  const cachedData = store.getState().content[listName];
  if (cachedData[name].length > 0) {
    if (
      cachedData.WorkingLanguageId !=
      store.getState().language.defaultLanguage.Id
    ) {
      const fetchedData = await fetcher();
      store.dispatch(
        setContentData({ target: listName, content: fetchedData })
      );
      store.dispatch(setIsDataLoading(false));
      return fetchedData;
    }
    fetcher().then((data) => {
      store.dispatch(setContentData({ target: listName, content: data }));
      store.dispatch(setIsDataLoading(false));
    });

    return cachedData;
  }
  const fetchedData = await fetcher();
  store.dispatch(setContentData({ target: listName, content: fetchedData }));
  store.dispatch(setIsDataLoading(false));
  return fetchedData;
};

export const getListScreenContent = async ({ listName, name, route, body }) => {
  return await cacheChecker(listName, name, async () => {
    const a = await getData(route, body);

    return a;
  });
};
