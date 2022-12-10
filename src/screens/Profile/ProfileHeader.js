import React, { useState } from "react";
import "../../assets/style/profileScreen.css";
import { Link } from "react-router-dom";
import { BiImage } from "react-icons/bi";
import { Button, Nav } from "rsuite";
import DynamicLink from "../../DynamicLink";

import {
  GetResourceByValue,
  GetSettingByValue,
} from "../../components/DynamicSelectors";

const ProfileHeader = ({ onSelect, ...props }) => {
  const [active, setActive] = useState("home");
  return (
    <>
      <div className="profile-header-screen-container container-fluid p-0">
        <div className="profile-header-screen-wrapper">
          <Button className="bg-transparent border">
            <BiImage /> Kapak resmi ekleyin
          </Button>
        </div>
      </div>
      <div className="profile-header-detail-container border container">
        <div className="profile-header-detail-body">
          <div className="row h-100">
            <div className="col-2 h-100">
              <div className="profile-avatar-container">
                <img
                  src="https://media-cdn.tripadvisor.com/media/photo-l/0f/50/ec/3a/deniz-y.jpg"
                  className="profile-avatar border rounded-circle"
                />
              </div>
            </div>
            <div className="col-10">
              <div className="profile-header-info-container">
                <div className="row mb-2">
                  <span className="profile-name">Deniz YILDIZ</span>
                  <span className="profile-email">
                    deniz.yildiz@webupbilisim.com
                  </span>
                </div>
                <div className="row mb-2">
                  <div className="col-2">
                    <h5>Katkı Sayısı</h5>
                    <span>0</span>
                  </div>
                  <div className="col-2">
                    <h5>Takipçiler</h5>
                    <span>0</span>
                  </div>
                  <div className="col-2">
                    <h5>Takip Ettikleri</h5>
                    <span>0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-navbar-container border container">
        <div className="profile-navbar-body">
          <Nav
            appearance="subtle"
            {...props}
            activeKey={active}
            onSelect={onSelect}
          >
            <Link to={DynamicLink("profile")}>
              {GetResourceByValue("common.user.profile")}
            </Link>
            <Link to={DynamicLink("profile-photos")}>
              {GetResourceByValue("common.user.photos")}
            </Link>
            <Link to={DynamicLink("profile-reviews")}>
              {GetResourceByValue("common.user.reviews")}
            </Link>
            <Link to={DynamicLink("profile-wishes")}>
              {GetResourceByValue("common.user.wishes")}
            </Link>
          </Nav>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
