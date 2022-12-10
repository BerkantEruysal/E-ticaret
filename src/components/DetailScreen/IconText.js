import React from "react";
import { Col } from "rsuite";

const IconText = (props) => {
  return (
    <Col xs={12} md={5} className={`p-0 ${props.classes}`}>
      <a
        className={`link-secondary d-flex gap-1 align-items-center ${props.className}`}
        style={props.style}
        href={props.targetUrl}
      >
        <img
          style={{ width: 20, height: 20 }}
          src={props.image}
          alt={props.imageAlt}
        />
        {props.text}
      </a>
    </Col>
  );
};

export default IconText;
