import React from "react";
import ListScreen from "./ListScreen";
import { useRequestSender } from "../Hooks";
import { getTourList } from "../api/List";
import { ReactComponent as TypeIcon } from "../assets/images/toursIcon.svg";
import LoadingIndicator from "../components/LoadingIndicator";

const TourListScreen = () => {
  return (
    <ListScreen
      apiRoute={"/Tour/List"}
      itemBaseUrl={"/Tour/detail/"}
      listType={"Tours"}
      listName={"tourList"}
      TypeIcon={TypeIcon}
      entityGroup={3}
      pickedComponents={[
        { name: "check-in", data: {} },
        {
          name: "guest",
          data: { pickedComponents: ["adult", "child"] },
        },
        { name: "location", data: {} },
      ]}
    ></ListScreen>
  );
};

export default TourListScreen;
