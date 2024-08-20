import { useState, useEffect } from "react";
import axios from "axios";
import { getConfig } from "../config";
function NotificationAPI() {
  const { apiUrl } = getConfig();
  const [notifications, setNotifications] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getNotifications = async () => {
      const res = await axios.get(`${apiUrl}/notification/list`);
      setNotifications(res.data);
    };

    getNotifications();
  }, [callback]);
  return {
    notifications: [notifications, setNotifications],
    callback: [callback, setCallback],
  };
}

export default NotificationAPI;
