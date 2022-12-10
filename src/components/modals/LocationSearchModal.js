import React from "react";
import SearchSuggestion from "../SearchSection/SearchSuggestion";
import { GetResourceByValue } from "../DynamicSelectors";

const LocationSearchModal = () => {
  return (
    <div
      className="modal fade"
      id="locationSearchModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {GetResourceByValue("common.location.title")}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body pb-4">
            <div className="lsm-search-input-wrapper d-flex px-1">
              <input
                placeholder={GetResourceByValue("common.location.title")}
                type="text"
                className="location-search-modal-input  w-100 "
              />
              <img
                src={require("../../assets/images/searchIcon.png")}
                alt="Search Icon"
              />
            </div>
            <div>
              <SearchSuggestion></SearchSuggestion>
              <SearchSuggestion></SearchSuggestion>
              <SearchSuggestion></SearchSuggestion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSearchModal;
