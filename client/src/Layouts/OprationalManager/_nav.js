import React from "react";
import CIcon from "@coreui/icons-react";

// const NEW = "10";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Branch Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    // badge: {
    //   color: "success",
    //   text: NEW,
    // },
  },

  {
    _tag: "CSidebarNavItem",
    name: "Machine Sales",
    to: "/sales/list",
    icon: "cil-star",
  },
  // Client-Managment
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
    name: "Business List",
    to: "/business/list",
    icon: "cil-building",
  },

  // Machine-Managment
  {
    _tag: "CSidebarNavTitle",
    _children: ["Machine-Managment"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Machines List",
    to: "/machines/list",
    icon: "cil-print",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Machine Returns",
    to: "/machine/returnlist",
    icon: "cil-recycle",
  },

  // Maintenance Managment
  {
    _tag: "CSidebarNavTitle",
    _children: ["Maintenance Managment"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Annual",
    to: "/maintenance/annual",
    icon: "cil-at",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Incident",
    to: "/maintenance/incident",
    icon: "cil-camera-roll",
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
    to: "/branchs/list",
    icon: "cil-bank",
  },
];

export default _nav;
