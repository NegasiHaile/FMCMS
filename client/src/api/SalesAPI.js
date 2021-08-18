import { useState, useEffect } from "react";
import axios from "axios";
function SalesAPI() {
  const [Sales, setSales] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getSales = async () => {
      const res = await axios.get("/sales/list");
      setSales(res.data);
    };

    getSales();
  }, [callback]);
  return {
    Sales: [Sales, setSales],
    callback: [callback, setCallback],
  };
}

export default SalesAPI;
