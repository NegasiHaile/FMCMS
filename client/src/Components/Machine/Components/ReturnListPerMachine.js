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
  CLink,
  CTooltip,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
function ReturnListPerMachine({ machineId }) {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [pickupMachines] = state.MachinePickUpAPI.machinePickups;
  const [returns_Per_Machine, setReturns_Per_Machine] = useState([]);
  const [callbackMachinePickup, setCallbackMachinePickup] =
    state.MachinePickUpAPI.callback;

  useEffect(() => {
    if (pickupMachines.length > 0) {
      const value = pickupMachines.filter(
        (pickup) =>
          pickup.machineId == machineId &&
          (pickup.category === "withdrawal" ||
            pickup.category === "temporarly_store")
      );
      setReturns_Per_Machine(value);
    }
  }, [pickupMachines, machineId, setReturns_Per_Machine]);

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
    // <Swal />;
    // alert("go");
  };
  const formatingDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };
  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between">
        <CLabel>Returning history of this machine</CLabel>
        {user.userRole === "technician" && (
          <CButton size="sm" color="dark" to={`/pickup/machine/${machineId}`}>
            <CIcon name="cil-plus" /> Pickup this machine!
          </CButton>
        )}
      </CCardHeader>
      <CCardBody className="table-responsive">
        {returns_Per_Machine.length >= 1 ? (
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
              {returns_Per_Machine.map((rtrn, index) => (
                <tr key={rtrn._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{rtrn.category}</td>
                  <td>{rtrn.status}</td>
                  <td>{formatingDate(rtrn.createdAt)}</td>
                  <td className="d-flex justify-content-between">
                    {user.userRole === "technician" &&
                      (rtrn.status === "New" ||
                        rtrn.status === "unapproved" ||
                        rtrn.status === "rejected") && (
                        <>
                          <CLink
                            className="text-success"
                            to={`/pickup/edit/${rtrn.machineId}/${rtrn._id}`}
                          >
                            <CTooltip content={`Edit this pickup detail.`}>
                              <CIcon name="cil-pencil" />
                            </CTooltip>
                          </CLink>
                          <span className="text-muted">|</span>
                          <CLink
                            className="text-danger"
                            onClick={() => deletePickupDetail(rtrn._id)}
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
                          to={`/pickup/detail/${rtrn._id}`}
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
          <BadRouting text="This machine haven't any return history yet!" />
        )}
      </CCardBody>
    </CCard>
  );
}

export default ReturnListPerMachine;
