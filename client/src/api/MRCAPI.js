import { useState, useEffect } from "react";
import axios from "axios";
import { getConfig } from "../config";
function MRCAPI() {
  const { apiUrl } = getConfig();
  const [mrcs, setMRCs] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getMRCs = async () => {
      const res = await axios.get(`${apiUrl}/mrc/list`);
      setMRCs(res.data);
    };

    getMRCs();
  }, [callback]);
  return {
    mrcs: [mrcs, setMRCs],
    callback: [callback, setCallback],
  };
}

export default MRCAPI;
