import React, { useState, useEffect } from "react";
import "../../assets/style/listScreen.css";
import CheckInOption from "./CheckInOption";
import CheckOutOption from "./CheckOutOption";
import GuestOption from "./GuestOption";
import LocationOption from "./LocationOption";
import { useSelector } from "react-redux";
import { useLoadScript } from "@react-google-maps/api";
import MapHover from "../MostPopularExperiences/MapHover";
import Map from "../Map";

const Trip_ListScreenHeader = (props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBDL3c4-l1W1kQ5k_kbG_bvyy8vG69RpEU",
  });
  const filterComponents = [
    { name: "check-in", component: CheckInOption },
    { name: "guest", component: GuestOption },
    { name: "location", component: LocationOption },
  ];

  const pickedComponents = props.pickedComponents.map((element, iterator) => {
    const index = filterComponents.findIndex((item) => {
      return item.name == element.name;
    });
    const Component = filterComponents[index].component;
    return (
      <div
        key={iterator}
        className="col-12 col-md-4 list-header-filter-wrapper"
      >
        <Component data={element.data}></Component>
      </div>
    );
  });

  const isLoading = useSelector((state) => {
    return state.content.isDataLoading;
  });

  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <div className="list-screen-header-container">
          <div className="container-lg">
            <div className="row">
              <div className="col-12 col-lg-3 py-2 divListMap">
                <div
                  className="border d-flex h-100 position-relative"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => {
                    setIsHovered(false);
                  }}
                >
                  {isHovered ? <MapHover></MapHover> : <></>}
                  {isLoaded ? <Map markers={props.markers} /> : <></>}
                </div>
              </div>
              <div className="col-12 col-lg-9 py-2 divListFilter">
                <h3>{props.title}</h3>
                <h5 className="py-2">{props.props}</h5>
                <div className="row pt-2">{pickedComponents}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Trip_ListScreenHeader;
