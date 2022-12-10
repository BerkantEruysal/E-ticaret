import React, { useState } from "react";
import DetailedRate from "./DetailedRate";
import ArrowDownIcon from "@rsuite/icons/ArrowDown";
import ArrowUpIcon from "@rsuite/icons/ArrowUp";
import { Col, Container, Row, Grid } from "rsuite";
import { GetResourceByValue } from "../DynamicSelectors";

const AboutAndFeatures = (props) => {
  const [showAllBody, setShowAllBody] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const [heightBody, setHeightBody] = useState("m-h-600px");
  const [heightFeatures, setHeightFeatures] = useState("m-h-600px");

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
    <Grid fluid className="detail-screen-content-container container-lg  mt-5 ">
      <Row gutter={5}>
        <Col xs={24} sm={24} md={12}>
          <Container
            className={heightBody + " bg-body detail-screen-content-body p-3"}
          >
            <h4 className="text-black border-bottom pb-2">
              {GetResourceByValue("common.aboutus")}
            </h4>
            <DetailedRate rateTypeList={rateTypeList}></DetailedRate>

            <div
              className={"mt-3 overflow-hidden"}
              dangerouslySetInnerHTML={{ __html: props.data.Body }}
            ></div>

            <div
              className=" overloaded-text d-flex align-items-center fw-bold"
              onClick={() => {
                setShowAllBody(!showAllBody);
                if (showAllBody) {
                  setHeightBody("m-h-600px");
                } else {
                  setHeightBody("");
                }
              }}
            >
              {!showAllBody ? (
                <>
                  <p>{GetResourceByValue("common.readmore")}</p>
                  <ArrowDownIcon></ArrowDownIcon>
                </>
              ) : (
                <>
                  <p>{GetResourceByValue("common.readless")}</p>
                  <ArrowUpIcon></ArrowUpIcon>
                </>
              )}
            </div>
          </Container>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Container
            className={
              heightFeatures + " bg-body detail-screen-content-body p-3"
            }
          >
            <h4 className="text-black border-bottom pb-2">
              {GetResourceByValue("common.features")}
            </h4>
            <div
              className={"mt-3 overflow-hidden"}
              dangerouslySetInnerHTML={{ __html: props.data.Features }}
            ></div>

            <div
              className=" overloaded-text d-flex align-items-center fw-bold"
              onClick={() => {
                setShowAllFeatures(!showAllFeatures);
                if (showAllFeatures) {
                  setHeightFeatures("m-h-600px");
                } else {
                  setHeightFeatures("");
                }
              }}
            >
              {!showAllFeatures ? (
                <>
                  <p>{GetResourceByValue("common.readmore")}</p>
                  <ArrowDownIcon></ArrowDownIcon>
                </>
              ) : (
                <>
                  <p>{GetResourceByValue("common.readless")}</p>
                  <ArrowUpIcon></ArrowUpIcon>
                </>
              )}
            </div>
          </Container>
        </Col>
      </Row>
    </Grid>
  );
};

export default AboutAndFeatures;
