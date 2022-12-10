import React from "react";
import { useState } from "react";
import SearchSuggestion from "../SearchSection/SearchSuggestion";

//Navbar içerisindeki arama yapma işlevlerini yerine getirir.
const SearchBar = () => {
  const [isActive, setIsActive] = useState(false);

  //Eğer arama ekranı aktif ise, aramayı gerçekleştirir; değil ise, arama ekranını aktif eder.
  const searchButtonHandler = () => {
    if (!isActive) {
      setIsActive(true);
    }
  };

  // Arama ekranını kapatır. Bağlı olduğu iptal butonu, Mobil cihazlarda backdrop'a tıklamak mümkün olmayacağı için sadece mobil cihazlarda görünüyor.
  const cancelSearchButtonHandler = () => {
    setIsActive(false);
  };

  return (
    <div>
      <div
        className={` ${
          isActive
            ? "position-absolute nav-search-active rounded-top bg-white"
            : "position-relative "
        }  `}
      >
        <div
          className={`${
            isActive
              ? "nav-search-wrapper-active"
              : "nav-search-wrapper rounded-pill"
          } m-auto pe-3 py-1 ps-1 d-flex flex-row-reverse flex-md-row bg-white `}
          data-bs-toggle="collapse"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          <button onClick={searchButtonHandler} className="reset-button">
            <img
              src={require("../../assets/images/searchIcon.png")}
              alt="Search icon"
              className="float-start"
              style={{ width: 20, height: 20 }}
            />
          </button>

          <input
            onClick={() => setIsActive(true)}
            type="text"
            className={`${
              isActive ? "" : "d-none d-md-block"
            } nav-input container`}
          />

          <button
            onClick={cancelSearchButtonHandler}
            className={`${isActive ? " d-md-none" : " d-none "} reset-button`}
          >
            <img
              src={require("../../assets/images/leftArrow.png")}
              alt="Search icon"
              className="float-start"
              style={{ width: 30, height: 30 }}
            />
          </button>
        </div>
        {isActive && (
          <div className="search-bar-hideable-wrapper w-100 position-absolute rounded-bottom shadow bg-white">
            <SearchSuggestion></SearchSuggestion>
            <SearchSuggestion></SearchSuggestion>
            <SearchSuggestion></SearchSuggestion>
            <SearchSuggestion></SearchSuggestion>
          </div>
        )}
      </div>
      {isActive && (
        <div
          className="backdrop d-none d-md-block"
          onClick={() => setIsActive(false)}
        ></div>
      )}
    </div>
  );
};

export default SearchBar;
