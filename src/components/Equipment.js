import React from "react";
import AddToCartButton from "./ListScreenContent/AddToCartButton";
import { SelectPicker } from "rsuite";

const Equipment = (props) => {
  let prices = [];
  if (props.Prices != null) {
    prices = props.Prices.map((item, index) => {
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

  const handleSelect = (index) => {
    return 0;
  };

  return (
    <div>
      <h5 className="equipmentContainerInBody">{props.Title}</h5>
      <p>{props.Body}</p>
      <p>{props.EquipmentCategory.Title}</p>
      <img src={`https://skiturkish.com${props.Image}`} alt="equipment" />
      <SelectPicker
        searchable={false}
        data={prices}
        valueKey="Id"
        labelKey="Name"
        placeholder="Select Price"
        onSelect={handleSelect}
        className="w-100"
      />
      <AddToCartButton
        price={{ Id: props.Prices[0].Id }}
        data={{ data: props.Id }}
      ></AddToCartButton>
    </div>
  );
};

export default Equipment;
