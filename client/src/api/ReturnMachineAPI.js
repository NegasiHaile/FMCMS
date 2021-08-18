import { useState, useEffect } from "react";
import axios from "axios";
function ReturnMachineAPI() {
  const [returnMachines, setReturnMachines] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getMachines = async () => {
      const res = await axios.get("/machine/return_machines");
      setReturnMachines(res.data);
    };

    getMachines();
  }, [callback]);
  return {
    returnMachines: [returnMachines, setReturnMachines],
    callback: [callback, setCallback],
  };
}

export default ReturnMachineAPI;
