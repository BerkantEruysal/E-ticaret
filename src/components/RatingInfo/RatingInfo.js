import React from "react";
import RateCircle from "./RateCircle";
import { Panel, Rate, Grid, Row, Col } from "rsuite";
import HeartIcon from "@rsuite/icons/legacy/Heart";

//Gerekli bilgileri alıp, bir deneyimin oy bilgisini ve türünü görselleştirir.
const RatingInfo = ({ rate, rateCount, TypeIcon }) => {
  const rates = [];
  for (let i = 1; i <= 6; i++) {
    if (i <= rate || i - rate < 0.4) {
      rates.push(<RateCircle key={i} isBlue={true}></RateCircle>);
      continue;
    }
    rates.push(<RateCircle key={i} isBlue={false}></RateCircle>);
  }
  return (
    <div className="d-flex align-items-center gap-1">
      <Rate
        readOnly
        allowHalf
        character={<HeartIcon />}
        color="red"
        defaultValue={1}
        size="xs"
        value={rate}
      />
      <p className="m-0 text-secondary">{rateCount}</p>
    </div>
  );
};

export default RatingInfo;
