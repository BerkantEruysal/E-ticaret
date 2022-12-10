import React, { useRef, useState, useEffect } from "react";
import PopularExperience from "./PopularExperience";
import HorizontalScrollButton from "../HorizontalScrollButton";

//En popüler deneyimlerin yatay-kaydırmalı şekilde sıralandığı bir component.
const MostPopularExperiences = ({ popularExperienceList }) => {
  useEffect(() => {
    scrollHandler();
  }, []);
  const scrollableDivRef = useRef(null);
  const [isScrolledToRightEnd, setIsScrolledToRightEnd] = useState(false);
  const [isScrolledToLeftEnd, setIsScrolledToLeftEnd] = useState(true);
  const scrollHandler = (event) => {
    if (
      scrollableDivRef.current.scrollWidth -
        scrollableDivRef.current.offsetWidth <
      scrollableDivRef.current.scrollLeft + 20
    ) {
      setIsScrolledToRightEnd(true);
    } else {
      setIsScrolledToRightEnd(false);
    }
    if (scrollableDivRef.current.scrollLeft == 0) {
      setIsScrolledToLeftEnd(true);
    } else {
      setIsScrolledToLeftEnd(false);
    }
  };
  const scrollListRef = useRef();
  return (
    <div className="d-flex align-items-center position-relative">
      <HorizontalScrollButton
        divRef={scrollableDivRef}
        direction="left"
        scrolledToLeftEnd={isScrolledToLeftEnd}
        scrolledToRightEnd={isScrolledToRightEnd}
      ></HorizontalScrollButton>
      <div
        className="d-flex align-items-stretch   place-list-container gap-3 py-2 position-relative w-100"
        ref={scrollableDivRef}
        onScroll={(event) => scrollHandler(event)}
      >
        {popularExperienceList.map((experience) => {
          return (
            <PopularExperience
              title={experience.title}
              rate={experience.rate}
              rateCount={experience.rateCount}
              TypeIcon={experience.TypeIcon}
              price={experience.price}
              interest={experience.interest}
              images={experience.images}
              location={experience.location}
              targetUrl={experience.targetUrl}
              menuUrl={experience.menuUrl}
              id={experience.id}
              key={experience.title}
              data={experience}
            ></PopularExperience>
          );
        })}
      </div>
      <HorizontalScrollButton
        divRef={scrollableDivRef}
        direction="right"
        scrolledToLeftEnd={isScrolledToLeftEnd}
        scrolledToRightEnd={isScrolledToRightEnd}
      ></HorizontalScrollButton>
    </div>
  );
};

export default MostPopularExperiences;
