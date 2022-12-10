import React from "react";

const SearchSuggestion = () => {
  return (
    <div className="search-suggestion border-bottom w-100 d-flex p-3 gap-3">
      <img
        src={require("../../assets/images/locationIcon.svg")}
        alt="location icon"
      />
      <div>
        <p className="m-0 fw-bold">Grand Kartal Hotel</p>
        <p className="m-0 fw-light">Bolu</p>
      </div>
    </div>
  );
};

export default SearchSuggestion;
