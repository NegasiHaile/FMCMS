import { useState, useEffect } from "react";
import axios from "axios";

import { getConfig } from "../config";

function BusinessAPI() {
  const { apiUrl } = getConfig();
  const [businesses, setBusinesses] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getBusinesses = async () => {
      const res = await axios.get(`${apiUrl}/business/list`);
      setBusinesses(res.data);
    };

    getBusinesses();
  }, [apiUrl, callback]);
  return {
    businesses: [businesses, setBusinesses],
    callback: [callback, setCallback],
  };
}

export default BusinessAPI;
