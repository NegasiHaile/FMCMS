import { useState, useEffect } from "react";
import axios from "axios";
function BranchAPI() {
  const [branchs, setBranchs] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getBranchs = async () => {
      const res = await axios.get("/branch/list");
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
