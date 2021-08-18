import { lazy } from "react";

// Auth
const UserProfile = lazy(() => import("../../Components/UserAccount/Profile"));
const ChangePassword = lazy(() =>
  import("../../Components/UserAccount/ChangePassword.js")
);

// Jupiter branchs
const OpenNewBranch = lazy(() => import("../../Components/Branch/BranchList"));
const BranchDetail = lazy(() => import("../../Components/Branch/BranchDetail"));

// Dashboards
const BranchAdminDashBoard = lazy(() =>
  import("../../Components/Dashboard/Dashboard.js")
);

// Client routes
const RegisterClient = lazy(() =>
  import("../../Components/Client/RegisterClient")
);
const ClientDetail = lazy(() => import("../../Components/Client/ClientDetail"));

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
const MachineDistribute = lazy(() =>
  import("../../Components/Machine/MachineDistribute")
);
const MachinesList = lazy(() =>
  import("../../Components/Machine/MachinesList")
);
// Importing of maintenance ralted pages
const MaintenanceAnnual = lazy(() =>
  import("../../Components/Maintenance/MaintenanceAnnual")
);

// Importing of Machine Returning ralted pages
const MachineReturningLists = lazy(() =>
  import("../../Components/MachineReturn/MachineReturningLists")
);
// Importing of maintenance ralted pages
const RequestMachineReturn = lazy(() =>
  import("../../Components/MachineReturn/RequestMachineReturn")
);
// Importing of Sales ralted pages
const SalesList = lazy(() => import("../../Components/Sales/SalesList"));
// Feedback
const SendFeedback = lazy(() =>
  import("../../Components/Feedback/SendFeedback")
);

const routes = [
  { path: "/", exact: true, name: "Sales" },
  {
    path: "/dashboard",
    exact: true,
    name: "Dashboard",
    component: BranchAdminDashBoard,
  },
  // Branchs
  {
    path: "/Branch/List",
    exact: true,
    name: "Jupter-Trading-Branchs",
    component: OpenNewBranch,
  },
  {
    path: "/Branch/Detail/:id",
    exact: true,
    name: "Branch-Detail",
    component: BranchDetail,
  },
  // Client
  {
    path: "/client/register",
    exact: true,
    name: "Register-Client",
    component: RegisterClient,
  },
  {
    path: "/client/detail/:id",
    exact: true,
    name: "Client-Detail",
    component: ClientDetail,
  },
  // Client bussiness
  {
    path: "/business/register/:clientId",
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
    path: "/business/edit/:businessId",
    exact: true,
    name: "Update-Business",
    component: BusinessRegistration,
  },
  {
    path: "/business/detail/:id",
    exact: true,
    name: "Business-Detail",
    component: BusinessDetail,
  },
  // Machine
  {
    path: "/machine/distribute",
    exact: true,
    name: "Distribute-Machine",
    component: MachineDistribute,
  },
  {
    path: "/machines/list",
    exact: true,
    name: "Machines-List",
    component: MachinesList,
  },
  {
    path: "/machines/list",
    exact: true,
    name: "Machines-List",
    component: MachinesList,
  },
  // Machine returning
  {
    path: "/machine/returnlist",
    exact: true,
    name: "Request-Return-Machine",
    component: MachineReturningLists,
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
  // Sales
  {
    path: "/sales/list",
    exact: true,
    name: "Sales-List",
    component: SalesList,
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
    component: ChangePassword,
  },
];

export default routes;
