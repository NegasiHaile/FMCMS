import React from "react";
import CIcon from "@coreui/icons-react";

// const NEW = "10";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    // badge: {
    //   color: "success",
    //   text: NEW,
    // },
  },
  {
    _tag: "CSidebarNavItem",
    name: "General Sales",
    to: "/sales/oflist",
    icon: "cil-star",
  },
  // Machines Managment and controlling
  {
    _tag: "CSidebarNavTitle",
    _children: ["Machine-Managment"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "List of Machines",
    to: "/machines/list",
    icon: "cil-print",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Distribute Machine",
    to: "/machine/distribution",
    icon: "cil-control",
  },

  // MRC Managment and controlling
  {
    _tag: "CSidebarNavTitle",
    _children: ["MRC-Managment"],
  },

  {
    _tag: "CSidebarNavItem",
    name: "List of all MRC",
    to: "/mrcs/list",
    icon: "cil-asterisk-circle",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Distribute MRC",
    to: "/mrc/distribution",
    icon: "cil-asterisk",
  },

  // Spares Managment and controlling
  // {
  //   _tag: "CSidebarNavTitle",
  //   _children: ["Spares-Managment"],
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "SIM-Card List",
  //   to: "/machines/list",
  //   icon: "cil-file",
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Other Spares",
  //   to: "/machines/list",
  //   icon: "cil-blur",
  // },

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
