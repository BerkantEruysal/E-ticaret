import React from "react";

const ListFilterAccordion = (props) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`id-heading${props.id}`}>
        <button
          style={{ padding: 0 }}
          className="accordion-button px-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#id${props.id}`}
          aria-expanded="true"
          aria-controls={`id${props.id}`}
        >
          {props.title}
        </button>
      </h2>
      <div
        id={`id${props.id}`}
        className="accordion-collapse collapse show"
        aria-labelledby={`id-heading${props.id}`}
      >
        <div className="accordion-body">{props.children}</div>
      </div>
    </div>
  );
};

export default ListFilterAccordion;
