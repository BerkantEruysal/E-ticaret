import { Routes, Route } from "react-router-dom";
import MainScreen from "./MainScreen";
import NavBar from "../components/Navbar/NavBar";
import Footer from "../components/Footer";
import { useRequestSender } from "../Hooks";
import {
  getAllLanguages,
  getAllResources,
  getAllSettings,
  getDefaultLanguage,
  getTopMenuPages,
  getFooterMenuPages,
  getBottomMenuPages,
  getWishListItems,
  getLastViews,
  getShoppingCart,
} from "../api/common";
import LoadingIndicator from "../components/LoadingIndicator";

import LocationSearchModal from "../components/modals/LocationSearchModal";
import SkiResortListScreen from "./SkiResortListScreen";
import HotelListScreen from "./HotelListScreen";
import TourListScreen from "./TourListScreen";
import SkiResortDetailScreen from "./SkiResortDetailScreen";
import HotelDetailScreen from "./HotelDetailScreen";
import TourDetailScreen from "./TourDetailScreen";
import SkiSchoolListScreen from "./SkiSchoolListScreen";
import SkiSchoolDetailScreen from "./SkiSchoolDetailScreen";
import RestaurantListScreen from "./RestaurantListScreen";
import RestaurantDetailScreen from "./RestaurantDetailScreen";
import LogInScreen from "./LogInScreen";
import MinimizedNavigator from "../components/MinimizedNavigator";
import ProfileScreen from "./Profile/PhotosScreen";

//Tüm url'leri toplar ve bir router olarak geri döndürür.
import Cookies from "universal-cookie";
import React from "react";
import "rsuite/dist/rsuite.min.css";

import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDefaultLanguage, setResource } from "../redux/languageSlice";
import { setUserCredentials } from "../redux/accountSlice";
import SignInScreen from "./SignInScreen";
import { logout } from "../redux/accountSlice";
import store from "../redux/store";
import { getUserToken } from "../api/main";
import { saveState } from "../browserStorage";
import ScreenWrapper from "./ScreenWrapper";
import DetailScreen from "./DetailScreen";
import PhotosScreen from "./Profile/PhotosScreen";
import ReviewScreen from "./Profile/ReviewScreen";
import WishScreen from "./Profile/WishScreen";
import ShoppingCartModal from "../components/modals/ShoppingCartModal";
import HotelModal from "../components/modals/HotelModal";
import RestaurantModal from "../components/modals/RestaurantModal";
import SkiSchoolModal from "../components/modals/SkiSchoolModal";
import TourModal from "../components/modals/TourModal";

const Navigation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const routes = [
    <Route key="main" path="" element={<MainScreen></MainScreen>} />,
    <Route
      key="resort-list"
      path="ski-resort"
      element={<SkiResortListScreen></SkiResortListScreen>}
    ></Route>,
    <Route
      key="ski-detail"
      path="ski-resort/detail/:id"
      element={<SkiResortDetailScreen></SkiResortDetailScreen>}
    ></Route>,
    <Route
      key="hotel-list"
      path="hotels"
      element={<HotelListScreen></HotelListScreen>}
    ></Route>,
    <Route
      key="hotel-detail"
      path="hotel/detail/:id"
      element={<HotelDetailScreen></HotelDetailScreen>}
    ></Route>,
    <Route
      key="tour-list"
      path="tours"
      element={<TourListScreen></TourListScreen>}
    ></Route>,
    <Route
      key="tour-detail"
      path="tour/detail/:id"
      element={<TourDetailScreen></TourDetailScreen>}
    ></Route>,
    <Route
      key="school-list"
      path="ski-school"
      element={<SkiSchoolListScreen></SkiSchoolListScreen>}
    ></Route>,
    <Route
      key="school-detail"
      path="ski-school/detail/:id"
      element={<SkiSchoolDetailScreen></SkiSchoolDetailScreen>}
    ></Route>,
    <Route
      key="food-beverage"
      path="food-beverage"
      element={<RestaurantListScreen></RestaurantListScreen>}
    ></Route>,
    <Route
      key="restourant-detail"
      path="restaurant/detail/:id"
      element={<RestaurantDetailScreen></RestaurantDetailScreen>}
    ></Route>,
    <Route
      key="sign-in"
      path="sign-in"
      element={<SignInScreen></SignInScreen>}
    ></Route>,
    <Route
      key="log-in"
      path="log-in"
      element={<LogInScreen></LogInScreen>}
    ></Route>,
    <Route
      key="detail"
      path=":slug"
      element={<DetailScreen></DetailScreen>}
    ></Route>,
    <Route
      key="profile"
      path="profile"
      element={<ProfileScreen></ProfileScreen>}
    >
      <Route
        key="profile-photos"
        path="photos"
        element={<PhotosScreen></PhotosScreen>}
      ></Route>
      <Route
        key={"profile-review"}
        path="reviews"
        element={<ReviewScreen></ReviewScreen>}
      ></Route>
      <Route
        key={"profile-wish"}
        path="wishes"
        element={<WishScreen></WishScreen>}
      ></Route>
    </Route>,
  ];

  useEffect(() => {
    const checkLanguage = async function() {
      const resources = store.getState().language.resource;

      if (resources == null) {
        await getAllLanguages();
        await getAllResources(store.getState().language.defaultLanguage.Id);
      }
    };

    const checkUserStorage = async function() {
      let user = store.getState().account.userCredentials;

      if (user.Token == null) {
        await getUserToken();
      }
      return;
    };

    checkUserStorage().then(() => {
      Promise.all([
        checkLanguage(),
        getAllSettings(),
        getTopMenuPages(),
        getFooterMenuPages(),
        getBottomMenuPages(),
        getWishListItems(),
        getLastViews(),
        getShoppingCart(),
      ]).then(() => {
        saveState(store.getState());
        setIsLoading(false);
      });
    });
  }, []);

  return (
    <div>
      {isLoading ? (
        <LoadingIndicator></LoadingIndicator>
      ) : (
        <>
          <div className="sticky-top">
            <NavBar></NavBar>
            <MinimizedNavigator></MinimizedNavigator>
          </div>
          <LocationSearchModal></LocationSearchModal>
          <ShoppingCartModal></ShoppingCartModal>
          <HotelModal></HotelModal>
          <RestaurantModal></RestaurantModal>
          <SkiSchoolModal></SkiSchoolModal>
          <TourModal></TourModal>
          <Routes>
            <Route path=":lang/" element={<ScreenWrapper />}>
              {routes}
            </Route>
            <Route path="" element={<MainScreen></MainScreen>}></Route>
          </Routes>
          <Footer></Footer>
        </>
      )}
    </div>
  );
};

export default Navigation;
