import React from "react";
import ListScreen from "./ListScreen";
import { useRequestSender } from "../Hooks";
import { getSkiSchoolList } from "../api/List";
import { ReactComponent as TypeIcon } from "../assets/images/schoolsIcon.svg";
import LoadingIndicator from "../components/LoadingIndicator";

const SkiSchoolListScreen = () => {
  return (
    <ListScreen
      apiRoute={"/SkiSchool/List"}
      itemBaseUrl={"/ski-school/detail/"}
      listType={"SkiSchools"}
      listName={"skiSchoolList"}
      TypeIcon={TypeIcon}
      entityGroup={5}
      pickedComponents={[
        { name: "check-in", data: {} },
        { name: "guest", data: { pickedComponents: ["adult", "child"] } },
        { name: "location", data: {} },
      ]}
    ></ListScreen>
  );
};

export default SkiSchoolListScreen;
