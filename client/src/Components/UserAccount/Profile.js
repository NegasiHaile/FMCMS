import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";
function Profile() {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;

  return (
    <div>
      <h2>THis is the user profile</h2>
      <div>
        <h4>
          {user.fName} {user.mName}
          {user.lName}
        </h4>
        <h4>{user.email}</h4>
      </div>
    </div>
  );
}

export default Profile;
