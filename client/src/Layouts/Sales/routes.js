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
const MachineIndetail = lazy(() =>
  import("../../Components/Machine/MachineIndetail")
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
const SalesDetail = lazy(() => import("../../Components/Sales/SalesDetail"));
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
    path: "/businesses/list",
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
  // Machine
  {
    path: "/machines/list",
    exact: true,
    name: "Machines-List",
    component: MachinesList,
  },
  {
    path: "/machine/indetail/:id",
    exact: true,
    name: "Machine-Indetail",
    component: MachineIndetail,
  },
  {
    path: "/machine/returnlist",
    exact: true,
    name: "Request-Return-Machine",
    component: MachineReturningLists,
  },
  {
    path: "/business/return-machine/:salesId",
    exact: true,
    name: "Request-Return-Machine",
    component: RequestMachineReturn,
  },
  // Maintenance
  {
    path: "/maintenance/annual",
    exact: true,
    name: "Annual-Maintenance",
    component: MaintenanceAnnual,
  },
  // Sales
  {
    path: "/sales/oflist",
    exact: true,
    name: "Sales-List",
    component: SalesList,
  },
  {
    path: "/sales/detail/:id",
    exact: true,
    name: "Sales-Detail",
    component: SalesDetail,
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
