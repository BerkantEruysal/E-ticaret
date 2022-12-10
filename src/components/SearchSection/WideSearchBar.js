import React from "react";

//Arama yapma alanı. Navbardaki arama çubuğu ile bağlantılı olmalı.
const WideSearchBar = () => {
  return (
    <div className="search-input-outer shadow  ">
      <div className="search-input-container bg-white rounded-pill p-2 d-flex align-items-center">
        <img
          src={require("../../assets/images/searchIcon.png")}
          alt="search icon"
          style={{
            width: 20,
            height: 20,
          }}
          className="me-2"
        />
        <input className="search-input rounded-pill w-100" type="text" />
      </div>
    </div>
  );
};

export default WideSearchBar;
