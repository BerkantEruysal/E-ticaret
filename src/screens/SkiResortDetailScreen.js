import React, { useEffect } from "react";
import { Panel, Rate, Grid, Row, Col, Container } from "rsuite";
import { useParams, Link } from "react-router-dom";
import { format } from "react-string-format";
import { useRequestSender } from "../Hooks";
import { Helmet } from "react-helmet";

import LoadingIndicator from "../components/LoadingIndicator";

import ScreenBreadcrumb from "../components/Breadcrumb/ScreenBreadcrumb";
import ContentBoxSlider from "../components/Slider/ContentBoxSlider";
import TumbSlider from "../components/Slider/ContentBoxSlider";
import { getContentDetail } from "../api/Detail";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState } from "react";
import {
  GetResourceByValue,
  GetSettingByValue,
} from "../components/DynamicSelectors";

import "../assets/style/detailScreen.css";
import "../assets/style/main.css";
import "../assets/style/mainScreen.css";
import GeneralInfo from "../components/DetailScreen/GeneralInfo";
import DetailScreenFilter from "../components/DetailScreen/DetailScreenFilter";
import PageTitle from "../components/PageTitle";

import AboutAndFeatures from "../components/DetailScreen/AboutAndFeatures";
import UserComments from "../components/DetailScreen/UserComments";

const SkiResortDetailScreen = () => {
  const { slug } = useParams();
  const [data, error, isLoading] = useRequestSender(getContentDetail, {
    targetName: "skiResortDetailList",
    id: slug,
    targetUrl: "/SkiResort/Details?sename=",
  });
  let cachedDataList = useSelector((state) => {
    return state.content.skiResortDetailList;
  });
  const [cachedData, setCachedData] = useState(false);

  useEffect(() => {
    if (cachedDataList.length > 0) {
      for (let i = 0; i < cachedDataList.length; i++) {
        if (cachedDataList[i].SeName == slug) {
          setCachedData(cachedDataList[i]);

          break;
        }
      }
    }
  }, [cachedDataList]);
  if (cachedData.Title) {
    PageTitle(cachedData.Title);
  } else {
    PageTitle("Loading");
  }
  const relatedExperiences = [
    {
      listName: "Hotels",
      type: "Hotel",
      title: `${format(
        GetResourceByValue("common.skiresort.detail.hotels.title"),
        cachedData.Title
      )}`,
    },
    {
      listName: "Restaurants",
      type: "Restaurant",
      title: `${format(
        GetResourceByValue("common.skiresort.detail.restaurants.title"),
        cachedData.Title
      )}`,
    },
    {
      listName: "SkiSchools",
      type: "SkiSchool",
      title: `${format(
        GetResourceByValue("common.skiresort.detail.skischools.title"),
        cachedData.Title
      )}`,
    },
    {
      listName: "Tours",
      type: "Tour",
      title: `${format(
        GetResourceByValue("common.skiresort.detail.tours.title"),
        cachedData.Title
      )}`,
    },
  ];

  const rateTypeList = [
    {
      name: "Hizmetler",
      rate: 3.5,
    },
    {
      name: "Konum",
      rate: 4,
    },
    {
      name: "Kalite",
      rate: 2.7,
    },
  ];

  return (
    <div>
      {!cachedData ? (
        <LoadingIndicator></LoadingIndicator>
      ) : (
        <>
          <Helmet>
            <meta name="keywords" content={cachedData.MetaKeywords} />
            <meta name="description" content={cachedData.MetaDescription} />

            <meta name="twitter:card" content="" />
            <meta name="twitter:title" content={cachedData.MetaTitle} />
            <meta
              name="twitter:description"
              content={cachedData.MetaDescription}
            />
            <meta name="twitter:url" content="" />
            <meta name="twitter:image" content={cachedData.Banner} />

            <meta property="og:title" content={cachedData.MetaTitle} />
            <meta
              property="og:description"
              content={cachedData.MetaDescription}
            />
            <meta property="og:image" content={cachedData.Banner} />
            <meta property="og:url" content="" />
          </Helmet>

          <div className="detail-screen-container pb-2">
            <ScreenBreadcrumb
              List={[{ pageName: "ski-resort", text: "Ski Resorts" }]}
              Title={cachedData.Title}
            />
            <GeneralInfo data={cachedData}></GeneralInfo>
            <br />
            <Grid fluid className="container-lg ">
              <Row gutter={10}>
                <DetailScreenFilter
                  pickedComponents={[
                    { name: "check-in", data: {} },
                    {
                      name: "guest",
                      data: { pickedComponents: ["adult", "child"] },
                    },
                  ]}
                  wrapperProps={{ md: 24, lg: 7 }}
                  title={cachedData.Title}
                  coordinate={{
                    id: cachedData.Id,
                    name: cachedData.Title,
                    position: {
                      lat: cachedData.Latitude,
                      lng: cachedData.Longtitude,
                    },
                  }}
                ></DetailScreenFilter>
                <Col md={17} className="h-100">
                  <div className=""></div>
                </Col>
              </Row>
            </Grid>
            <Grid fluid className="container-lg">
              {relatedExperiences.map(({ listName, type, title }) => {
                if (cachedData[listName].length > 0) {
                  return (
                    <Row key={listName} className="mt-4 bg-white  p-2">
                      <Col md={24}>
                        <h4 className="text-black">{title}</h4>
                      </Col>
                      <Col md={24}>
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
                          List={cachedData[listName]}
                          ListType={type}
                          isHoverable={true}
                        />
                      </Col>
                    </Row>
                  );
                }
              })}
            </Grid>
            <UserComments data={cachedData}></UserComments>
          </div>
        </>
      )}
    </div>
  );
};

export default SkiResortDetailScreen;
