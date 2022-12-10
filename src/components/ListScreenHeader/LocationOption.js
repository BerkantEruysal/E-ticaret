import React, { useState } from "react";
import { ImLocation } from 'react-icons/im';
import { GetResourceByValue } from "../DynamicSelectors";

const LocationOption = () => {
  const [inputValue, setInputValue] = useState("Turkey");
  return (
    <div className="location-select-container h-100">
      <div
        data-bs-toggle="modal"
        data-bs-target="#locationSearchModal"
        className="list-screen-header-option-wrapper d-flex location-select-border"
      >
      <ImLocation className="fs-2 px-2" />
        <div>
          <p className="m-0">{GetResourceByValue("common.location")}</p>
          <p className="m-0">{inputValue}</p>
        </div>
      </div>
    </div>
  );
};

export default LocationOption;
