import React from "react";
import "../assets/style/footer.css";
import { Link } from "react-router-dom";
import { GetResourceByValue, GetSettingByValue } from "./DynamicSelectors";
import { Col, Row, Grid } from "rsuite";
import Logo from "./Logo";

//Her sayfanın altında bulunan, statik footer.
const Footer = () => {
  return (
    <div className="d-flex flex-column mt-3 h-100">
      <footer className="w-100 py-4 flex-shrink-0">
        <div className="container py-4">
          <Grid>
            <Row className=" gy-4 gx-5 justify-content-center justify-content-md-start">
              <Col
                xs={24}
                sm={24}
                lg={6}
                className=" d-flex flex-column align-items-center align-items-lg-start "
              >
                <Logo></Logo>
                <p className="small text-muted">
                  {GetResourceByValue("common.footer.slogan")}
                </p>
                <p className="small text-muted mb-0">
                  &copy; {GetResourceByValue("common.footer.copyrights")}{" "}
                  <a className="text-primary" href="#">
                    E-ticaret.com
                  </a>
                </p>
              </Col>
              <Col
                xs={24}
                sm={24}
                lg={6}
                className=" d-flex flex-column align-items-center align-items-lg-start "
              >
                <h5 className="mb-3">
                  {GetResourceByValue("common.footer.location.first.title")}
                </h5>
                <ul className="list-unstyled text-muted">
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Get started</a>
                  </li>
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                </ul>
              </Col>
              <Col
                xs={24}
                sm={24}
                lg={6}
                className=" d-flex flex-column align-items-center align-items-lg-start "
              >
                <h5 className="mb-3">
                  {GetResourceByValue("common.footer.location.second.title")}
                </h5>
                <ul className="list-unstyled text-muted">
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Get started</a>
                  </li>
                  <li>
                    <a href="#">FAQ</a>
                  </li>
                </ul>
              </Col>
              <Col
                xs={24}
                sm={24}
                lg={6}
                className=" d-flex flex-column align-items-center align-items-lg-start "
              >
                <h5 className="mb-3">
                  {GetResourceByValue("common.footer.newsletter.title")}
                </h5>
                <p className="small text-muted">
                  {GetResourceByValue("common.footer.newsletter.slogan")}
                </p>
                <form action="#" className="mt-3">
                  <div className="input-group mb-3">
                    <input
                      className="form-control"
                      type="emaik"
                      placeholder={GetResourceByValue(
                        "common.footer.newsletter.email"
                      )}
                      aria-label={GetResourceByValue(
                        "common.footer.newsletter.email"
                      )}
                      aria-describedby="button-addon2"
                    />
                    <button
                      className="btn btn-primary"
                      id="button-addon2"
                      type="button"
                    >
                      <i className="fas fa-paper-plane"></i>{" "}
                      {GetResourceByValue(
                        "common.footer.newsletter.submit.text"
                      )}
                    </button>
                  </div>
                </form>
              </Col>
            </Row>
          </Grid>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
