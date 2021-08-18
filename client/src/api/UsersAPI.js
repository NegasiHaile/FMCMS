import { useState, useEffect } from "react";
import axios from "axios";
function UsersAPI() {
  const [users, setUsers] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getUsersInType = async () => {
      const res = await axios.get("/user/list_inType");
      setUsers(res.data);
    };

    getUsersInType();
  }, [callback]);

  return {
    users: [users, setUsers],
    callback: [callback, setCallback],
  };
}

export default UsersAPI;
