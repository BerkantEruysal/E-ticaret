import React from "react";
import ListScreen from "./ListScreen";
import { useRequestSender } from "../Hooks";
import { getRestaurantList } from "../api/List";
import { ReactComponent as TypeIcon } from "../assets/images/foodIcon.svg";
import LoadingIndicator from "../components/LoadingIndicator";

const RestaurantListScreen = () => {
  return (
    <ListScreen
      apiRoute={"/restaurant/list"}
      itemBaseUrl={"/Restaurant/detail/"}
      listType={"Restaurants"}
      listName={"restaurantList"}
      TypeIcon={TypeIcon}
      entityGroup={8}
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

export default RestaurantListScreen;
