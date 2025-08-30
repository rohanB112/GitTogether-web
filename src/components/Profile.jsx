import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  // console.log(user.firstName);
  return (
    user && (
      <div>
        <EditProfile user={user} />
      </div>
    )
  );
};

export default Profile;
