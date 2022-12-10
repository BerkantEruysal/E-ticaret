import { toBeRequired } from "@testing-library/jest-dom/dist/matchers";
import React, { useState } from "react";

//Yatay listeyi kaydırma butonu. Gerekli stateleri alır, referansı verilen listeyi belirli yönde kaydırır. Kaydırma sınırlarına geldiğinde render edilmez.
const HorizontalScrollButton = ({
  direction,
  divRef,
  scrolledToRightEnd = false,
  scrolledToLeftEnd = true,
}) => {
  setTimeout(() => {}, 5000);
  const scroll = () => {
    let scrollOffset = -divRef.current.offsetWidth + 50;
    if (direction == "right") {
      scrollOffset = divRef.current.offsetWidth - 50;
    }
    divRef.current.scrollLeft += scrollOffset;
  };
  return (
    <div
      className={`position-absolute d-flex horizontal-scroll-button-wrapper  justify-content-end ${
        (scrolledToLeftEnd && direction == "left") ||
        (scrolledToRightEnd && direction == "right")
          ? "d-none"
          : ""
      }`}
      style={
        direction == "right" ? { right: 0 } : { transform: "rotate(180deg)" }
      }
    >
      <button
        style={direction == "right" ? {} : {}}
        className="horizontal-scroll-button w-25 mx-3"
        onClick={() => scroll()}
      >
        <img src={require("../assets/images/scrollArrow.svg")} alt="" />
      </button>
    </div>
  );
};

export default HorizontalScrollButton;
