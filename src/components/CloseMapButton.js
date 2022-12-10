import React from "react";
import { Button } from "rsuite";
import { useDispatch } from "react-redux";
import { setIsListScreenMapExtended } from "../redux/mapSlice";
const CloseMapButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setIsListScreenMapExtended(false));
  };
  return (
    <Button appearance="ghost" onClick={handleClick}>
      Close Map
    </Button>
  );
};

export default CloseMapButton;
