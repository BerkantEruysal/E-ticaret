import React from "react";
import { Link } from "react-router-dom";
import DynamicLink from "../../DynamicLink";
import { GetResourceByValue, GetSettingByValue } from "../DynamicSelectors";

import { useGoogleOneTapLogin } from 'react-google-one-tap-login';
const LogInButton = () => {
  
  useGoogleOneTapLogin({
    onError: error => console.log(error),
    onSuccess: response => console.log(response),
    googleAccountConfigs: {
      "client_id": "683785912525-0nb42nc0sofbh46v03qmsjs1ugtnojic.apps.googleusercontent.com"
    }
  });
  return (
    <li className="nav-item mb-2 mb-md-0">
      <Link
        className="nav-link d-flex nav-option-signin rounded-pill px-md-3 ms-md-2 justify-content-center "
        to={DynamicLink("log-in")}
        role="button"
        aria-expanded="false"
        style={{ minWidth: 85, color: "white" }}
      >
        {GetResourceByValue("common.login.title")}
      </Link>
    </li>
  );
};

export default LogInButton;
