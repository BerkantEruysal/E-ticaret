import React, { useState } from "react";
import { Button, IconButton, ButtonGroup, ButtonToolbar } from "rsuite";
import PlusIcon from "@rsuite/icons/Plus";
import { addToShoppingCart } from "../../api/common";
import { useDispatch } from "react-redux";
import { stateSetter } from "../../redux/modalSlice";

const AddToCartButton = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    addToShoppingCart({
      id: props.data.Id,
      priceId: props.price.Id,
      currencyId: props.price.CurrencyId,
      data: props.data,
      startDate: props.startDate,
      endDate: props.endDate,
    }).then(() => {
      setIsLoading(false);
      dispatch(stateSetter({ name: "isShoppingCartModalActive", state: true }));
    });
  };

  return (
    <Button
      onClick={handleClick}
      className="w-100"
      color="violet"
      appearance="primary"
      disabled={props.disabled}
      loading={isLoading}
    >
      <PlusIcon /> Add to cart
    </Button>
  );
};

export default AddToCartButton;
