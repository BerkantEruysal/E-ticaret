import React from "react";
import RatingInfo from "../RatingInfo/RatingInfo";
import { ReactComponent as TypeIcon } from "../../assets/images/toursIcon.svg";
import { ReactComponent as HeartIcon } from "../../assets/images/heartIcon.svg";
import IconText from "./IconText";
import { useState } from "react";
import LikeButton from "../LikeButton";
import { Grid, Row, Col } from "rsuite";
const GeneralInfo = (props) => {
  return (
    <div className="border-bottom bg-white pb-3">
      <Grid fluid className="container-lg d-flex flex-column">
        <Row className="mb-1">
          <p className="h3 fw-bold text-dark m-0 ">{props.data.Title}</p>
        </Row>
        <Row className="mb-1">
          <RatingInfo
            rate={5}
            rateCount={"1.254"}
            TypeIcon={TypeIcon}
          ></RatingInfo>
        </Row>
        <Row>
          <Col md={16} xs={24} className="p-0">
            <Row gutter={20}>
              <IconText
                image={require("../../assets/images/locationIcon.svg")}
                imageAlt="location"
                text={"City / Country"}
                targetUrl="#"
                className="right-tab"
              ></IconText>
              <IconText
                image={require("../../assets/images/phoneIcon.svg")}
                imageAlt="phone"
                text={"(+90) 500 000 000"}
                targetUrl="#"
                className="right-tab"
              ></IconText>
              <IconText
                image={require("../../assets/images/websiteIcon.svg")}
                imageAlt="website"
                text={"Visit hotel website"}
                targetUrl="#"
                className="right-tab"
              ></IconText>
              <IconText
                image={require("../../assets/images/mailIcon.svg")}
                imageAlt="mail"
                text={"E-mail hotel"}
                targetUrl="#"
                className="right-tab"
              ></IconText>
            </Row>
          </Col>
          <Col className="d-flex justify-content-md-end" xs={24} md={8}>
            <IconText
              image={require("../../assets/images/penIcon.svg")}
              imageAlt="pen"
              text={"Review"}
              targetUrl="#"
              classes="  right-tab hoveredButton"
            ></IconText>

            <Col className="right-tab hoveredButton">
              <button className=" d-flex align-items-center hoveredButton">
                <img
                  src={require("../../assets/images/shareIcon.svg")}
                  alt="share"
                />
                Share
              </button>
            </Col>
            <Col className="hoveredButton">
              <LikeButton
                style={"p-0 hoveredButton"}
                text="Save"
                data={props.data}
              ></LikeButton>
            </Col>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default GeneralInfo;

/*

 <div className="border-bottom bg-white pb-3">
      <div className="container-lg d-flex flex-column ">
        <div className="row">
          <p className="h3 fw-bold text-dark m-0">{props.data.Title}</p>
        </div>
        <div className="row">
          <RatingInfo
            rate={5}
            rateCount={"1.254"}
            TypeIcon={TypeIcon}
          ></RatingInfo>
        </div>
        <div className="row justify-content-between">
          <div className="col-7 d-flex justify-content-between ">
            <IconText
              image={require("../../assets/images/locationIcon.svg")}
              imageAlt="location"
              text={"City / Country"}
              targetUrl="#"
            ></IconText>
            <IconText
              image={require("../../assets/images/phoneIcon.svg")}
              imageAlt="phone"
              text={"(+90) 500 000 000"}
              targetUrl="#"
            ></IconText>
            <IconText
              image={require("../../assets/images/websiteIcon.svg")}
              imageAlt="website"
              text={"Visit hotel website"}
              targetUrl="#"
            ></IconText>
            <IconText
              image={require("../../assets/images/mailIcon.svg")}
              imageAlt="mail"
              text={"E-mail hotel"}
              targetUrl="#"
            ></IconText>
          </div>
          <div className="col-3 d-flex">
            <IconText
              className="hoveredButton rounded"
              image={require("../../assets/images/penIcon.svg")}
              imageAlt="pen"
              text={"Review"}
              targetUrl="#"
            ></IconText>

            <button className="hoveredButton  d-flex align-items-center gap-1 rounded ">
              <img
                src={require("../../assets/images/shareIcon.svg")}
                alt="share"
              />
              Share
            </button>

            <LikeButton text="Save" data={props.data}></LikeButton>
          </div>
        </div>
      </div>
    </div>

*/
