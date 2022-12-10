import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "rsuite";
import DynamicLink from "../../DynamicLink";

const NavLink = React.forwardRef((props, ref) => {
  const { pageName, as, children, ...rest } = props;

  return (
    <Link to={DynamicLink(pageName)} as={as}>
      {children}
    </Link>
  );
});

const ScreenBreadcrumb = (props) => {
  const [breakCrumbLinks, setBreakCrumbLinks] = useState(props.List);
  const [currentTitle, setCurrentTitle] = useState(props.Title);

  return (
    <div className="list-screen-breadcrumb-container">
      <Breadcrumb className="py-2 mb-0 container-lg" separator={">"}>
        <Breadcrumb.Item as={NavLink} pageName="home-page">
          Home
        </Breadcrumb.Item>
        {props.List.map((item, index) => {
          return (
            <Breadcrumb.Item
              key={item.text}
              as={NavLink}
              pageName={item.pageName}
            >
              {item.text}
            </Breadcrumb.Item>
          );
        })}
        <Breadcrumb.Item active>{currentTitle}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default ScreenBreadcrumb;
