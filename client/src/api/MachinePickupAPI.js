import { useState, useEffect } from "react";
import axios from "axios";
function MachinePickUpAPI() {
  const [machinePickups, setMachinePickups] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getMachinePickups = async () => {
      const res = await axios.get("/pickup/list");
      setMachinePickups(res.data);
    };

    getMachinePickups();
  }, [callback]);
  return {
    machinePickups: [machinePickups, setMachinePickups],
    callback: [callback, setCallback],
  };
}

export default MachinePickUpAPI;
