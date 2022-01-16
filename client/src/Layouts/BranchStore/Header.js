import React from "react";
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

import TheHeaderDropdownSales from "../../Components/HeaderDropDowns/TheHeaderDropdownSales";
import TheHeaderDropdown from "../../Components/HeaderDropDowns/TheHeaderDropdown";
// import TheHeaderDropdownMssg from "../../Components/HeaderDropDowns/TheHeaderDropdownMssg";
import TheHeaderDropdownMaint from "../../Components/HeaderDropDowns/TheHeaderDropdownMaint";

const Header = () => {
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
          <CHeaderNavLink to="/machines/list">Machines</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/mrcs/list">MRCs</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/simcard/list">SIM-Cards</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <TheHeaderDropdownSales />
        <TheHeaderDropdownMaint />
        {/* <TheHeaderDropdownMssg /> */}
        <TheHeaderDropdown />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
        <div className="d-md-down-none mfe-2 c-subheader-nav">
          {/* <CLink className="c-subheader-nav-link" href="#">
            <CIcon name="cil-speech" alt="Settings" />
          </CLink>
          <CLink
            className="c-subheader-nav-link"
            aria-current="page"
            to="/machine/inventory"
          >
            <CIcon name="cil-graph" alt="Branch Inventory" />
            &nbsp;Inventory
          </CLink> */}
          <CLink className="c-subheader-nav-link" to="/Branchs/List">
            <CIcon name="cil-Bank" alt="Main-Store" />
            &nbsp;Jupiter-Branchs
          </CLink>
        </div>
      </CSubheader>
    </CHeader>
  );
};

export default Header;
