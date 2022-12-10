import React, { Component, useRef, useEffect, useState } from "react";
import { Panel, Rate, Grid, Row, Col, Container } from "rsuite";

import Lightbox from "yet-another-react-lightbox";

import "yet-another-react-lightbox/dist/styles.css";
import "../../assets/style/contentGallery.css";


const ContentGallery = (props) => {

  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Grid fluid className="ContentGallery">
        <Row>
          <Col md={12}>
            <img src="https://source.unsplash.com/aZjw7xI3QAA/1144x763" className="firstImage" onClick={() => setOpen(true)}  />
          </Col>
          <Col md={12}>
            <Row>
              <Col md={12}>
                <img src="https://source.unsplash.com/aZjw7xI3QAA/1144x763" onClick={() => setOpen(true)}  />
              </Col>
              <Col md={12}>
                <img src="https://source.unsplash.com/c77MgFOt7e0/1144x763" onClick={() => setOpen(true)}  />
              </Col>
            </Row>
            <Row >
              <Col md={12}>
                <img src="https://source.unsplash.com/aZjw7xI3QAA/1144x763" onClick={() => setOpen(true)}  />
              </Col>
              <Col md={12}>
                <img src="https://source.unsplash.com/c77MgFOt7e0/1144x763" onClick={() => setOpen(true)}  />
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[
          { src: "https://source.unsplash.com/aZjw7xI3QAA/1144x763" },
          { src: "https://source.unsplash.com/aZjw7xI3QAA/1144x763" },
          { src: "https://source.unsplash.com/aZjw7xI3QAA/1144x763" },
        ]}
      />
    </>
  );
};

export default ContentGallery;
