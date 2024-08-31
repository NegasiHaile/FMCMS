import { useState, useEffect } from "react";
import axios from "axios";
import { getConfig } from "../config";
function UsersAPI() {
  const { apiUrl } = getConfig();
  const [users, setUsers] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getUsersInType = async () => {
      const res = await axios.get(`${apiUrl}/user/list_inType`);
      setUsers(res.data);
    };

    getUsersInType();
  }, [apiUrl, callback]);

  return {
    users: [users, setUsers],
    callback: [callback, setCallback],
  };
}

export default UsersAPI;
