import React, { useContext } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";

import BadRouting from "../../Utils/routing/BadRouting";
import { CButton } from "@coreui/react";
import Swal from "sweetalert2";
import { getConfig } from "../../../config";

function NewArrivals({ newArrivals }) {
  const state = useContext(GlobalState);
  const { apiUrl } = getConfig();
  const [user] = state.UserAPI.User;
  const [callback, setCallback] = state.SIMCardAPI.callback;

  const sweetAlert = (type, text) => {
    Swal.fire({
      position: "center",
      background: "#EBEDEF", // 2EB85C success // E55353 danger // 1E263C sidebar
      icon: type,
      text: text,
      confirmButtonColor: "#3C4B64",
      showConfirmButton: true,
      // timer: 1500,
    });
  };

  const approveSIMCardFromBranchStore = (id, branchId) => {
    try {
      Swal.fire({
        text: "Are you sure you have received the SIM card(s)?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3C4B64",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, approve it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.put(
            `${apiUrl}/sim_card/approve_from_branch_store/${id}/${branchId}`
          );
          Swal.fire("Approved!", res.data.msg, "success");
          setCallback(!callback);
        }
      });
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };

  return (
    <div className="table-responsive">
      <div className="d-flex justify-content-end mr-5">
        {newArrivals.length > 1 && (
          <CButton
            variant="outline"
            size="sm"
            color="danger"
            onClick={() => approveSIMCardFromBranchStore("all", user.branch)}
          >
            Approve all
          </CButton>
        )}
      </div>
      {newArrivals.length > 0 ? (
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">SIM Number</th>
              <th scope="col">Status</th>
              <th scope="col">problem status</th>
              <th scope="col">Available IN</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {newArrivals.map((SIMCard, index) => (
              <tr key={SIMCard._id}>
                <th scope="row">{index + 1}</th>
                <td>{SIMCard.simNumber}</td>
                <td>{SIMCard.status}</td>
                <td>{SIMCard.problemStatus}</td>
                <td>{SIMCard.availableIn}</td>
                <td>
                  <CButton
                    variant="outline"
                    size="sm"
                    color="dark"
                    onClick={() => approveSIMCardFromBranchStore(SIMCard._id)}
                  >
                    Approve
                  </CButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <BadRouting text="No new arrivals!" />
      )}
    </div>
  );
}

export default NewArrivals;
