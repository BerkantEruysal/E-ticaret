import React, { useState } from "react";
import "../../assets/style/listScreen.css";
import CheckInOption from "../ListScreenHeader/CheckInOption";
import GuestOption from "../ListScreenHeader/GuestOption";
import LocationOption from "../ListScreenHeader/LocationOption";
import { Col, Row } from "rsuite";
import Map from "../Map";
import { useLoadScript } from "@react-google-maps/api";
import MapHover from "../MostPopularExperiences/MapHover";

const DetailScreenFilter = (props) => {
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
      <Col key={iterator} xs={24} sm={24} style={{ marginBottom: 15 }}>
        <Component data={element.data}></Component>
      </Col>
    );
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBDL3c4-l1W1kQ5k_kbG_bvyy8vG69RpEU",
  });
  return (
    <Col
      {...props.wrapperProps}
      className="list-screen-header-container container-lg"
    >
      <Row>
        <div className="bg-body p-3 ">
          <div className="row h-100">
            <div className="row col-12 divListFilter">
              <h5>{props.title}</h5>
              <Col xs={24} sm={12} lg={24} className="mt-2">
                {pickedComponents}
              </Col>
              <Col
                xs={24}
                sm={12}
                lg={24}
                className=" div-detail-map"
                style={{ minHeight: 145 }}
              >
                <div className="border d-flex h-100">
                  {isLoaded ? (
                    <Map
                      markers={[props.coordinate]}
                      center={props.coordinate.position}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </Col>
            </div>
          </div>
        </div>
      </Row>
    </Col>
  );
};

export default DetailScreenFilter;
