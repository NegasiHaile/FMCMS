import React, { createContext, useState } from "react";
import UserAPI from "./api/UserAPI";
import UsersAPI from "./api/UsersAPI";
import BranchAPI from "./api/BranchAPI";
import MachineAPI from "./api/MachineAPI";
import BusinessAPI from "./api/BusinessAPI";
import SalesAPI from "./api/SalesAPI";
import NotificationAPI from "./api/NotificationAPI";
import ReturnMachineAPI from "./api/ReturnMachineAPI";
// import MachineAPI from "./api/MachineAPI";

import axios from "axios";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  const firstLogin = localStorage.getItem("firstLogin");
  if (firstLogin) {
    const refreshToken = async () => {
      const res = await axios.get("/user/refresh_token");

      setToken(res.data.accesstoken);

      setTimeout(() => {
        refreshToken();
      }, 10 * 60 * 1000);
    };
    refreshToken();
  }

  const state = {
    token: [token, setToken],
    UserAPI: UserAPI(token),
    UsersAPI: UsersAPI(),
    branchAPI: BranchAPI(),
    MachineAPI: MachineAPI(),
    BusinessAPI: BusinessAPI(),
    SalesAPI: SalesAPI(),
    NotificationAPI: NotificationAPI(),
    ReturnMachineAPI: ReturnMachineAPI(),
    // categoriesAPI: MachineAPI(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
