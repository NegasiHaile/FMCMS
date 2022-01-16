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
    name: "Employees",
    to: "/Employee/List",
    icon: "cil-group",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Sales List",
    to: "/sales/oflist",
    icon: "cil-money",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Machines-Management"],
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
    name: "Clients List",
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
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Branch Inventory",
  //   to: "/machine/inventory",
  //   icon: "cil-shield-alt",
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Branch Backup",
  //   to: "/system/backup",
  //   icon: "cil-graph",
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Feedbacks",
  //   to: "/feedbacks",
  //   icon: "cil-speech",
  // },
  {
    _tag: "CSidebarNavItem",
    name: "Jupiter Branchs",
    to: "/branchs/list",
    icon: "cil-bank",
  },
];

export default _nav;
