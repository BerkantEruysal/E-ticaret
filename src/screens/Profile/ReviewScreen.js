import React from "react";
import LoadingIndicator from "../../components/LoadingIndicator";

const ReviewScreen = ({}) => {
  const [isLoading] = true;
  return (
    <>
      {isLoading ? (
        <LoadingIndicator></LoadingIndicator>
      ) : (
        <div className="profile-screen-container">
          <p>Review</p>
        </div>
      )}
    </>
  );
};

export default ReviewScreen;
