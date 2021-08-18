import { useState, useEffect } from "react";
import axios from "axios";
function NotificationAPI() {
  const [notifications, setNotifications] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getNotifications = async () => {
      const res = await axios.get("/notification/list");
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
