import { useState, useEffect } from "react";
import axios from "axios";

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [User, setUser] = useState();

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
        const res = await axios.get("/user/profile", {
          headers: { Authorization: token },
        });

        setUser(res.data);
        setIsLogged(true);
      } catch (err) {
        alert(err.response.data.msg)
    }
      };

      getUser();
    }
  }, [token]);

  return {
    isLogged: [isLogged, setIsLogged],
    User: [User, setUser],
  };
}

export default UserAPI;
