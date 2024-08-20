import React, { useContext } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";

import BadRouting from "../../Utils/routing/BadRouting";
import { CButton } from "@coreui/react";
import Swal from "sweetalert2";
import { getConfig } from "../../../config";

function NewArivals({ newArivals }) {
  const state = useContext(GlobalState);
  const { apiUrl } = getConfig();
  const [user] = state.UserAPI.User;
  const [callbackMachines, setCallbackMachines] = state.MachineAPI.callback;

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

  const approveMachineFromBranchStore = (id, branchId) => {
    try {
      Swal.fire({
        text: "Are you sure you have received the machine(s)?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3C4B64",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, approve it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.put(
            `${apiUrl}/machine/approve_machine_from_branch_store/${id}/${branchId}`
          );
          Swal.fire("Approved!", res.data.msg, "success");

          setCallbackMachines(!callbackMachines);
        }
      });
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };

  return (
    <div className="table-responsive">
      <div className="d-flex justify-content-end mr-5">
        {newArivals.length > 0 && (
          <CButton
            variant="outline"
            size="sm"
            color="danger"
            onClick={() => approveMachineFromBranchStore("all", user.branch)}
          >
            Approve all in one
          </CButton>
        )}
      </div>
      {newArivals.length > 0 ? (
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Serial Number</th>
              <th scope="col">Brand</th>
              <th scope="col">Model</th>
              <th scope="col">Price</th>
              <th scope="col">Available IN</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {newArivals.map((machine, index) => (
              <tr key={machine._id}>
                <th scope="row">{index + 1}</th>
                <td>{machine.serialNumber}</td>
                <td>{machine.brand}</td>
                <td>{machine.machineModel}</td>
                <td>{machine.price}</td>
                <td>{machine.availableIn}</td>
                <td>
                  <CButton
                    variant="outline"
                    size="sm"
                    color="dark"
                    onClick={() => approveMachineFromBranchStore(machine._id)}
                  >
                    Approve this
                  </CButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <BadRouting text="No new arivals!" />
      )}
    </div>
  );
}

export default NewArivals;
