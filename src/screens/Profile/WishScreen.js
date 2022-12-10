import React from "react";
import LoadingIndicator from "../../components/LoadingIndicator";

const WishScreen = ({}) => {
  const [isLoading] = true;
  return (
    <>
      {isLoading ? (
        <LoadingIndicator></LoadingIndicator>
      ) : (
        <div className="profile-screen-container">
          <p>Wish</p>
        </div>
      )}
    </>
  );
};

export default WishScreen;
