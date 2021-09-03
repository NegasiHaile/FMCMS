import { useState, useEffect } from "react";
import axios from "axios";
function MRCAPI() {
  const [mrcs, setMRCs] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getMRCs = async () => {
      const res = await axios.get("/mrc/list");
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
