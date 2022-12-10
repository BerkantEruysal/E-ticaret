import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { stateSetter } from "../../redux/modalSlice";
import { Link } from "react-router-dom";
import DynamicLink from "../../DynamicLink";

const RestaurantHover = (props) => {
  const dispatch = useDispatch();
  return (
    <div className="card-img-overlay experience-hover" style={{ zIndex: 500 }}>
      <div
        className="experience-hover-button"
        onClick={() => {
          dispatch(
            stateSetter({ name: "restaurantModalData", state: props.data })
          );
          dispatch(
            stateSetter({ name: "isRestaurantModalActive", state: true })
          );
        }}
      >
        <span>Make a reservation</span>
      </div>
      <div className="experience-hover-button">
        <Link to={DynamicLink(props.pageName)}>See Details</Link>
      </div>
    </div>
  );
};

export default RestaurantHover;
