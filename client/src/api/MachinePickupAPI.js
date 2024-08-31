import { useState, useEffect } from "react";
import axios from "axios";

import { getConfig } from "../config";

function MachinePickUpAPI() {
  const { apiUrl } = getConfig();
  const [machinePickups, setMachinePickups] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getMachinePickups = async () => {
      const res = await axios.get(`${apiUrl}/pickup/list`);
      setMachinePickups(res.data);
    };

    getMachinePickups();
  }, [apiUrl, callback]);
  return {
    machinePickups: [machinePickups, setMachinePickups],
    callback: [callback, setCallback],
  };
}

export default MachinePickUpAPI;
