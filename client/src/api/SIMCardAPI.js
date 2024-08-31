import { useState, useEffect } from "react";
import axios from "axios";
import { getConfig } from "../config";
function SIMCardAPI() {
  const { apiUrl } = getConfig();
  const [simCards, setSIMCards] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getSIMCards = async () => {
      const res = await axios.get(`${apiUrl}/sim_card/list`);
      setSIMCards(res.data);
    };

    getSIMCards();
  }, [apiUrl, callback]);
  return {
    simCards: [simCards, setSIMCards],
    callback: [callback, setCallback],
  };
}

export default SIMCardAPI;
