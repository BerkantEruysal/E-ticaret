import React, { useState } from "react";
import { Link } from "react-router-dom";
import ResponsiveNav from "@rsuite/responsive-nav";
import { useSelector } from "react-redux/es/exports";
import { Dropdown, IconButton } from "rsuite";
import { ReactComponent as ThreeDotIcon } from "../assets/images/threeDot.svg";
import { useLocation } from "react-router-dom";
import EllipsisHIcon from "@rsuite/icons/legacy/EllipsisH";
import DropboxIcon from "@rsuite/icons/legacy/Dropbox";
import FirefoxIcon from "@rsuite/icons/legacy/Firefox";
import GitlabIcon from "@rsuite/icons/legacy/Gitlab";
import LinuxIcon from "@rsuite/icons/legacy/Linux";
import DynamicLink from "../DynamicLink";
import { getCurrentUrlObject } from "../PureFunctions";

const MinimizedNavigator = () => {
  const [activeKey, setActiveKey] = useState("A");
  const [width, setWidth] = useState();

  const NavLink = React.forwardRef((props, ref) => {
    const { href, as, dataIndex, children, ...rest } = props;
    return (
      <Link
        className={`link-secondary${
          dataIndex == indexOfActiveLink ? " active" : ""
        }`}
        to={href}
        as={as}
      >
        {children}
      </Link>
    );
  });

  const navigationLinks = useSelector(
    (state) => state.navigation.topMenuPages
  ).filter((item) => {
    return !item.HomePage;
  });

  const pathName = useLocation().pathname;

  let indexOfActiveLink = -1;
  const urlObj = getCurrentUrlObject(pathName);
  if (urlObj.SeName == "tours" || urlObj.EntityName == "Tour") {
    indexOfActiveLink = 0;
  } else if (
    urlObj.SeName == "ski-resort" ||
    urlObj.EntityName == "SkiResort"
  ) {
    indexOfActiveLink = 1;
  } else if (urlObj.SeName == "hotels" || urlObj.EntityName == "Hotel") {
    indexOfActiveLink = 2;
  } else if (
    urlObj.SeName == "ski-school" ||
    urlObj.EntityName == "SkiSchool"
  ) {
    indexOfActiveLink = 3;
  } else if (
    urlObj.SeName == "food-beverage" ||
    urlObj.EntityName == "Restaurant"
  ) {
    indexOfActiveLink = 4;
  }

  return (
    <div
      className={`${
        pathName == "/" ||
        pathName == "/en" ||
        pathName == "/tr" ||
        pathName == "/tr/" ||
        pathName == "/en/"
          ? "d-none"
          : ""
      } secondry-navbar-container bg-white`}
      style={{ backgroundColor: "" }}
    >
      <div
        className="secondry-navbar-wrapper container-lg align-items-center  "
        style={{ width }}
      >
        <ResponsiveNav
          activeKey={activeKey}
          onSelect={setActiveKey}
          appearance="tabs"
        >
          {navigationLinks.map((item, index) => (
            <ResponsiveNav.Item
              as={NavLink}
              dataIndex={index}
              href={DynamicLink(item.SeName)}
              key={item.Title}
              eventKey={item.text}
            >
              {item.Title}
            </ResponsiveNav.Item>
          ))}
        </ResponsiveNav>
      </div>
    </div>
  );
};

const renderIconButton = (props, ref) => {
  return (
    <img
      {...props}
      ref={ref}
      style={{ width: 20 }}
      src={require("../assets/images/threeDot.svg")}
      alt="three dot"
    />
  );
};

export default MinimizedNavigator;
