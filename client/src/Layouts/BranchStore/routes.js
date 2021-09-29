import { lazy } from "react";

// User Account
const UserProfile = lazy(() => import("../../Components/UserAccount/Profile"));
const ChangePassword = lazy(() =>
  import("../../Components/UserAccount/ChangePassword")
);

// Jupiter branchs
const BranchsList = lazy(() => import("../../Components/Branch/BranchsList"));
const BranchIndetail = lazy(() =>
  import("../../Components/Branch/BranchIndetail")
);

// Dashboards
const branchDashboard = lazy(() =>
  import("../../Components/Dashboard/Dashboard")
);
const ClientDetail = lazy(() => import("../../Components/Client/ClientDetail"));

// Client business frontend routing
const BusinessesList = lazy(() =>
  import("../../Components/Business/BusinessesList")
);
const BusinessDetail = lazy(() =>
  import("../../Components/Business/BusinessDetail")
);
// Importing of machine related routes
const MachinesList = lazy(() =>
  import("../../Components/Machine/MachinesList")
);
const MachineIndetail = lazy(() =>
  import("../../Components/Machine/MachineIndetail")
);
// Importing MRC related routes
const MrcsList = lazy(() => import("../../Components/MRC/MrcsList"));
// Importing of maintenance ralted routes

// Importing of machine pickup ralted pages
const PickupDetail = lazy(() =>
  import("../../Components/Machine/PickupDetail")
);
// Importing of maintenance ralted pages
const MaintenanceList = lazy(() =>
  import("../../Components/Maintenance/MaintenanceList")
);
// Importing of Machine Returning ralted pages
const ReturningList = lazy(() =>
  import("../../Components/Machine/ReturningList/ReturningList")
);
// Importing of Machine Returning ralted pages
const MachineReturningLists = lazy(() =>
  import("../../Components/MachineReturn/MachineReturningLists")
);

// Importing of fiscalization ralted pages
const FiscalizationDetail = lazy(() =>
  import("../../Components/Fiscalization/FiscalizationDetail")
);
// Importing of Sales ralted pages
const SalesList = lazy(() => import("../../Components/Sales/SalesList"));
const SalesDetail = lazy(() => import("../../Components/Sales/SalesDetail"));
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
  {
    path: "/client/detail/:id",
    exact: true,
    name: "Client-Detail",
    component: ClientDetail,
  },
  {
    path: "/businesses/list",
    exact: true,
    name: "Business-List",
    component: BusinessesList,
  },
  {
    path: "/business/detail/:id",
    exact: true,
    name: "Business-Detail",
    component: BusinessDetail,
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
    name: "Machine-Detail",
    component: MachineIndetail,
  },
  {
    path: "/machine/returnlist",
    exact: true,
    name: "Request-Return-Machine",
    component: MachineReturningLists,
  },
  // MRC
  {
    path: "/mrcs/list",
    exact: true,
    name: "Mrc-List",
    component: MrcsList,
  }, // Machine pickup detail
  {
    path: "/pickup/detail/:id",
    exact: true,
    name: "Pickup-Detail",
    component: PickupDetail,
  },

  // Maintenance
  {
    path: "/maintenance/list",
    exact: true,
    name: "Maintenance-List",
    component: MaintenanceList,
  },

  // Machine returning
  {
    path: "/machine/return/list",
    exact: true,
    name: "Machine-Returning-List",
    component: ReturningList,
  },
  //Fiscalization
  {
    path: "/fiscalization/detail/:id",
    exact: true,
    name: "Fiscalization-Detail",
    component: FiscalizationDetail,
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
