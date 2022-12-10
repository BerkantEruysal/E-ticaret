import React from "react";
import ListScreen from "./ListScreen";
import { ReactComponent as TypeIcon } from "../assets/images/hotelsIcon.svg";

const HotelListScreen = () => {
  return (
    <ListScreen
      apiRoute={"/Hotel/List"}
      itemBaseUrl={""}
      listType={"Hotels"}
      listName={"hotelList"}
      TypeIcon={TypeIcon}
      entityGroup={2}
      pickedComponents={[
        { name: "check-in", data: {} },
        {
          name: "guest",
          data: { pickedComponents: ["adult", "child", "room"] },
        },
        { name: "location" },
      ]}
    ></ListScreen>
  );
};

export default HotelListScreen;
