import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Lazy, Navigation, Virtual } from "swiper";
import HeartIcon from "@rsuite/icons/legacy/Heart";
import { Panel, Rate, Grid, Row, Col } from "rsuite";
import "../../assets/style/contentBoxSlider.css";
import LikeButton from "../LikeButton";
import PopularExperience from "../MostPopularExperiences/PopularExperience";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

const ContentBoxSlider = (props) => {
  const [listType, setListType] = useState("");
  const [list, setList] = useState([]);
  const [contentBoxSwiper, setContentBoxSwiper] = useState(null);

  useEffect(() => {
    if (props.ListType != null) {
      switch (props.ListType) {
        default:
          setListType(props.ListType);
          setList(props.List);
          break;
      }
    }
  }, []);

  return (
    <>
      <Swiper
        breakpoints={props.breakpoints}
        modules={[Navigation, Virtual]}
        spaceBetween={5}
        navigation={true}
        className="contentBoxSwiper"
      >
        {list
          .filter((item) => {
            return item.SeName;
          })
          .map((item, index) => {
            let location = "City / Country";
            /*  switch (props.ListType) {
            case "Hotel":
              location = `${item.Country.Name} / ${item.City.Name}`;
              break;
            case "Restaurant":
              location = `${item.SkiResort.Country.Name} / ${item.SkiResort.City.Name}`;
              break;
            case "SkiSchool":
              location = `${item.SkiResort.Country.Name} / ${item.SkiResort.City.Name}`;
              break;
          }*/
            return (
              <SwiperSlide key={item.Id}>
                <PopularExperience
                  title={item.Title}
                  rate={5}
                  rateCount={"1252"}
                  TypeIcon={item.TypeIcon}
                  price={"50"}
                  interest={item.interest}
                  images={[`https://skiturkish.com${item.Image}`]}
                  location={location}
                  pageName={item.SeName}
                  menuUrl={item.menuUrl}
                  id={item.Id}
                  key={item.Title}
                  data={item}
                  ListType={props.ListType}
                  isHoverable={props.isHoverable}
                ></PopularExperience>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
};

export default ContentBoxSlider;
