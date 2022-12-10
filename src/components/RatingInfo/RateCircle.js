import React from "react";

//Deneyimlerin aldığı oy oranını temsil eden dairelerden birtanesini oluşturur. Dolu veya boşluk durumu bilgisini alır ve buna göre render edilir.
const RateCircle = ({ isBlue }) => {
  return (
    <div
      className="rounded-circle "
      style={{
        width: 15,
        height: 15,
        backgroundColor: `${isBlue ? "#2532a3" : "#fff"}`,
        borderColor: `${isBlue ? "#2532a3" : "000"}`,
        borderWidth: 1,
        borderStyle: "solid",
      }}
    ></div>
  );
};

export default RateCircle;
