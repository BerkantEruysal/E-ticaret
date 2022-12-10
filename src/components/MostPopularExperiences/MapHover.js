import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { stateSetter } from "../../redux/modalSlice";
import { Link } from "react-router-dom";
import DynamicLink from "../../DynamicLink";
import { setIsListScreenMapExtended } from "../../redux/mapSlice";

const MapHover = (props) => {
  const dispatch = useDispatch();
  const isMapExtended = useSelector((state) => {
    return state.map.isListScreenMapExtended;
  });

  const handleClick = () => {
    dispatch(setIsListScreenMapExtended(!isMapExtended));
  };
  return (
    <div className="map-hover" style={{ zIndex: 500 }}>
      <div className="map-hover-button">
        <span onClick={handleClick} className="unselectable">
          {isMapExtended ? "Close Map" : "Open Map"}
        </span>
      </div>
    </div>
  );
};

export default MapHover;
