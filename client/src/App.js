import React, { useContext, Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GlobalState } from "./GlobalState";
import "./scss/style.scss";

const loading = <div className="loader"></div>;

// Users
const ClientLayout = lazy(() => import("./Layouts/Client/Layout"));
const SlaesLayout = lazy(() => import("./Layouts/Sales/Layout"));
const CustomerServiceLayout = lazy(() =>
  import("./Layouts/CustomerService/Layout")
);
const TechnicianLayout = lazy(() => import("./Layouts/Technician/Layout"));

const MachineControllerLayout = lazy(() =>
  import("./Layouts/MachineController/Layout")
);
const BranchStoreLayout = lazy(() => import("./Layouts/BranchStore/Layout"));
const MainStoreLayout = lazy(() => import("./Layouts/MainStore/Layout"));
const OprationalManagerLayout = lazy(() =>
  import("./Layouts/OprationalManager/Layout")
);
const BranchAdminLayout = lazy(() => import("./Layouts/BranchAdmin/Layout"));
const SuperAdminLayout = lazy(() => import("./Layouts/SuperAdmin/Layout"));

// Public pages
const Login = lazy(() => import("./Components/Login"));
const ForgotPassword = lazy(() =>
  import("./Components/UserAccount/ForgotPassword")
);
const ResetPassword = lazy(() =>
  import("./Components/UserAccount/ResetPassword")
);

// const Page404 = lazy(() => import("./Components/Utils/page404/Page404"));
const Page500 = lazy(() => import("./Components/Utils/page500/Page500"));

const Loader = lazy(() => import("./Components/Utils/Commons/Loader"));

function App() {
  const state = useContext(GlobalState);
  const [isLogged] = state.UserAPI.isLogged;
  const [user] = state.UserAPI.User;

  // setTimeout(() => {}, 5000)

  var isThereAUser = localStorage.getItem("firstLogin");
  let userLayout;
  if (isThereAUser) {
    if (isLogged && user) {
      if (user.userRole === "client") {
        userLayout = (
          <Route
            path="/"
            name="Client"
            render={(props) => <ClientLayout {...props} />}
          />
        ); // client Layout
      } else if (user.userRole === "sales") {
        userLayout = (
          <Route
            path="/"
            name="Sales"
            render={(props) => <SlaesLayout {...props} />}
          />
        ); // client Layout
      } else if (user.userRole === "customer-service") {
        userLayout = (
          <Route
            path="/"
            name="Customer Service"
            render={(props) => <CustomerServiceLayout {...props} />}
          />
        ); // client Layout
      } else if (user.userRole === "technician") {
        userLayout = (
          <Route
            path="/"
            name="Technician"
            render={(props) => <TechnicianLayout {...props} />}
          />
        ); // client Layout
      } else if (user.userRole === "machine-controller") {
        userLayout = (
          <Route
            path="/"
            name="Branch-Store"
            render={(props) => <MachineControllerLayout {...props} />}
          />
        ); // Branch Admin Layout
      } else if (user.userRole === "branch-store") {
        userLayout = (
          <Route
            path="/"
            name="Branch-Store"
            render={(props) => <BranchStoreLayout {...props} />}
          />
        ); // Branch Admin Layout
      } else if (user.userRole === "main-store") {
        userLayout = (
          <Route
            path="/"
            name="Main-Store"
            render={(props) => <MainStoreLayout {...props} />}
          />
        ); // Branch Admin Layout
      } else if (user.userRole === "operational-manager") {
        userLayout = (
          <Route
            path="/"
            name="O-M"
            render={(props) => <OprationalManagerLayout {...props} />}
          />
        ); // Branch Admin Layout
      } else if (user.userRole === "branch-admin") {
        userLayout = (
          <Route
            path="/"
            name="B-A"
            render={(props) => <BranchAdminLayout {...props} />}
          />
        ); // Branch Admin Layout
      } else if (user.userRole === "super-admin") {
        userLayout = (
          <Route
            path="/"
            name="S-A"
            render={(props) => <SuperAdminLayout {...props} />}
          />
        ); // super admin Layout
      }
    } else {
      userLayout = <Loader />;
    }
  } else {
    userLayout = (
      <Route
        path="/"
        exact
        name="Login Page"
        render={(props) => <Login {...props} />}
      />
    ); // for an authorized user
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Switch>
            {userLayout}

            <Route
              exact
              path="/forgotpassword"
              name="Forgot Password"
              render={(props) => <ForgotPassword {...props} />}
            />
            <Route
              path="/resetpassword/:resetToken"
              name="Reset Password"
              render={(props) => <ResetPassword {...props} />}
            />
            <Route
              exact
              path="*"
              name="Page 404"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
