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
    //   color: "success",
    //   text: NEW,
    // },
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Machines-Managment"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Machines List",
    to: "/machines/list",
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
    _children: ["Client-Managment"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Clients List",
    to: "/client/register",
    icon: "cil-contact",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Business-List",
    to: "/business/list",
    icon: "cil-building",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Others"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Branch Inventory",
    to: "/machine/inventory",
    icon: "cil-shield-alt",
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
    to: "/branchs/list",
    icon: "cil-bank",
  },
];

export default _nav;
