import React from "react";
import { Drawer, Button } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { stateSetter } from "../../redux/modalSlice";
import { Col, Row } from "rsuite";
import Room from "../Room";

const HotelModal = () => {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => {
    return state.modal.isHotelModalActive;
  });
  const data = useSelector((state) => {
    return state.modal.hotelModalData;
  });

  const handleClose = () => {
    dispatch(stateSetter({ name: "isHotelModalActive", state: false }));
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
                    stateSetter({ name: "isHotelModalActive", state: false })
                  )
                }
              >
                Cancel
              </Button>
            </Drawer.Actions>
          </Drawer.Header>
          <Drawer.Body>
            {data.RoomList.Rooms.map((roomData, index) => {
              return <Room isInModal={true} roomData={roomData}></Room>;
            })}
          </Drawer.Body>
        </Drawer>
      )}
    </>
  );
};

export default HotelModal;
