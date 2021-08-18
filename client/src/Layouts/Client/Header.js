import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CToggler,
  CImg,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

// routes config
import routes from "./routes";

import TheHeaderDropdown from "../../Components/HeaderDropDowns/TheHeaderDropdown";
import TheHeaderDropdownNotif from "../../Components/HeaderDropDowns/TheHeaderDropdownNotif";

const BranchAdminHeader = () => {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;

  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CImg name="logo" height="30" src="/logo/fulllogo.png" alt="Logo" />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/dashboard">Open-Thicket</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/machines/list">Machines</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <TheHeaderDropdownNotif />
        <TheHeaderDropdown />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
        <div className="d-md-down-none mfe-2 c-subheader-nav">
          <CLink className="c-subheader-nav-link" to="/send_feedback">
            <CIcon name="cil-speech" alt="Feedback" />
          </CLink>
        </div>
      </CSubheader>
    </CHeader>
  );
};

export default BranchAdminHeader;
