import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [User, setUser] = useState();

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        // try {
        const res = await axios.get("/user/profile", {
          headers: { Authorization: token },
        });

        setUser(res.data);
        setIsLogged(true);

        // } catch (error) {
        //   Swal.fire({
        //     position: "center",
        //     background: "#EBEDEF", // 2EB85C success // E55353 danger // 1E263C sidebar
        //     icon: "error",
        //     text: "Check your connection OR refresh your page!", //error.response.data.msg,
        //     confirmButtonColor: "#1E263C",
        //     showConfirmButton: false,
        //     // timer: 1500,
        //   });
        // }
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
