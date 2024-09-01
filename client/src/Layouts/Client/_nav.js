import React from "react";
import CIcon from "@coreui/icons-react";

// const NEW = "10";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Home",
    to: "/dashboard",
    icon: <CIcon name="cil-home" customClasses="c-sidebar-nav-icon" />,
    // badge: {
    //   color: "info",
    //   text: NEW,
    // },
  },
  {
    _tag: "CSidebarNavItem",
    name: "My Businesses",
    to: "/businesses/list",
    icon: "cil-building",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Available Machines",
    to: "/available_machines",
    icon: "cil-print",
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Maintenance",
    route: "/maintenance",
    icon: "cil-memory",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Annual",
        to: "/maintenance/annual",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Incident",
        to: "/maintenance/incident",
      },
    ],
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Others"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Branchs",
    to: "/branchs/list",
    icon: "cil-bank",
  },

  {
    _tag: "CSidebarNavItem",
    name: "Send Feedback",
    to: "/send_feedback",
    icon: "cil-speech",
  },
];

export default _nav;
