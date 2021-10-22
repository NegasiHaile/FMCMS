import { useState, useEffect } from "react";
import axios from "axios";
function SIMCardAPI() {
  const [simCards, setSIMCards] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getSIMCards = async () => {
      const res = await axios.get("/sim_card/list");
      setSIMCards(res.data);
    };

    getSIMCards();
  }, [callback]);
  return {
    simCards: [simCards, setSIMCards],
    callback: [callback, setCallback],
  };
}

export default SIMCardAPI;
