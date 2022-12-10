import React from "react";

const ListFilterCheckBox = (props) => {
  return (
    <div className="form-check align-items-center d-flex gap-3">
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        id={`id${props.id}`}
      />
      <label
        className="form-check-label d-flex align-items-center justify-content-between w-100"
        htmlFor={`id${props.id}`}
      >
        <div className="d-flex align-items-center gap-1">{props.children}</div>
        <p className="text-secondary fw-bold">{props.count}</p>
      </label>
    </div>
  );
};

export default ListFilterCheckBox;
