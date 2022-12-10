import React, { useState } from "react";
import { Col, Row, Grid, SelectPicker } from "rsuite";
import AddToCartButton from "./ListScreenContent/AddToCartButton";
import SortDownIcon from "@rsuite/icons/SortDown";
import MinimizedCheckInOption from "./ListScreenContent/MinimizedCheckInOption";
import { useSelector } from "react-redux";

export default function Room({ roomData, isInModal }) {
  let prices = [];
  if (roomData.Prices != null) {
    prices = roomData.Prices.map((item, index) => {
      if (item.PriceVariation != null && item.PriceParentVariation == null) {
        const newItem = {
          Id: item.Id,
          Name:
            item.PriceVariation.Name +
            " / " +
            item.Value +
            " " +
            item.Currency.CurrencyCode,
          CurrencyId: item.CurrencyId,
        };
        return newItem;
      }
      if (item.PriceVariation != null && item.PriceParentVariation != null) {
        const newItem = {
          Id: item.Id,
          Name:
            item.PriceVariation.Name +
            " / " +
            item.PriceParentVariation.Name +
            " / " +
            item.Value +
            " " +
            item.Currency.CurrencyCode,
          CurrencyId: item.CurrencyId,
        };
        return newItem;
      }
    });
  }

  const defaultCurrency = useSelector((state) => {
    return state.currency.defaultCurrency;
  });

  prices = prices.filter((item) => {
    return item.CurrencyId == defaultCurrency.id;
  });

  const [selectedItem, setSelectedItem] = useState(null);
  const handleSelect = (value, event) => {
    setSelectedItem(event);
  };
  return (
    <div className={isInModal ? "roomContainerInModal" : "roomContainer"}>
      <div className="roomOptions d-flex flex-column align-items-center gap-4">
        <h4 className="text-black"> {roomData.Title} </h4>

        {roomData.Prices == null ? (
          <></>
        ) : (
          <>
            <SelectPicker
              searchable={false}
              data={prices}
              valueKey="Id"
              labelKey="Name"
              placeholder="Select Price"
              onSelect={handleSelect}
              className="w-100"
            />

            <MinimizedCheckInOption></MinimizedCheckInOption>
            <AddToCartButton
              disabled={selectedItem == null}
              price={selectedItem}
              data={roomData}
            ></AddToCartButton>
          </>
        )}
      </div>
      <div className="roomImage">
        <img
          className="w-100 h-100"
          src={`https://skiturkish.com${roomData.Image}`}
          alt="room image"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="roomBody">
        <div dangerouslySetInnerHTML={{ __html: roomData.Body }}></div>
      </div>

      <div
        className="roomFeatures"
        dangerouslySetInnerHTML={{ __html: roomData.Features }}
      ></div>
    </div>
  );
}
