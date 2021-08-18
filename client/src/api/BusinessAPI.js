import { useState, useEffect } from "react";
import axios from "axios";
function BusinessAPI() {
  const [businesses, setBusinesses] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getBusinesses = async () => {
      const res = await axios.get("/business/list");
      setBusinesses(res.data);
    };

    getBusinesses();
  }, [callback]);
  return {
    businesses: [businesses, setBusinesses],
    callback: [callback, setCallback],
  };
}

export default BusinessAPI;
