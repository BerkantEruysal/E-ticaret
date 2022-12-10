import React, { useState } from "react";
import { ReactComponent as HeartIcon } from "../../assets/images/heartIcon.svg";
import { Link } from "react-router-dom";
import LikeButton from "../LikeButton";
import { toggleWishListItem } from "../../api/common";
import DynamicLink from "../../DynamicLink";

const ExperienceVisual = ({
  isWish,
  images,
  pageName,
  Id,
  entityGroup,
  data,
  isHoverable,
}) => {
  const id = `id${Id}`;
  const imageElements = [];
  const indicatorElements = [];

  if (images.length > 1) {
    indicatorElements.push(
      <button
        key={0}
        type="button"
        data-bs-target={`#${id}`}
        data-bs-slide-to="0"
        className="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
    );
  }

  for (let i = 1; i < images.length; i++) {
    imageElements.push(
      <div className="visual-item-wrapper carousel-item" key={i}>
        {isHoverable ? (
          <img
            className="visual-item-image"
            src={images[i]}
            alt="Popular Experience Image"
          />
        ) : (
          <Link to={DynamicLink(pageName)}>
            <img
              className="visual-item-image"
              src={images[i]}
              alt="Popular Experience Image"
            />
          </Link>
        )}
      </div>
    );

    indicatorElements.push(
      <button
        key={i}
        type="button"
        data-bs-target={`#${id}`}
        data-bs-slide-to={i}
        aria-label={`Slide ${i}`}
      ></button>
    );
  }

  return (
    <div className="bg-dark w-100 h-100 position-relative">
      <div id={id} className="w-100 h-100 carousel slide" data-bs-ride="true">
        <div className="btnLike"></div>

        <div className="carousel-inner w-100 h-100">
          <div className="visual-item-wrapper carousel-item w-100 h-100 active">
            {isHoverable ? (
              <img
                className="visual-item-image"
                src={images[0]}
                alt="Popular Experience Image"
              />
            ) : (
              <Link to={DynamicLink(pageName)}>
                <img
                  className="visual-item-image"
                  src={images[0]}
                  alt="Popular Experience Image"
                />
              </Link>
            )}
          </div>
          {imageElements}
        </div>

        <div
          className="carousel-indicators m-0 pb-2"
          style={{
            background:
              "linear-gradient(0deg, rgba(0,0,0,0.5), rgba(255,255,255,0) )",
          }}
        >
          {indicatorElements}
        </div>

        {images.length > 1 ? (
          <>
            <button
              style={{
                background:
                  "linear-gradient(90deg, rgba(30 , 30 , 30 , 0.5) , rgba(0 , 0 , 0 , 0) )",
              }}
              className="carousel-control-prev"
              type="button"
              data-bs-target={`#${id}`}
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              style={{
                background:
                  "linear-gradient(90deg, rgba(0 , 0 , 0 , 0) , rgba(30 , 30 , 30 , 0.5))",
              }}
              className="carousel-control-next"
              type="button"
              data-bs-target={`#${id}`}
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ExperienceVisual;
