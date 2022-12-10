import React, { useState, useEffect } from "react";
import RatingInfo from "../RatingInfo/RatingInfo";
import ExperienceVisual from "./ExperienceVisual";
import { Link } from "react-router-dom";
import HotelHover from "./HotelHover";
import RestaurantHover from "./RestaurantHover";
import SkiSchoolHover from "./SkiSchoolHover";
import TourHover from "./TourHover";

//Popüler bir deneyimin minimize edilmiş bir gösterimi. Tıklandığında belirli deneyimin detay sayfası açılıyor.
const PopularExperience = ({
  title,
  rate,
  rateCount,
  price,
  TypeIcon,
  interest,
  images,
  pageName,
  location,
  menuUrl,
  id,
  entityKey,
  entityGroup,
  isWish,
  data,
  ListType,
  isHoverable,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  let HoverComponent;

  if (ListType == "Tour") {
    HoverComponent = TourHover;
  } else if (ListType == "Restaurant") {
    HoverComponent = RestaurantHover;
  } else if (ListType == "Hotel") {
    HoverComponent = HotelHover;
  } else if (ListType == "SkiSchool") {
    HoverComponent = SkiSchoolHover;
  } else if (ListType == "Tour") {
    HoverComponent = TourHover;
  }

  return (
    <div className="popular-experience position-relative ">
      <div className=" card text-decoration-none link-dark h-100">
        <div
          className="card-img-top"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
        >
          {isHovered && HoverComponent && isHoverable ? (
            <HoverComponent data={data} pageName={pageName}></HoverComponent>
          ) : (
            <></>
          )}
          <ExperienceVisual
            interest={interest}
            images={images}
            pageName={pageName}
            id={id}
            entityKey={entityKey}
            entityGroup={entityGroup}
            isWish={isWish}
            data={data}
            isHoverable={isHoverable}
          ></ExperienceVisual>
        </div>

        <div className="card-body p-0 px-2 pt-2">
          <p className="card-text fw-bold p-0 m-0">{title}</p>
          <RatingInfo
            rate={rate}
            rateCount={rateCount}
            TypeIcon={TypeIcon}
          ></RatingInfo>
          <div className="d-flex" style={{ marginLeft: -3 }}>
            <img
              src={require("../../assets/images/locationIcon.svg")}
              alt="location icon"
            />
            <p className="p-0 m-0">{location}</p>
          </div>
          {price && (
            <div className=" m-0 d-flex gap-1">
              <p className="d-inline fw-bold m-0 p-0 ">${price} </p>
              <p className="m-0"> per adult</p>
            </div>
          )}
          {menuUrl && (
            <Link className="link-secondary" to={menuUrl}>
              Click to see menu and details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopularExperience;
