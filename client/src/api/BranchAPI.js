import { useState, useEffect } from "react";
import axios from "axios";

import { getConfig } from "../config";

function BranchAPI() {
  const { apiUrl } = getConfig();
  const [branchs, setBranchs] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getBranchs = async () => {
      const res = await axios.get(`${apiUrl}/branch/list`);
      setBranchs(res.data);
    };

    getBranchs();
  }, [callback]);
  return {
    branchs: [branchs, setBranchs],
    callback: [callback, setCallback],
  };
}

export default BranchAPI;
