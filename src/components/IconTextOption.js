import React from "react";
import { Link } from "react-router-dom";
import DynamicLink from "../DynamicLink";

//Turlar, hoteller gibi iconlu seçenekleri oluşturur.
const IconTextOption = ({ optionText, optionSecondText, Icon, targetPage }) => {
  return (
    <Link
      className=" d-flex  border rounded align-items-center border-dark  option-wrapper text-decoration-none  justify-content-around px-3 gap-4 py-2"
      to={DynamicLink(targetPage)}
    >
      <div className="d-flex flex-column  ">
        <p className="p-0 m-0 fw-bold  ">{optionText}</p>
        {optionSecondText && <p className=" m-0">{optionSecondText}</p>}
      </div>
    </Link>
  );
};

export default IconTextOption;
