import { useState, useEffect } from "react";
import axios from "axios";
function MaintenanceAPI() {
  const [maintenances, setMaintenances] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getMaintenances = async () => {
      const res = await axios.get("/maintenance/list");
      setMaintenances(res.data);
    };

    getMaintenances();
  }, [callback]);
  return {
    maintenances: [maintenances, setMaintenances],
    callback: [callback, setCallback],
  };
}

export default MaintenanceAPI;
