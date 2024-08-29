import { useState, useEffect } from "react";
import axios from "axios";
import { getConfig } from "../config";
function MachineAPI() {
  const { apiUrl } = getConfig();
  const [machines, setMachines] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getMachines = async () => {
      const res = await axios.get(`${apiUrl}/machine/list`);
      setMachines(res.data);
    };

    getMachines();
  }, [apiUrl, callback]);
  return {
    machines: [machines, setMachines],
    callback: [callback, setCallback],
  };
}

export default MachineAPI;
