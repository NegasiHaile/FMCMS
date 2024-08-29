import { useState, useEffect } from "react";
import axios from "axios";
import { getConfig } from "../config";

function UserAPI(token) {
  const { apiUrl } = getConfig();
  const [isLogged, setIsLogged] = useState(false);
  const [User, setUser] = useState();

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get(`${apiUrl}/user/profile`, {
            headers: { Authorization: token },
          });

          setUser(res.data);
          setIsLogged(true);
        } catch (err) {
          alert(err.response.data.msg);
        }
      };

      getUser();
    }
  }, [token, apiUrl]);

  return {
    isLogged: [isLogged, setIsLogged],
    User: [User, setUser],
  };
}

export default UserAPI;
