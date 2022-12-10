import React from "react";
import { Outlet, useLocation, useParams, useNavigate } from "react-router-dom";
import { changeDefaultLanguage } from "../api/common";
import store from "../redux/store";

const ScreenWrapper = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const langs = store.getState().language.languages;
  const activeLang = store.getState().language.defaultLanguage;
  const location = useLocation();
  let Id = -1;
  langs.map((language) => {
    if (language.UniqueSeoCode == params.lang) {
      Id = language.Id;
    }
  });
  if (Id == -1) {
    let raw = location.pathname.split("/");
    raw[1] = activeLang.UniqueSeoCode;
    let changedURl = raw.join("/");

    setTimeout(() => {
      navigate(changedURl);
    }, 100);
  } else if (Id != activeLang.Id) {
    changeDefaultLanguage(Id, location.pathname, navigate);
  }

  return <Outlet></Outlet>;
};
export default ScreenWrapper;
