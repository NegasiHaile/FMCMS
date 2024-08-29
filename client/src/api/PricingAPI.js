import { useState, useEffect } from "react";
import axios from "axios";
import { getConfig } from "../config";
function PricingAPI() {
  const { apiUrl } = getConfig();
  const [pricings, setPricings] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getpricings = async () => {
      const res = await axios.get(`${apiUrl}/pricing/list`);
      setPricings(res.data);
    };

    getpricings();
  }, [apiUrl, callback]);
  return {
    pricings: [pricings, setPricings],
    callback: [callback, setCallback],
  };
}

export default PricingAPI;
