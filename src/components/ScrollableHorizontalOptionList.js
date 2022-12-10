import React, { useRef, useState, useEffect } from "react";
import IconTextOption from "./IconTextOption";

import HorizontalScrollButton from "./HorizontalScrollButton.js";

// Turlar, Hoteller gibi içerikleri sıralar. Mobil cihazlarda yatay kaydırmalı liste şeklini alır. Kaydırmak için kullanılan butonlara gerekli state'leri aktarır.
const ScrollableHorizontalOptionList = ({ optionList, isFullWidth }) => {
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

  return (
    <div className="d-flex align-items-center position-relative">
      <HorizontalScrollButton
        divRef={scrollableDivRef}
        direction="left"
        scrolledToLeftEnd={isScrolledToLeftEnd}
        scrolledToRightEnd={isScrolledToRightEnd}
      ></HorizontalScrollButton>
      <div
        className="d-flex  place-list-container gap-3 py-2 position-relative w-100"
        ref={scrollableDivRef}
        onScroll={(event) => scrollHandler(event)}
      >
        {optionList.map((option, index) => {
          return (
            <div key={index} className={`${isFullWidth ? "col" : ""}`}>
              <IconTextOption
                optionText={option.Title}
                optionSecondText={option.secondText}
                locationText={option.locationText}
                Icon={option.Icon}
                targetPage={option.SeName}
              ></IconTextOption>
            </div>
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

export default ScrollableHorizontalOptionList;
