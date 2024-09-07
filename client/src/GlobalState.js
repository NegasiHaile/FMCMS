/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from "react";
import UserAPI from "./api/UserAPI";
import UsersAPI from "./api/UsersAPI";
import BranchAPI from "./api/BranchAPI";
import MachineAPI from "./api/MachineAPI";
import MRCAPI from "./api/MRCAPI";
import SIMCardAPI from "./api/SIMCardAPI";
import BusinessAPI from "./api/BusinessAPI";
import SalesAPI from "./api/SalesAPI";
import MaintenanceAPI from "./api/MaintenanceAPI";
import NotificationAPI from "./api/NotificationAPI";
import MachinePickUpAPI from "./api/MachinePickupAPI";
import PricingAPI from "./api/PricingAPI";
// import MachineAPI from "./api/MachineAPI";

import { getConfig } from "./config";

import axios from "axios";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const { apiUrl } = getConfig();
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const refreshToken = async () => {
        try {
          const res = await axios.get(`${apiUrl}/user/refresh_token`, {
            withCredentials: true,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          setToken(res.data.accesstoken);

          // setTimeout(() => {
          //   refreshToken();
          // }, 10 * 60 * 1000);
        } catch {
          await axios.get(`${apiUrl}/user/logout`);
          localStorage.removeItem("firstLogin");
          window.location.href = "/";
        }
      };

      refreshToken();
    }
  }, []);

  const state = {
    token: [token, setToken],
    UserAPI: UserAPI(token),
    UsersAPI: UsersAPI(),
    branchAPI: BranchAPI(),
    MachineAPI: MachineAPI(),
    MRCAPI: MRCAPI(),
    SIMCardAPI: SIMCardAPI(),
    BusinessAPI: BusinessAPI(),
    SalesAPI: SalesAPI(),
    MaintenanceAPI: MaintenanceAPI(),
    NotificationAPI: NotificationAPI(),
    MachinePickUpAPI: MachinePickUpAPI(),
    PricingAPI: PricingAPI(),
    // categoriesAPI: MachineAPI(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
/* eslint-enable react/prop-types */
