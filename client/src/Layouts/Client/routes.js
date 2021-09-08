import { lazy } from "react";

// Auth
const UserProfile = lazy(() => import("../../Components/UserAccount/Profile"));
const ChangePassword = lazy(() =>
  import("../../Components/UserAccount/ChangePassword.js")
);

// Jupiter branchs
const BranchsList = lazy(() => import("../../Components/Branch/BranchsList"));
const BranchIndetail = lazy(() =>
  import("../../Components/Branch/BranchIndetail")
);

// Dashboards
const BranchAdminDashBoard = lazy(() =>
  import("../../Components/Dashboard/Dashboard.js")
);

// Client routes

// Client business frontend routing
const BusinessRegistration = lazy(() =>
  import("../../Components/Business/BusinessRegistration")
);
const BusinessesList = lazy(() =>
  import("../../Components/Business/BusinessesList")
);
const BusinessDetail = lazy(() =>
  import("../../Components/Business/BusinessDetail")
);

// Importing of machine related pages
const MachineDtail = lazy(() =>
  import("../../Components/Machine/MachineDtail")
);
const MachinesList = lazy(() =>
  import("../../Components/Machine/MachinesList")
);
// Importing of maintenance ralted pages
const MaintenanceAnnual = lazy(() =>
  import("../../Components/Maintenance/MaintenanceAnnual")
);
// Importing of maintenance ralted pages
const RequestMachineReturn = lazy(() =>
  import("../../Components/MachineReturn/RequestMachineReturn")
);
// Feedback
const SendFeedback = lazy(() =>
  import("../../Components/Feedback/SendFeedback")
);

const routes = [
  { path: "/", exact: true, name: "Client" },
  {
    path: "/dashboard",
    exact: true,
    name: "Dashboard",
    component: BranchAdminDashBoard,
  },
  // Branchs
  {
    path: "/branchs/list",
    exact: true,
    name: "Branchs-List",
    component: BranchsList,
  },
  {
    path: "/branch/indetail/:id",
    exact: true,
    name: "Branch-Indetail",
    component: BranchIndetail,
  },
  // Client bussiness
  {
    path: "/business/register",
    exact: true,
    name: "Register-Business",
    component: BusinessRegistration,
  },
  {
    path: "/business/list",
    exact: true,
    name: "Business-List",
    component: BusinessesList,
  },
  {
    path: "/business/detail/:id",
    exact: true,
    name: "Register-Business",
    component: BusinessDetail,
  },
  // Machine
  {
    path: "/available_machines",
    exact: true,
    name: "Available-Machines",
    component: MachineDtail,
  },
  {
    path: "/machines/list",
    exact: true,
    name: "Machines-List",
    component: MachinesList,
  },
  // Maintenance
  {
    path: "/maintenance/annual",
    exact: true,
    name: "Annual-Maintenance",
    component: MaintenanceAnnual,
  },

  // Machine returning
  {
    path: "/business/return-machine/:salesId",
    exact: true,
    name: "Request-Return-Machine",
    component: RequestMachineReturn,
  },

  // Feedback
  {
    path: "/send_feedback",
    exact: true,
    name: "Send-Feedback",
    component: SendFeedback,
  },
  // Account
  {
    path: "/change_password",
    exact: true,
    name: "Change-Password",
    component: SendFeedback,
  },
];

export default routes;
