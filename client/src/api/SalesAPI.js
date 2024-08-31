import { useState, useEffect } from "react";
import axios from "axios";
import { getConfig } from "../config";
function SalesAPI() {
  const { apiUrl } = getConfig();
  const [Sales, setSales] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getSales = async () => {
      const res = await axios.get(`${apiUrl}/sales/list`);
      setSales(res.data);
    };

    getSales();
  }, [apiUrl, callback]);
  return {
    Sales: [Sales, setSales],
    callback: [callback, setCallback],
  };
}

export default SalesAPI;
