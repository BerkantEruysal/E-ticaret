import React, { useState } from "react";
import { Drawer, Button, Placeholder, Row, Grid, Col } from "rsuite";
import { useSelector, useDispatch } from "react-redux";
import { stateSetter } from "../../redux/modalSlice";
import { GetResourceByValue } from "../DynamicSelectors";
import {
  createOrder,
  getShoppingCart,
  removeFromShoppingCart,
} from "../../api/common";
import { useEffect } from "react";
import store from "../../redux/store";

const ShoppingCartModal = () => {
  const isActive = useSelector(
    (state) => state.modal.isShoppingCartModalActive
  );
  const shoppingCart = useSelector((state) => {
    return state.account.ShoppingCart;
  });
  const dispatch = useDispatch();

  const [createOrderBtnLoading, setCreateOrderBtnLoading] = useState(false);

  const handleCreateOrder = async () => {
    setCreateOrderBtnLoading(true);
    await createOrder();
    setCreateOrderBtnLoading(false);
  };

  useEffect(() => {
    if (isActive) {
      getShoppingCart();
    }
  }, [isActive]);
  return (
    <Drawer
      backdrop={true}
      open={isActive}
      onClose={() =>
        dispatch(
          stateSetter({ name: "isShoppingCartModalActive", state: false })
        )
      }
    >
      <Drawer.Header>
        <Drawer.Title>Shopping Cart</Drawer.Title>
        <Drawer.Actions>
          <Button
            onClick={() =>
              dispatch(
                stateSetter({ name: "isShoppingCartModalActive", state: false })
              )
            }
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleCreateOrder()}
            appearance="primary"
            loading={createOrderBtnLoading}
          >
            Create Order
          </Button>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body>
        {shoppingCart.map((item, iterator) => {
          return <CartItem props={item} key={item.Id}></CartItem>;
        })}
      </Drawer.Body>
    </Drawer>
  );
};

export default ShoppingCartModal;

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/");
}

const CartItem = ({ props }) => {
  let dataObj;
  const dispatch = useDispatch();

  if (props.Tour) {
    dataObj = props.Tour;
  } else if (props.Hotel) {
    dataObj = props.Hotel;
  } else if (props.SkiResort) {
    dataObj = props.SkiResort;
  } else if (props.SkiSchool) {
    dataObj = props.SkiSchool;
  } else if (props.Restaurant) {
    dataObj = props.Restaurant;
  } else if (props.Room) {
    dataObj = { ...props.Room };
    dataObj.Title = dataObj.Hotel.Title + " / " + dataObj.Title;
  } else if (props.Equipment) {
    dataObj = props.Equipment;
  }

  let priceEntityName = store
    .getState()
    .currency.currencyList.findIndex((item) => {
      return item.id == props.CurrencyId;
    });
  priceEntityName = store.getState().currency.currencyList[priceEntityName]
    .name;
  const [removeBtnLoading, setRemoveBtnLoading] = useState(false);

  return (
    <Row className="d-flex gap-1 mb-3">
      <Col md={8}>
        <img
          src={`https://skiturkish.com/${dataObj.Image}`}
          alt="Cart Image"
          className="shopping-cart-image"
        />
      </Col>
      <Col md={16} className="d-flex flex-column justify-content-between">
        <Row>
          <Col>
            <p className="fw-bold">{dataObj.Title}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              {formatDate(new Date())} ~ {formatDate(new Date())}{" "}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>{"City / Country"}</Col>
        </Row>
        <Row className="d-flex align-items-center justify-content-between">
          <Col md={12}>
            {" "}
            <span>
              {props.Price} {priceEntityName} - {props.PriceVariation.Name}
            </span>
          </Col>
          <Col md={12} className="d-flex justify-content-end">
            <Button
              onClick={() => {
                setRemoveBtnLoading(true);
                removeFromShoppingCart({
                  id: props.Id,
                  priceId: props.ShoppingCartId,
                  currencyId: props.CurrencyId,
                  data: props,
                }).then((newList) => {
                  if (newList.length == 0) {
                    dispatch(
                      stateSetter({
                        name: "isShoppingCartModalActive",
                        state: false,
                      })
                    );
                  }
                });
              }}
              appearance="ghost"
              color="red"
              loading={removeBtnLoading}
            >
              Remove
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

/* 

*/
