import React, { useState } from "react";

const CheckOutOption = () => {
  const [inputValue, setInputValue] = useState("- / - / -");
  return (
    <div
      className="list-screen-header-option-wrapper d-flex"
      style={{ borderLeft: "10px solid #ff5353" }}
    >
      <img
        src={require("../../assets/images/calendarIcon.svg")}
        className="px-2"
        alt=""
      />
      <div>
        <p className="m-0">Check out</p>
        <p className="m-0">{inputValue}</p>
        <input
          type="date"
          name="check-in-input"
          className="date-input"
          onChange={(item) => setInputValue(item.target.value)}
        />
      </div>
    </div>
  );
};

export default CheckOutOption;
