import React from "react";
import { Drawer, Button } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { stateSetter } from "../../redux/modalSlice";
import { Col, Row } from "rsuite";
import Room from "../Room";

const TourModal = () => {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => {
    return state.modal.isTourModalActive;
  });
  const data = useSelector((state) => {
    return state.modal.TourModalData;
  });

  const handleClose = () => {
    dispatch(stateSetter({ name: "isTourModalActive", state: false }));
  };
  return (
    <>
      {isActive && (
        <Drawer
          onClose={handleClose}
          open={isActive}
          backdrop={true}
          placement="left"
          size="lg"
        >
          {" "}
          <Drawer.Header>
            <Drawer.Title>{data.Title}</Drawer.Title>
            <Drawer.Actions>
              <Button
                onClick={() =>
                  dispatch(
                    stateSetter({ name: "isTourModalActive", state: false })
                  )
                }
              >
                Cancel
              </Button>
            </Drawer.Actions>
          </Drawer.Header>
          <Drawer.Body></Drawer.Body>
        </Drawer>
      )}
    </>
  );
};

export default TourModal;
