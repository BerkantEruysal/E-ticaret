import React from "react";
import "../../assets/style/navbar.css";
import NavOption from "./NavOption";
import SignInButton from "./SignInButton";
import LogInButton from "./LogInButton";
import SearchBar from "./SearchBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { Dropdown } from "rsuite";
import { logout } from "../../api/Authentication";
import { changeDefaultLanguage, setCurrency } from "../../api/common";
import { GetResourceByValue, GetSettingByValue } from "../DynamicSelectors";

import DynamicLink from "../../DynamicLink";
import { stateSetter } from "../../redux/modalSlice";
import { setDefaultCurrency } from "../../redux/currencySlice";
import Logo from "../Logo";

//Sayfaların çoğunun inherit ettiği navbar.
const NavBar = () => {
  const user = useSelector((state) => {
    return state.account;
  });
  const language = useSelector((state) => {
    return state.language;
  });

  const currency = useSelector((state) => {
    return state.currency;
  });

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const changeLang = (UniqueSeoCode) => {
    let oldUrl = location.pathname.split("/");
    oldUrl[1] = UniqueSeoCode;
    const newUrl = oldUrl.join("/");
    navigate(newUrl);
  };

  const changeCurrency = (currency) => {
    dispatch(setDefaultCurrency(currency));
    setCurrency(currency.Id);
  };

  const cartBadgeContent = useSelector((state) => {
    return state.account.ShoppingCart.length;
  });

  return (
    <nav className="main-navbar-container navbar navbar-expand-md bg-light sticky-top">
      <div className="container-fluid container-lg">
        <button
          className="navbar-toggler ms-1 py-1 px-2 "
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className="navbar-toggler-icon" style={{ width: 20 }}></span>
        </button>

        <Link className="navbar-brand" to={DynamicLink("home-page")}>
          <Logo></Logo>
        </Link>
        <SearchBar></SearchBar>

        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Ski Resorts
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav flex-grow-1  flex-md-row-reverse gap-2 gap-md-0">
              <Dropdown title={language.defaultLanguage.Name}>
                {language.languages.map((lang) => {
                  return (
                    <Dropdown.Item
                      key={lang.Id}
                      onClick={() => {
                        changeLang(lang.UniqueSeoCode);
                      }}
                    >
                      {lang.Name}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown>
              <Dropdown title={currency.defaultCurrency.name}>
                {currency.currencyList.map((currency) => {
                  return (
                    <Dropdown.Item
                      key={currency.id}
                      onClick={() => {
                        changeCurrency(currency);
                      }}
                    >
                      {currency.name}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown>
              {user.isLoggedIn ? (
                <Dropdown
                  trigger={"hover"}
                  title={
                    user.userCredentials.FirstName +
                    " " +
                    user.userCredentials.LastName
                  }
                >
                  <Dropdown.Item
                    onClick={() => {
                      navigate(DynamicLink("profile"));
                    }}
                  >
                    {GetResourceByValue("common.user.profile")}
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      navigate(DynamicLink("profile-photos"));
                    }}
                  >
                    {GetResourceByValue("common.user.photos")}
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      navigate(DynamicLink("profile-reviews"));
                    }}
                  >
                    {GetResourceByValue("common.user.reviews")}
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      navigate(DynamicLink("profile-wishes"));
                    }}
                  >
                    {GetResourceByValue("common.user.wishes")}
                  </Dropdown.Item>
                  <Dropdown.Item divider />
                  <Dropdown.Item
                    onClick={() => {
                      logout();
                    }}
                  >
                    {GetResourceByValue("common.header.logout")}
                  </Dropdown.Item>
                </Dropdown>
              ) : (
                <LogInButton></LogInButton>
              )}
              <NavOption
                icon={require("../../assets/images/penIcon.png")}
                optionText="Reviews"
                targetUrl="#"
                iconAlt="Pen Icon"
              ></NavOption>
              <NavOption
                icon={require("../../assets/images/heartIcon.png")}
                optionText="Trips"
                targetUrl="#"
                iconAlt="Heart Icon"
              ></NavOption>
              <NavOption
                icon={require("../../assets/images/ringIcon.png")}
                optionText="Alerts"
                targetUrl="#"
                iconAlt="Pen Icon"
              ></NavOption>
              <NavOption
                icon={require("../../assets/images/cartIcon.png")}
                optionText="Cart"
                targetUrl="#"
                iconAlt="Cart"
                badgeContent={cartBadgeContent}
                onClick={() => {
                  dispatch(
                    stateSetter({
                      name: "isShoppingCartModalActive",
                      state: true,
                    })
                  );
                }}
              ></NavOption>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
