import React from "react";
import CIcon from "@coreui/icons-react";

// const NEW = "10";

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
    name: "New Machine Arrivals",
    to: "/sales/list",
    icon: "cil-control",
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
    to: "/Branch/List",
    icon: "cil-bank",
  },
];

export default _nav;
