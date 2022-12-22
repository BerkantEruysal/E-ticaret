import React from "react";
import "./../assets/style/main.css";
import "../assets/style/mainScreen.css";

import SearchSection from "../components/SearchSection/SearchSection";
import ScrollableHorizontalOptionList from "../components/ScrollableHorizontalOptionList";
import BlogSummaryCarousel from "../components/BlogSummaryCarousel";
import MostPopularExperiences from "../components/MostPopularExperiences/MostPopularExperiences";
import ExperienceCommentCarousel from "../components/ExperienceCommentCarousel";
import ContentBoxSlider from "../components/Slider/ContentBoxSlider";

import { ReactComponent as ToursIcon } from "../assets/images/toursIcon.svg";
import { ReactComponent as ResortsIcon } from "../assets/images/resortsIcon.svg";
import { ReactComponent as HotelsIcon } from "../assets/images/hotelsIcon.svg";
import { ReactComponent as SchoolsIcon } from "../assets/images/schoolsIcon.svg";
import { ReactComponent as FoodIcon } from "../assets/images/foodIcon.svg";
import { ReactComponent as ThreeDot } from "../assets/images/threeDot.svg";
import {
  GetResourceByValue,
  GetSettingByValue,
} from "../components/DynamicSelectors";
import PageTitle from "../components/PageTitle";

import { useSelector } from "react-redux";
import { getLocationText, useRequestSender } from "../Hooks";
import { getMainScreenContent } from "../api/main";
import LoadingIndicator from "../components/LoadingIndicator";
import store from "../redux/store";

const MainScreen = () => {
  PageTitle(GetResourceByValue("common.home.page.title"));

  const recentSearchList = useSelector((state) => {
    return state.account.LastViews;
  })
    .map((searchItem) => {
      return {
        Title: searchItem.EntityName,
        SeName: searchItem.EntityObject.SeName,
        secondText: `${searchItem.EntityObject.Location.city} / ${searchItem.EntityObject.Location.country}`,
      };
    })
    .slice(0, 20);

  const blogList = [
    {
      header: "Ski Equipent Guide: Choosing The Right Gear For You ",
      summary:
        "Whether you’re new to the bunny hill or ready to tackle any terrain, having the right ski equipment keeps you safe while having fun on the slopes. We’ve put together this guide to help you choose the right skis and gear for your skill level.",
      buttonText: "Read the guide",
      image: require("../assets/images/mockupBg1.jpg"),
    },
    {
      header: "Ski Equipment Guide : Choosing The Right Gear For You",
      summary:
        "Whether you’re new to the bunny hill or ready to tackle any terrain, having the right ski equipment keeps you safe while having fun on the slopes. We’ve put together this guide to help you choose the right skis and gear for your skill level.",
      buttonText: "Read the guide",
      image: require("../assets/images/mockupBg1.jpg"),
    },
    {
      header: "Ski Equipment Guide: Choosing The Right Gear For You  ",
      summary:
        "Whether you’re new to the bunny hill or ready to tackle any terrain, having the right ski equipment keeps you safe while having fun on the slopes. We’ve put together this guide to help you choose the right skis and gear for your skill level.",
      buttonText: "Read the guide",
      image: require("../assets/images/mockupBg1.jpg"),
    },
  ];

  const commentList = [
    {
      title: "Sarıkamış Ski Resort",
      text:
        "“That was wonderfsdull. Nature, views, services and prices are very satisfying. The ski equipment that we rent was seamless. You can buy or rent almost everything like ski gear, clothes, glasses and gloves. I definitely recommend this resort!”",
      writer: "-David H.",
      image: require("../assets/images/mockupBg2.jpg"),
    },
    {
      title: "Sarıkamış Ski Resort",
      text:
        "“That was wonderfull. Ndsature, views, services and prices are very satisfying. The ski equipment that we rent was seamless. You can buy or rent almost everything like ski gear, clothes, glasses and gloves. I definitely recommend this resort!”",
      writer: "-David H.",
      image: require("../assets/images/mockupBg2.jpg"),
    },
    {
      title: "Sarıkamış Ski Resort",
      text:
        "“That was wonderfull. Nature, vieasws, services and prices are very satisfying. The ski equipment that we rent was seamless. You can buy or rent almost everything like ski gear, clothes, glasses and gloves. I definitely recommend this resort!”",
      writer: "-David H.",
      image: require("../assets/images/mockupBg2.jpg"),
    },
  ];

  const [data, error, isLoading] = useRequestSender(getMainScreenContent);
  const cachedData = useSelector((state) => {
    return state.content.mainScreenContent;
  });

  const navigationLinks = store
    .getState()
    .navigation.topMenuPages.filter((page) => {
      return !page.HomePage;
    });

  return (
    <>
      {isLoading ? (
        <LoadingIndicator></LoadingIndicator>
      ) : (
        <div className="container-lg main-screen-container px-0 ">
          <br />
          <ScrollableHorizontalOptionList
            optionList={navigationLinks}
            isFullWidth={true}
          ></ScrollableHorizontalOptionList>

          <br />
          <SearchSection></SearchSection>
          <br />
          {recentSearchList.length > 0 && (
            <>
              <p className="h3">Your recent searches</p>
              <ScrollableHorizontalOptionList
                optionList={recentSearchList}
              ></ScrollableHorizontalOptionList>
              <br />
            </>
          )}
          <BlogSummaryCarousel blogList={blogList}></BlogSummaryCarousel>
          <br />
          <p className="h3">Popular Ski Resorts</p>
          <ContentBoxSlider
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            ListType="SkiResort"
            List={cachedData.SkiResorts}
          ></ContentBoxSlider>
          <br />
          <p className="h3">Popular Hotels</p>
          <ContentBoxSlider
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            ListType="Hotel"
            List={cachedData.Hotels}
          ></ContentBoxSlider>
          <br />

          <p className="h3">Popular Restaurants</p>
          <ContentBoxSlider
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            ListType="Restaurant"
            List={cachedData.Restaurants}
          ></ContentBoxSlider>
          <br />
          <p className="h3">Popular Tours</p>
          <ContentBoxSlider
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            ListType="Tours"
            List={cachedData.Tours}
          ></ContentBoxSlider>

          <br />
          <p className="h3">Popular Ski Schools</p>
          <ContentBoxSlider
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            ListType="SkiSchools"
            List={cachedData.SkiSchools}
          ></ContentBoxSlider>

          <br />
          <ExperienceCommentCarousel
            commentList={commentList}
          ></ExperienceCommentCarousel>
        </div>
      )}
    </>
  );
};

export default MainScreen;
