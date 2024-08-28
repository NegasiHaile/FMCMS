import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CImg,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CCol,
} from "@coreui/react";

// sidebar nav config
import navigation from "./_nav";

const BranchAdminSidbar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);
  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
      className=""
    >
      <CSidebarBrand className="d-md-down-none text-decoration-none" to="/">
        <CCol className={"d-flex align-items-center py-1"}>
          <CImg
            className="c-sidebar-brand-full"
            name="logo-negative"
            src="logo.svg"
            height={45}
            style={{
              zIndex: "10",
            }}
          />

          <h5
            className="c-sidebar-brand-full"
            style={{
              color: "#999900",
              lineHeight: "14px",
              textAlign: "center",
              // backgroundColor: "red",
              marginLeft: "-3px",
              fontFamily: "cursive",
              // zIndex: "0",
              textDecoration: "none",
            }}
          >
            DEMER <br />
            solution
          </h5>
        </CCol>
        <CImg
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={25}
          src="logo.svg"
          style={{ marginLeft: "-60px" }}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(BranchAdminSidbar);
