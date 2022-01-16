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
    _tag: "CSidebarNavTitle",
    _children: ["Machine Controlling"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Machines List",
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
    _children: ["Client Management"],
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
