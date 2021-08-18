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
      {
        _tag: "CSidebarNavItem",
        name: "Distribute Machine",
        to: "/machine/distribute",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Machine Returns",
        to: "/machine/returnlist",
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Business Owners",
    to: "/client/register",
    icon: "cil-contact",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Businesses",
    to: "/business/list",
    icon: "cil-building",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Others"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Machine Sales",
    to: "/sales/list",
    icon: "cil-star",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Jupiter Branchs",
    to: "/Branch/List",
    icon: "cil-bank",
  },
];

export default _nav;
