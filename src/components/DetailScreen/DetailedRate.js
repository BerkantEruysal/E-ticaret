import React from "react";
import { Row, Col } from "rsuite";
import RatingInfo from "../RatingInfo/RatingInfo";

const DetailedRate = (props) => {
  return (
    <div>
      <Row className="align-items-center d-flex mb-3">
        <Col>
          <h1 className="big-rate-text fw-bold text-black text-center ">3.5</h1>
        </Col>
        <Col>
          <Row>
            <p className="fw-bold text-black">Very Good</p>
          </Row>
          <Row>
            <RatingInfo rate={5} rateCount={"1252"}></RatingInfo>
          </Row>
        </Col>
      </Row>

      {props.rateTypeList.map((rateType, index) => {
        return (
          <Row className="d-flex align-items-center my-2" key={index}>
            <Col md={3}>
              <p className=" fw-light text-black">{rateType.name}</p>
            </Col>
            <Col></Col>
            <Col md={5} className="progress p-0">
              <div
                className="progress-bar"
                role="progressbar"
                aria-label="Basic example"
                style={{ width: (rateType.rate * 100) / 5 }}
                aria-valuenow={rateType.rate}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </Col>
            <Col md={2}>{rateType.rate}</Col>
          </Row>
        );
      })}
    </div>
  );
};

export default DetailedRate;
