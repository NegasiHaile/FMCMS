import React, { useContext, Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GlobalState } from "./GlobalState";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Users
const ClientLayout = lazy(() => import("./Layouts/Client/Layout"));
const SlaesLayout = lazy(() => import("./Layouts/Sales/Layout"));
const TechnicianLayout = lazy(() => import("./Layouts/Technician/Layout"));
const BranchAdminLayout = lazy(() => import("./Layouts/BranchAdmin/Layout"));
const SuperAdminLayout = lazy(() => import("./Layouts/SuperAdmin/Layout"));

// Public pages
const Login = lazy(() => import("./Components/Login"));
const Page404 = lazy(() => import("./Components/Utils/page404/Page404"));
const Page500 = lazy(() => import("./Components/Utils/page500/Page500"));

function App() {
  const state = useContext(GlobalState);
  const [isLogged] = state.UserAPI.isLogged;
  const [user] = state.UserAPI.User;
  console.log({ user: user, isLogged: isLogged });

  // setTimeout(() => {}, 5000)

  let userLayout;
  if (isLogged && user.userRole === "client") {
    userLayout = (
      <Route
        path="/"
        name="Client"
        render={(props) => <ClientLayout {...props} />}
      />
    ); // client Layout
  } else if (isLogged && user.userRole === "sales") {
    userLayout = (
      <Route
        path="/"
        name="Sales"
        render={(props) => <SlaesLayout {...props} />}
      />
    ); // client Layout
  } else if (isLogged && user.userRole === "technician") {
    userLayout = (
      <Route
        path="/"
        name="Technician"
        render={(props) => <TechnicianLayout {...props} />}
      />
    ); // client Layout
  } else if (isLogged && user.userRole === "branch-admin") {
    userLayout = (
      <Route
        path="/"
        name="B-A"
        render={(props) => <BranchAdminLayout {...props} />}
      />
    ); // Branch Admin Layout
  } else if (isLogged && user.userRole === "super-admin") {
    userLayout = (
      <Route
        path="/"
        name="S-A"
        render={(props) => <SuperAdminLayout {...props} />}
      />
    ); // super admin Layout
  } else {
    userLayout = (
      <Route
        path="/"
        name="Login Page"
        render={(props) => <Login {...props} />}
      />
    ); // for an authorized user
  }

  return (
    <div className="App">
      <h1> This despilays if Success!</h1>
      {/* <BrowserRouter>
        <Suspense fallback={loading}>
          <Switch>
            {userLayout}
            <Route
              exact
              path="*"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
          </Switch>
        </Suspense>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
