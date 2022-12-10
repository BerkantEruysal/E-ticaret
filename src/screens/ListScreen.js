import React from "react";
import { SelectPicker } from "rsuite";
import ListScreenHeader from "../components/ListScreenHeader/ListScreenHeader";
import Trip_ListScreenHeader from "../components/ListScreenHeader/Trip_ListScreenHeader";
import ListScreenBreadcrumb from "../components/ListScreenHeader/ListScreenBreadcrumb";
import List from "../components/ListScreenContent/List";
import ListFilter from "../components/ListScreenContent/ListFilter";
import LoadingIndicator from "../components/LoadingIndicator";
import { useRequestSender } from "../Hooks";
import { getListScreenContent } from "../api/List";
import { useSelector } from "react-redux/es/hooks/useSelector";
import store from "../redux/store";
import { getCurrentUrlObject } from "../PureFunctions";
import { useLocation } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import Map from "../components/Map";
import CloseMapButton from "../components/CloseMapButton";
import { useLoadScript } from "@react-google-maps/api";
import { useEffect } from "react";
import { useState } from "react";
const ListScreen = ({
  itemBaseUrl,
  listType,
  listName,
  TypeIcon,
  apiRoute,
  entityGroup,
  pickedComponents,
}) => {
  const [data, error, isLoading] = useRequestSender(getListScreenContent, {
    listName: listName,
    name: listType,
    route: apiRoute,
    body: { Deleted: false },
  });
  const cachedData = useSelector((state) => {
    const content = state.content[listName];
    return content;
  });

  const location = useLocation();

  const filterData = ["En iyi değer", "En çok ziyaret edilen"].map((item) => ({
    label: item,
    value: item,
  }));
  PageTitle(listType.replace(/([A-Z])/g, " $1").trim());

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBDL3c4-l1W1kQ5k_kbG_bvyy8vG69RpEU",
  });

  const isMapExtended = useSelector((state) => {
    return state.map.isListScreenMapExtended;
  });

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (data) {
      const markerList = data[listType].map((element) => {
        return {
          id: element.Id,
          name: element.Title,
          position: {
            lat: element.Latitude,
            lng: element.Longtitude,
          },
        };
      });
      setMarkers(markerList);
    }
  }, [data]);
  return (
    <>
      {isLoading ? (
        <LoadingIndicator></LoadingIndicator>
      ) : (
        <div className="list-screen-container pb-2">
          <ListScreenBreadcrumb
            title={listType.replace(/([A-Z])/g, " $1").trim()}
          ></ListScreenBreadcrumb>
          <Trip_ListScreenHeader
            markers={markers}
            pickedComponents={pickedComponents}
            title={getCurrentUrlObject(location.pathname).Title}
          ></Trip_ListScreenHeader>
          <div className="d-flex container-lg mt-2  ">
            <div className="col-3 bg-white d-none d-lg-block">
              <ListFilter
                apiRoute={apiRoute}
                listName={listName}
                listType={listType}
                data={data}
              ></ListFilter>
            </div>
            <div className="col-12 col-lg-9 d-flex flex-column ps-lg-3 ps-0">
              <div className="row mb-3">
                <div className="col d-flex align-items-center">
                  <strong>
                    {cachedData[listType].length}{" "}
                    {listType.replace(/([A-Z])/g, " $1").trim()}
                  </strong>
                </div>
                <div className="col d-flex justify-content-end">
                  <SelectPicker
                    placeholder="Sıralama Kriteri : "
                    renderValue={(value, item) => {
                      return (
                        <div>
                          <span style={{ color: "#575757" }}>
                            Sıralama Kriteri :
                          </span>{" "}
                          {value}
                        </div>
                      );
                    }}
                    data={filterData}
                    cleanable={false}
                    searchable={false}
                    style={{ width: 224 }}
                  />
                </div>
              </div>
              <div className="row h-100">
                <div className="col">
                  {isLoaded && isMapExtended && (
                    <div className="extended-map-container mb-5">
                      <div className="mb-2">
                        <CloseMapButton></CloseMapButton>
                      </div>
                      <Map markers={markers}></Map>
                    </div>
                  )}
                  <List
                    itemBaseUrl={itemBaseUrl}
                    data={cachedData}
                    listType={listType}
                    TypeIcon={TypeIcon}
                    entityGroup={entityGroup}
                  ></List>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListScreen;
