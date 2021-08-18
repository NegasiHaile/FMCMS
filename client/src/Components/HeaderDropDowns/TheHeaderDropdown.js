import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const TheHeaderDropdown = () => {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;

  const logoutUser = async () => {
    await axios.get("/user/logout");

    localStorage.removeItem("firstLogin");

    window.location.href = "/";
  };
  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={"/avatars/admin.jpg"}
            className="c-avatar-img"
            alt={`${user.userRole}: ${user.fName}`}
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {/* <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem to="/dashboard">
          <CIcon name="cil-task" className="mfe-2" />
          {user.branch}
        </CDropdownItem> */}
        {/* <CDropdownItem>
          <CIcon name="cil-comment-square" className="mfe-2" />
          Comments
          <CBadge color="warning" className="mfs-auto">
            42
          </CBadge>
        </CDropdownItem> */}
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Settings</strong>
        </CDropdownItem>
        <CDropdownItem to={`/user/profile/${user._id}`}>
          <CIcon name="cil-user" className="mfe-2" />
          {user.fName + " " + user.mName}
        </CDropdownItem>
        <CDropdownItem to="/change_password">
          <CIcon name="cil-settings" className="mfe-2" />
          Change Password
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={logoutUser}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Lock Account
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
