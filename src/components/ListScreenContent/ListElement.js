import React, { useState } from "react";
import {
  Button,
  IconButton,
  ButtonGroup,
  ButtonToolbar,
  SelectPicker,
} from "rsuite";
import PlusIcon from "@rsuite/icons/Plus";
import ExperienceVisual from "../MostPopularExperiences/ExperienceVisual";
import RatingInfo from "../RatingInfo/RatingInfo";
import { Link } from "react-router-dom";
import DynamicLink from "../../DynamicLink";
import { getLocationText } from "../../Hooks";
import AddToCartButton from "./AddToCartButton";
import MinimizedCheckInOption from "./MinimizedCheckInOption";
import { useSelector } from "react-redux";
import { setCurrency } from "../../api/common";

const ListElement = ({
  data,
  itemBaseUrl,
  dataIndex,
  listType,
  TypeIcon,
  entityGroup,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  let location = getLocationText(data);
  let prices = [];
  if (data.Prices != null) {
    prices = data.Prices.map((item, index) => {
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

  const handleSelect = (value, event) => {
    setSelectedItem(event);
  };
  return (
    <div className="list-element w-100 bg-white d-flex flex-column flex-md-row">
      <div className={"ls-visual-wrapper"}>
        <ExperienceVisual
          isAddedToInterests={false}
          setIsAddedToInterests=""
          images={[`https://skiturkish.com${data.Image}`]}
          pageName={data.SeName}
          Id={data.Id}
          entityGroup={entityGroup}
          isWish={data.IsWished}
          data={data}
        ></ExperienceVisual>
      </div>
      <div className="d-flex flex-column w-100">
        <h4 className="px-3 py-2 text-dark fw-bold ">
          {dataIndex}
          {". "}
          {data.Title}
        </h4>
        <div className="container-fluid h-100">
          <div className="row h-100">
            <div className="col d-flex  justify-content-between py-4 align-items-center flex-column">
              {location ? (
                <div className="text-center">
                  <img
                    src={require("../../assets/images/locationIcon.svg")}
                    alt="location"
                  />
                  <p className="fw-bold link-dark">
                    {location.country} {" / "} {location.city}
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={require("../../assets/images/locationIcon.svg")}
                    alt="location"
                  />
                  <p className="fw-bold link-dark">{"City / Country "}</p>
                </div>
              )}
              {data.Prices == null ? (
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
                    data={data}
                  ></AddToCartButton>
                </>
              )}
              <Link
                className="link-secondary text-decoration-underline"
                to={DynamicLink(data.SeName)}
              >
                View Details
              </Link>
            </div>
            <div className="col d-flex justify-content-between py-4 align-items-center flex-column">
              <div className="d-flex align-items-center gap-1">
                <img src={require("../../assets/images/wifiIcon.svg")} alt="" />
                <p>Free wifi</p>
              </div>
            </div>
            <div className="col d-flex justify-content-between py-4 align-items-start flex-column">
              <RatingInfo
                TypeIcon={TypeIcon}
                rate={5}
                rateCount={"1.235"}
              ></RatingInfo>

              <div className="py-2">
                <div className="d-flex">
                  <img
                    className="rounded-circle me-2 list-image"
                    src={require("../../assets/images/mockUpPp.jpg")}
                    alt=""
                  />
                  <p>
                    {data.Reviews.length > 0 && (
                      <>
                        By <strong>{data.Reviews[0].NameSurname} </strong>
                      </>
                    )}
                  </p>
                </div>
                <p>{data.Reviews.length > 0 && data.Reviews[0].Comment}</p>
              </div>
              <a className="d-flex align-items-center" href="/">
                <img
                  className="me-2"
                  src={require("../../assets/images/websiteIcon.svg")}
                  alt="website"
                />

                <span className="py-2">Wisit hotel website</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListElement;
