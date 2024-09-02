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
  {
    _tag: "CSidebarNavItem",
    name: "Sales List",
    to: "/sales/oflist",
    icon: "cil-money",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Branchs-List",
    to: "/branchs/list",
    icon: "cil-bank",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["User-Management"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Add User",
    to: "/Employee/Register",
    icon: "cil-user-plus",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Users List",
    to: "/Employee/List",
    icon: "cil-group",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Machine's-Management"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "All Machines",
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
    _children: ["MRC/SIM-Management"],
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
  {
    _tag: "CSidebarNavTitle",
    _children: ["Client-Management"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Client List",
    to: "/client/register",
    icon: "cil-contact",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Business-List",
    to: "/businesses/list",
    icon: "cil-building",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Others"],
  },

  {
    _tag: "CSidebarNavItem",
    name: "Pricing",
    to: "/pricing",
    icon: "cil-dollar",
  },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Feedbacks",
  //   to: "/feedbacks",
  //   icon: "cil-speech",
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Inventory",
  //   to: "/machine/inventory",
  //   icon: "cil-graph",
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "System Backup",
  //   to: "/system/backup",
  //   icon: "cil-shield-alt",
  // },
  {
    _tag: "CSidebarNavItem",
    name: "System Setting",
    to: "/system/setting",
    icon: "cil-settings",
  },
];

export default _nav;
