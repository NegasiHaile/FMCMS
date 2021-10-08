import { useState, useEffect } from "react";
import axios from "axios";
function PricingAPI() {
  const [pricings, setPricings] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getpricings = async () => {
      const res = await axios.get("/pricing/list");
      setPricings(res.data);
    };

    getpricings();
  }, [callback]);
  return {
    pricings: [pricings, setPricings],
    callback: [callback, setCallback],
  };
}

export default PricingAPI;
