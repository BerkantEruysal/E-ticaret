import React from "react";
import ListScreen from "./ListScreen";
import { useRequestSender } from "../Hooks";
import { getSkiResortList } from "../api/List";
import { ReactComponent as TypeIcon } from "../assets/images/resortsIcon.svg";
import LoadingIndicator from "../components/LoadingIndicator";

const SkiResortListScreen = () => {
  return (
    <ListScreen
      apiRoute={"/SkiResort/List"}
      itemBaseUrl={"/ski-resort/detail/"}
      listType={"SkiResorts"}
      listName={"skiResortList"}
      TypeIcon={TypeIcon}
      entityGroup={1}
      pickedComponents={[
        { name: "check-in", data: {} },
        {
          name: "guest",
          data: { pickedComponents: ["adult", "child"] },
        },
        { name: "location" },
      ]}
    ></ListScreen>
  );
};

export default SkiResortListScreen;
