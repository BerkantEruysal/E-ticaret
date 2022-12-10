import React, { useCallback, useEffect, useState } from "react";
import { IconButton } from "rsuite";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { toggleWishListItem } from "../api/common";
import { useSelector } from "react-redux/es/exports";
import store from "../redux/store";

const LikeButton = (props) => {
  const isWished = useSelector((state) => {
    return state.account.WishList.filter((item) => {
      return (
        item.EntityKey == props.data.Id &&
        item.EntityGroup == props.data.RecordEntityGroup
      );
    })[0];
  });

  const handleToggler = () => {
    toggleWishListItem({
      data: props.data,
    });
  };

  return (
    <button
      onClick={handleToggler}
      className={` ${props.text ? "" : "rounded-circle px-2 py-2"}`}
    >
      <AiFillHeart
        style={{
          color:
            isWished != undefined ? "var(--rs-red-500)" : "var(--rs-gray-400)",
        }}
      />
      {props.text ? <span className="ms-1">{props.text}</span> : " "}
    </button>
  );
};
export default LikeButton;
