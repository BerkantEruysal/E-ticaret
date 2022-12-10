import React from "react";
import WideSearchBar from "./WideSearchBar";
import SearchBar from "../Navbar/SearchBar";

//Ana sayfada kullanılacak, resimli arka planlı arama alanı. Navbardaki arama alanı ile redux üzerinden balantılı.
const SearchSection = () => {
  return (
    <div className="card ">
      <img
        src={require("../../assets/images/searchBackground.png")}
        className="card-img search-section-image"
        alt="..."
      />
      <div className="card-img-overlay d-flex justify-content-center align-items-center">
        <WideSearchBar></WideSearchBar>
      </div>
    </div>
  );
};

export default SearchSection;
