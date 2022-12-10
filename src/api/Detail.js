import { getById } from "./main";
import store from "../redux/store";
import { setDetailContentData } from "../redux/contentSlice";
import { addToLastViews, setLastViews } from "../redux/accountSlice";

export const getContentDetail = async ({ targetName, id, targetUrl }) => {
  let cachedContentList = store.getState().content[targetName];
  let cachedContentDetail = false;

  for (let i = 0; i < cachedContentList.length; i++) {
    if (cachedContentList[i].SeName == id) {
      cachedContentDetail = cachedContentList[i];
      break;
    }
  }

  if (cachedContentDetail) {
    const fetchedData = getById(targetUrl, id, {}).then((fetchedData) => {
      store.dispatch(
        setDetailContentData({
          target: targetName,
          content: fetchedData,
        })
      );
      store.dispatch(addToLastViews(fetchedData));
    });
    return;
  }

  const fetchedData = await getById(targetUrl, id, {});

  store.dispatch(
    setDetailContentData({ target: targetName, content: fetchedData })
  );
  store.dispatch(addToLastViews(fetchedData));
  return fetchedData;
};
