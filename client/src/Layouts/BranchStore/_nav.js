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
    _tag: "CSidebarNavTitle",
    _children: ["Machine-Managment"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "New Arrivals",
    to: "/machine/distribution",
    icon: "cil-control",
    badge: {
      color: "danger",
      text: 200,
    },
  },
  {
    _tag: "CSidebarNavItem",
    name: "List of all machines",
    to: "/machines/list",
    icon: "cil-print",
  },
  // MRC Managment and controlling
  {
    _tag: "CSidebarNavTitle",
    _children: ["MRC-Managment"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "New Arrivals",
    to: "/mrc/distribution",
    icon: "cil-asterisk",
    badge: {
      color: "danger",
      text: 200,
    },
  },

  {
    _tag: "CSidebarNavItem",
    name: "List of all MRC",
    to: "/mrcs/list",
    icon: "cil-asterisk-circle",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Sales"],
  },
  // Spares Managment and controlling
  {
    _tag: "CSidebarNavTitle",
    _children: ["Spares-Managment"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "SIM-Card List",
    to: "/machines/list",
    icon: "cil-file",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Other Spares",
    to: "/mrc/list",
    icon: "cil-blur",
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
