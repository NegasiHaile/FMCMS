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
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

// sidebar nav config
import navigation from "./_nav";

const BranchAdminSidbar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CImg
          className="c-sidebar-brand-full"
          name="logo-negative"
          src="/logo/fulllogo.png"
          height={30}
        />
        <CImg
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={30}
          src="/logo/smalllogo.png"
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

        <div
          role="button"
          style={{
            position: "fixed",
            backgroundColor: "#999900",
            border: "none",
            borderRadius: "50px",
            left: "5px",
            bottom: "7px",
            zIndex: "1",
          }}
        >
          <h4
            style={{ padding: "0px 11px", color: "#fff", textAlign: "center" }}
          >
            <CIcon name="cil-speech" alt="Chat" />
          </h4>
        </div>
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(BranchAdminSidbar);
