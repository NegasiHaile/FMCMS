import React from "react";
import CIcon from "@coreui/icons-react";

// const NEW = "10";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-applications" customClasses="c-sidebar-nav-icon" />,
    // badge: {
    //   color: "info",
    //   text: NEW,
    // },
  },
  // Machines Controlling and controlling
  {
    _tag: "CSidebarNavTitle",
    _children: ["Machine-Controlling"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "List of Machines",
    to: "/machines/list",
    icon: "cil-print",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Maintenance List",
    to: "/maintenance/list",
    icon: "cil-memory",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Withdrawal List",
    to: "/machine/return/list",
    icon: "cil-recycle",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["MRC/SIM-Controlling"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "MRCs List",
    to: "/mrcs/list",
    icon: "cil-asterisk-circle",
  },

  {
    _tag: "CSidebarNavItem",
    name: "SIM Cards List",
    to: "/simcard/list",
    icon: "cil-file",
  },
  // others
  {
    _tag: "CSidebarNavTitle",
    _children: ["Others"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Sales List",
    to: "/sales/oflist",
    icon: "cil-money",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Branchs",
    to: "/branchs/list",
    icon: "cil-bank",
  },
];

export default _nav;
