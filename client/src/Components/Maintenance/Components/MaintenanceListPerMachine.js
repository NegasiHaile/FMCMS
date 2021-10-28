import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import BadRouting from "../../Utils/routing/BadRouting";
import Swal from "sweetalert2";
import {
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CLabel,
  CDataTable,
  CLink,
  CTooltip,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

function MaintenanceListPerMachine({ machineId }) {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [maintenances] = state.MachinePickUpAPI.machinePickups;
  const [maint_Per_Machine, setMaint_Per_Machine] = useState([]);
  const [callbackMachinePickup, setCallbackMachinePickup] =
    state.MachinePickUpAPI.callback;

  useEffect(() => {
    // if (maintenances.length > 0) {
    setMaint_Per_Machine(
      maintenances.filter(
        (maintenance) =>
          maintenance.machineId == machineId &&
          (maintenance.category === "annual" ||
            maintenance.category === "incident" ||
            maintenance.category === "information_change")
      )
    );
    // }
  }, [maintenances]);
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
  // console.log(JSON.stringify(machineId));
  const deletePickupDetail = async (itmeId) => {
    try {
      Swal.fire({
        title: "Delete?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3C4B64",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        try {
          if (result.isConfirmed) {
            const res = await axios.delete(`/pickup/delete/${itmeId}`);
            setCallbackMachinePickup(!callbackMachinePickup);
            sweetAlert("success", res.data.msg);
          }
        } catch (error) {
          sweetAlert("error", error.response.data.msg);
        }
      });
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };

  const formatingDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between">
        <CLabel> Maintenance history of this machine</CLabel>
        {user.userRole === "technician" && (
          <CButton size="sm" color="dark" to={`/pickup/machine/${machineId}`}>
            <CIcon name="cil-plus" /> Receive for maintenance!
          </CButton>
        )}
      </CCardHeader>
      <CCardBody className="table-responsive">
        {maint_Per_Machine.length > 0 ? (
          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Catagory</th>
                <th scope="col">Status</th>
                <th scope="col">Created At</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {maint_Per_Machine.map((maintenance, index) => (
                <tr key={maintenance._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{maintenance.category}</td>
                  <td>{maintenance.status}</td>
                  <td>{formatingDate(maintenance.createdAt)}</td>
                  <td className="d-flex justify-content-between">
                    {user.userRole === "technician" &&
                      (maintenance.status === "New" ||
                        maintenance.status === "unapproved" ||
                        maintenance.status === "rejected") && (
                        <>
                          <CLink
                            className="text-success"
                            to={`/pickup/edit/${maintenance.machineId}/${maintenance._id}`}
                          >
                            <CTooltip content={`Edit this pickup detail.`}>
                              <CIcon name="cil-pencil" />
                            </CTooltip>
                          </CLink>
                          <span className="text-muted">|</span>
                          <CLink
                            className="text-danger"
                            onClick={() => deletePickupDetail(maintenance._id)}
                          >
                            <CTooltip content={`Delete this operation!.`}>
                              <CIcon name="cil-trash" />
                            </CTooltip>
                          </CLink>
                          <span className="text-muted">|</span>
                        </>
                      )}

                    {
                      <>
                        <CLink
                          className="text-info"
                          to={`/pickup/detail/${maintenance._id}`}
                        >
                          <CTooltip content={`See detail of machine pickup!`}>
                            <CIcon name="cil-align-center" />
                          </CTooltip>
                        </CLink>
                      </>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <BadRouting text="This machine haven't any maintenance history yet!" />
        )}
      </CCardBody>
    </CCard>
  );
}

export default MaintenanceListPerMachine;
