import React from "react";
import { Link } from "react-router-dom";
import DynamicLink from "../../DynamicLink";

// Kullanıcı gerekli giriş veya kayıt sayfasına yönlendirecek olan sayfa veya hover'ı aktif etmek için kullanıldı.
const SignInButton = () => {
  return (
    <li className="nav-item mb-2 mb-md-0">
      <Link
        className="nav-link d-flex nav-option-signin rounded-pill px-md-3 ms-md-2 justify-content-center "
        to={DynamicLink("sign-in")}
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ minWidth: 85, color: "white" }}
      >
        Sign In
      </Link>
    </li>
  );
};

export default SignInButton;
