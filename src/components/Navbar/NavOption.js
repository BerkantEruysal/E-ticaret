import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "rsuite";
// Bir text, icon ve hedef adres alır, navbar için düzenlenmiş link oluşturur.
//Navbardaki her bir link, bir seçenek varsayıldığı için isimlendirmesi NavOption şeklinde yapıldı.
//Kayıt olma ve kullanıcı profili butonları bu NavOpion kapsamında değil.
const NavOption = ({
  optionText,
  icon,
  targetUrl,
  iconAlt,
  onClick,
  badgeContent,
}) => {
  return (
    <li
      className="nav-item"
      onClick={
        onClick
          ? () => {
              onClick();
            }
          : () => {}
      }
    >
      <Link
        className="nav-link d-flex align-items-center nav-option rounded-pill px-2"
        aria-current="page"
        to={targetUrl}
      >
        {badgeContent ? (
          <Badge content={badgeContent}>
            <img
              src={icon}
              alt={iconAlt}
              style={{ height: 20 }}
              className="me-2"
            />
          </Badge>
        ) : (
          <img
            src={icon}
            alt={iconAlt}
            style={{ height: 20 }}
            className="me-2"
          />
        )}
        <p className="mb-0"> {optionText} </p>
      </Link>
    </li>
  );
};

export default NavOption;
