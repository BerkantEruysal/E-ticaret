import React from "react";
import LoadingIndicator from "../../components/LoadingIndicator";
import ProfileHeader from "./ProfileHeader";
import PageTitle from "../../components/PageTitle";

const ProfileScreen = () => {
  PageTitle("Profile");
  const isLoading = false;
  return (
    <>
      {isLoading ? (
        <LoadingIndicator></LoadingIndicator>
      ) : (
        <div className="profile-screen-container">
          <ProfileHeader />
          <div className="container-lg profile-screen-content">
            <p>Profile</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileScreen;
