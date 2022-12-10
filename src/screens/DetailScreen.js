import React from "react";
import GeneralInfo from "../components/DetailScreen/GeneralInfo";
import "../assets/style/detailScreen.css";
import HotelDetailScreen from "./HotelDetailScreen";
import RestaurantDetailScreen from "./RestaurantDetailScreen";
import SkiResortDetailScreen from "./SkiResortDetailScreen";
import SkiSchoolDetailScreen from "./SkiSchoolDetailScreen";
import TourDetailScreen from "./TourDetailScreen";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import store from "../redux/store";
import PageTitle from "../components/PageTitle";

const DetailScreen = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const index = store.getState().navigation.detailPages.findIndex((item) => {
    return item.Slug == params.slug;
  });
  if (index == -1) {
    return <h1>404, there is no screen named {params.slug}</h1>;
  }
  const screen = store.getState().navigation.detailPages[index];

  switch (screen.EntityName) {
    case "SkiResort":
      return <SkiResortDetailScreen></SkiResortDetailScreen>;
    case "Hotel":
      return <HotelDetailScreen></HotelDetailScreen>;
    case "SkiSchool":
      return <SkiSchoolDetailScreen></SkiSchoolDetailScreen>;
    case "Restaurant":
      return <RestaurantDetailScreen></RestaurantDetailScreen>;
    case "Tour":
      return <TourDetailScreen></TourDetailScreen>;
  }

  return;
};

export default DetailScreen;
