import { lazy } from "react";

// User Account
const UserProfile = lazy(() => import("../../Components/UserAccount/Profile"));
const ChangePassword = lazy(() =>
  import("../../Components/UserAccount/ChangePassword")
);

// Jupiter branchs
const OpenNewBranch = lazy(() => import("../../Components/Branch/BranchList"));
const BranchDetail = lazy(() => import("../../Components/Branch/BranchDetail"));

// Dashboards
const branchDashboard = lazy(() =>
  import("../../Components/Dashboard/Dashboard")
);

// Employee frontend routing
const EmployeesList = lazy(() =>
  import("../../Components/Employee/EmployeesList")
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

// Importing of Sales ralted pages
const SalesList = lazy(() => import("../../Components/Sales/SalesList"));
// Others pages
const FeedbacksList = lazy(() =>
  import("../../Components/Feedback/FeedbacksList")
);
const Inventory = lazy(() => import("../../Components/Inventory/Inventory"));
const SystemBackup = lazy(() => import("../../Components/System/SystemBackup"));

const routes = [
  { path: "/", exact: true, name: "Branch-Store" },
  {
    path: "/dashboard",
    exact: true,
    name: "Dashboard",
    component: branchDashboard,
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
  {
    path: "/Employee/List",
    exact: true,
    name: "Employee-List",
    component: EmployeesList,
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
    name: "Update-Business",
    component: BusinessRegistration,
  },
  {
    path: "/business/edit/:businessId",
    exact: true,
    name: "Update-Business",
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
  // {
  //   path: "/machine/distribute",
  //   exact: true,
  //   name: "Distribute-Machine",
  //   component: MachineDistribute,
  // },
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
    path: "/machine/returnlist",
    exact: true,
    name: "Request-Return-Machine",
    component: MachineReturningLists,
  },
  // Sales
  {
    path: "/sales/list",
    exact: true,
    name: "Sales-List",
    component: SalesList,
  },
  // User Accont
  {
    path: "/user/profile/:id",
    exact: true,
    name: "User-Profile",
    component: UserProfile,
  },
  {
    path: "/change_password",
    exact: true,
    name: "change_password",
    component: ChangePassword,
  },
  // others
  {
    path: "/feedbacks",
    exact: true,
    name: "Feedbacks",
    component: FeedbacksList,
  },
  {
    path: "/machine/inventory",
    exact: true,
    name: "Inventory",
    component: Inventory,
  },
  {
    path: "/system/backup",
    exact: true,
    name: "System-Backup",
    component: SystemBackup,
  },
];

export default routes;
