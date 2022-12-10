import React from "react";
import "../../assets/style/listScreen.css";
import CheckInOption from "./CheckInOption";
import CheckOutOption from "./CheckOutOption";
import GuestOption from "./GuestOption";
import LocationOption from "./LocationOption";

const ListScreenHeader = (props) => {
  return (
    <div className="list-screen-header-wrapper card">
      <img
        src={require("../../assets/images/hotelsListScreenBackground.jpg")}
        className="list-screen-header-image card-img"
        alt=""
      />
      <div className="list-screen-header-content-container card-img-overlay d-flex flex-column justify-content-around align-items-center">
        <h1 className="text-light fw-light text-center display-3 ">
          {props.title}
        </h1>
        <div className="d-flex container-lg justify-content-center flex-lg-row flex-column align-items-center gap-5">
          <CheckInOption></CheckInOption>
          <GuestOption></GuestOption>
          <LocationOption></LocationOption>
        </div>
      </div>
    </div>
  );
};

export default ListScreenHeader;
