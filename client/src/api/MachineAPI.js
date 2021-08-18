import { useState, useEffect } from "react";
import axios from "axios";
function MachineAPI() {
  const [machines, setMachines] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getMachines = async () => {
      const res = await axios.get("/machine/list");
      setMachines(res.data);
    };

    getMachines();
  }, [callback]);
  return {
    machines: [machines, setMachines],
    callback: [callback, setCallback],
  };
}

export default MachineAPI;
