import React from "react";
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

const ListScreenBreadcrumb = (props) => {
  return (
    <div className="list-screen-breadcrumb-container">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Breadcrumb className="p-2 mb-0" separator={">"}>
              <Breadcrumb.Item as={NavLink} pageName={"home-page"}>
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item active>{props.title}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListScreenBreadcrumb;
