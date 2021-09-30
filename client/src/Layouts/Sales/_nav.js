import React from "react";
import CIcon from "@coreui/icons-react";

// const NEW = "10";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-applications" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Sales List",
    to: "/sales/oflist",
    icon: "cil-star",
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Machine Controlling",
    route: "/Machine",
    icon: "cil-print",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Machines List",
        to: "/machines/list",
      },
      // {
      //   _tag: "CSidebarNavItem",
      //   name: "Assigne Machine",
      //   to: "/machine/distribute",
      // },
      {
        _tag: "CSidebarNavItem",
        name: "Maintenance List",
        to: "/maintenance/list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Withdrawal List",
        to: "/machine/return/list",
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Clients List",
    to: "/client/register",
    icon: "cil-contact",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Businesses List",
    to: "/businesses/list",
    icon: "cil-building",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Others"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Jupiter Branchs",
    to: "/branchs/list",
    icon: "cil-bank",
  },
];

export default _nav;
