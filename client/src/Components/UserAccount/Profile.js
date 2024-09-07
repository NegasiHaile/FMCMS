import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import UserInfo from "./Components/UserInfo";
import BadRouting from "../Utils/routing/BadRouting";
function Profile() {
  const state = useContext(GlobalState);
  const params = useParams();
  const [users] = state.UsersAPI.users;
  const [userDetail, setUserDetail] = useState("");

  useEffect(() => {
    if (params.id) {
      const user = users.find((filteredUser) => filteredUser._id === params.id);
      setUserDetail(user);
    }
  }, [params.id, users]);

  return (
    <div>
      {userDetail ? (
        <>
          <UserInfo id={params.id} />
          <div></div>
        </>
      ) : (
        <BadRouting text="Bad routing! Please go back to users list and click the DETAIL button of you need to see it's detail." />
      )}
    </div>
  );
}

export default Profile;
