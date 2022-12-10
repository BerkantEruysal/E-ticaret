import React, { useState } from "react";
import { Col, Container, Row, Grid, Avatar, Button } from "rsuite";
import { GetResourceByValue } from "../DynamicSelectors";

const UserComments = (props) => {
  return (
    <Grid
      fluid
      className="detail-screen-comments-container container-lg  mt-5 "
    >
      <Row gutter={5}>
        <Col sm={24} md={8}>
          <Container className="bg-body detail-screen-content-body p-3">
            <h4 className="text-black border-bottom pb-2">
              {GetResourceByValue("common.reviews.title")}
            </h4>
            <div className="comment-card card">
              <div className="comment-widgets m-b-20">
                {props.data.Reviews != null ? (
                  <>
                    {props.data.Reviews.map((review, index) => {
                      return (
                        <div key={index}>
                          <div className="d-flex flex-row comment-row">
                            <div className="px-2">
                              <Avatar
                                circle
                                src="https://avatars.githubusercontent.com/u/12592949"
                                alt="@superman66"
                              />
                            </div>
                            <div className="comment-text w-100">
                              <h6>{review.NameSurname}</h6>
                              <div className="comment-footer">
                                <span className="date">{review.CreatedOn}</span>
                              </div>
                              <p className="my-1">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </Container>
        </Col>
        <Col sm={24} md={16}>
          <Container className="bg-body detail-screen-content-body p-3">
            <h4 className="text-black border-bottom pb-2">
              {GetResourceByValue("common.qanda.title")}
            </h4>

            <div className="comment-card card">
              <div className="comment-widgets m-b-20">
                {props.data.Reviews != null ? (
                  <>
                    {props.data.Reviews.map((review, index) => {
                      return (
                        <div key={index}>
                          <div className="d-flex flex-row comment-row">
                            <div className="px-2">
                              <Avatar
                                circle
                                src="https://avatars.githubusercontent.com/u/12592949"
                                alt="@superman66"
                              />
                            </div>
                            <div className="comment-text w-100">
                              <h6>{review.NameSurname}</h6>
                              <div className="comment-footer">
                                <span className="date">{review.CreatedOn}</span>
                              </div>
                              <p className="my-1">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </Container>
        </Col>
      </Row>
    </Grid>
  );
};

export default UserComments;
