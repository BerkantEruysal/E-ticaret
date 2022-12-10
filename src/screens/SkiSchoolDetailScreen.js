import React, { useEffect } from "react";
import { Panel, Rate, Grid, Row, Col, Container } from "rsuite";
import { useParams, Link } from "react-router-dom";
import { format } from "react-string-format";
import { useRequestSender } from "../Hooks";
import { getSkiResortDetail } from "../api/Detail";
import Trip_ListScreenHeader from "../components/ListScreenHeader/Trip_ListScreenHeader";
import LoadingIndicator from "../components/LoadingIndicator";
import TumbSlider from "../components/Slider/TumbSlider";
import ScreenBreadcrumb from "../components/Breadcrumb/ScreenBreadcrumb";
import ContentBoxSlider from "../components/Slider/ContentBoxSlider";
import { getContentDetail } from "../api/Detail";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState } from "react";
import {
  GetResourceByValue,
  GetSettingByValue,
} from "../components/DynamicSelectors";
import UserComments from "../components/DetailScreen/UserComments";

import "../assets/style/detailScreen.css";
import "../assets/style/main.css";
import "../assets/style/mainScreen.css";
import GeneralInfo from "../components/DetailScreen/GeneralInfo";
import DetailScreenFilter from "../components/DetailScreen/DetailScreenFilter";

import AboutAndFeatures from "../components/DetailScreen/AboutAndFeatures";
import Equipment from "../components/Equipment";
import PageTitle from "../components/PageTitle";

const SkiSchoolDetailScreen = () => {
  const { slug } = useParams();
  const [data, error, isLoading] = useRequestSender(getContentDetail, {
    targetName: "skiSchoolDetailList",
    id: slug,
    targetUrl: "/SkiSchool/Details?sename=",
  });
  let cachedDataList = useSelector((state) => {
    return state.content.skiSchoolDetailList;
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
  return (
    <div>
      {!cachedData ? (
        <LoadingIndicator></LoadingIndicator>
      ) : (
        <div className="detail-screen-container pb-2">
          <ScreenBreadcrumb
            List={[{ pageName: "ski-school", text: "Ski Schools" }]}
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
              <Col
                lg={17}
                md={24}
                className="h-100  bg-success"
                style={{ minHeight: 500 }}
              >
                <div className=" h-100"></div>
              </Col>
            </Row>
          </Grid>

          <AboutAndFeatures data={cachedData}></AboutAndFeatures>

          <Grid fluid className="container-lg">
            <Row>
              <h3 className="text-black">Equipments</h3>
              {cachedData.EquipmentCategoryList.EquipmentCategories.map(
                (categoryInfo) => {
                  return (
                    <div>
                      <h4>{categoryInfo.Title}</h4>
                      {categoryInfo.EquipmentList.Equipments.map(
                        (equipmentInfo) => {
                          return <Equipment {...equipmentInfo}></Equipment>;
                        }
                      )}
                    </div>
                  );
                }
              )}
            </Row>
          </Grid>

          <UserComments data={cachedData}></UserComments>
        </div>
      )}
    </div>
  );
};

export default SkiSchoolDetailScreen;
