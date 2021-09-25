import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  // Machines Managment and controlling
  {
    _tag: "CSidebarNavTitle",
    _children: ["Machine-Managment"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "List of Machines",
    to: "/machines/list",
    icon: "cil-print",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Sales List",
    to: "/sales/oflist",
    icon: "cil-control",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Maintenance List",
    to: "/sales/oflist",
    icon: "cil-memory",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Returning List",
    to: "/sales/oflist",
    icon: "cil-recycle",
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
