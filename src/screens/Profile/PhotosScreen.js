import React from "react";
import LoadingIndicator from "../../components/LoadingIndicator";
import ProfileHeader from "./ProfileHeader";

const PhotosScreen = ({}) => {
  const isLoading = true;
  return (
    <>
      {isLoading ? (
        <LoadingIndicator></LoadingIndicator>
      ) : (
        <div className="profile-screen-container">
          <ProfileHeader />
          <p>Photos</p>
        </div>
      )}
    </>
  );
};

export default PhotosScreen;
