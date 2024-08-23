import { useState, useEffect } from "react";
import axios from "axios";

import { getConfig } from "../config";

function MaintenanceAPI() {
  const { apiUrl } = getConfig();
  const [maintenances, setMaintenances] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getMaintenances = async () => {
      try {
        const res = await axios.get(`${apiUrl}/maintenance/list`);
        setMaintenances(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMaintenances();
  }, [callback]);
  return {
    maintenances: [maintenances, setMaintenances],
    callback: [callback, setCallback],
  };
}

export default MaintenanceAPI;
