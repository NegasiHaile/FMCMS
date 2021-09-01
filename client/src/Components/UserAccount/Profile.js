import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
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
    } else {
    }
  }, [params.id, users]);

  return (
    <div>
      {userDetail ? (
        <>
          <h5>
            Full Name:{" "}
            {userDetail.fName + " " + userDetail.mName + " " + userDetail.lName}{" "}
          </h5>
          <h5>Contacts: {userDetail.phoneNumber + " " + userDetail.email}</h5>

          <div></div>
        </>
      ) : (
        <BadRouting text="This is bad routing! No data to fetch, please go back to users list you need to see it's detail and click the see detail button." />
      )}
    </div>
  );
}

export default Profile;
