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
    name: "Branchs-List",
    to: "/branchs/list",
    icon: "cil-bank",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Employees-Managment"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Add Employee",
    to: "/Employee/Register",
    icon: "cil-user-plus",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Get Employees",
    to: "/Employee/List",
    icon: "cil-group",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Machine's-Managment"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "All Machines",
    to: "/machines/list",
    icon: "cil-print",
  },
  {
    _tag: "CSidebarNavItem",
    name: "General Sales",
    to: "/sales/oflist",
    icon: "cil-money",
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
    _children: ["MRC/SIM-Managment"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "MRCs List",
    to: "/mrcs/list",
    icon: "cil-file",
  },

  {
    _tag: "CSidebarNavItem",
    name: "SIM Cards List",
    to: "/simcard/list",
    icon: "cil-file",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Client's-Managment"],
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
  {
    _tag: "CSidebarNavItem",
    name: "Feedbacks",
    to: "/feedbacks",
    icon: "cil-speech",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Inventory",
    to: "/machine/inventory",
    icon: "cil-graph",
  },
  {
    _tag: "CSidebarNavItem",
    name: "System Backup",
    to: "/system/backup",
    icon: "cil-shield-alt",
  },
  {
    _tag: "CSidebarNavItem",
    name: "System Setting",
    to: "/system/setting",
    icon: "cil-settings",
  },
];

export default _nav;
