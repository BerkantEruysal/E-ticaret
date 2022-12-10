import React from "react";
import { Drawer, Button } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { stateSetter } from "../../redux/modalSlice";
import { Col, Row, Grid } from "rsuite";
import Room from "../Room";
import Equipment from "../Equipment";

const SkiSchoolModal = () => {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => {
    return state.modal.isSkiSchoolModalActive;
  });
  const data = useSelector((state) => {
    return state.modal.skiSchoolModalData;
  });

  const handleClose = () => {
    dispatch(stateSetter({ name: "isSkiSchoolModalActive", state: false }));
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
                    stateSetter({
                      name: "isSkiSchoolModalActive",
                      state: false,
                    })
                  )
                }
              >
                Cancel
              </Button>
            </Drawer.Actions>
          </Drawer.Header>
          <Drawer.Body>
            <Grid fluid className="container-lg">
              <Row>
                <h3 className="text-black">Equipments</h3>
                {data.EquipmentCategoryList.EquipmentCategories.map(
                  (categoryInfo) => {
                    return (
                      <div>
                        <h4>{categoryInfo.Title}</h4>
                        {categoryInfo.EquipmentList.Equipments.map(
                          (equipmentInfo) => {
                            return <Equipment {...equipmentInfo}></Equipment>;
                          }
                        )}
                      </div>
                    );
                  }
                )}
              </Row>
            </Grid>
          </Drawer.Body>
        </Drawer>
      )}
    </>
  );
};

export default SkiSchoolModal;
