import React from "react";
import CIcon from "@coreui/icons-react";

// const NEW = "10";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },

  {
    _tag: "CSidebarNavItem",
    name: "Branch Sales",
    to: "/sales/oflist",
    icon: "cil-star",
  },
  // Machines Managment and controlling
  {
    _tag: "CSidebarNavItem",
    name: "List of machines",
    to: "/machines/list",
    icon: "cil-print",
  },
  // MRC Managment and controlling

  {
    _tag: "CSidebarNavItem",
    name: "List of  MRC",
    to: "/mrcs/list",
    icon: "cil-asterisk-circle",
  },
  {
    _tag: "CSidebarNavItem",
    name: "SIM-Card List",
    to: "/branch_simcards/list",
    icon: "cil-file",
  },

  // others
  {
    _tag: "CSidebarNavTitle",
    _children: ["Others"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Feedbacks",
    to: "/feedbacks",
    icon: "cil-speech",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Jupiter Branchs",
    to: "/Branch/List",
    icon: "cil-bank",
  },
];

export default _nav;
