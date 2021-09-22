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
    if (maintenances.length > 0) {
      setMaint_Per_Machine(
        maintenances.filter(
          (maintenance) =>
            maintenance.machineId == machineId &&
            (maintenance.category === "annual" ||
              maintenance.category === "incident")
        )
      );
    }
  }, [maintenances, machineId, setMaint_Per_Machine]);
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
    // <Swal />;
    // alert("go");
  };
  const MaintenanceFields = [
    "category",
    "status",
    "createdAt",
    {
      key: "Actions",
      label: "Actions",
      // _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];
  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between">
        <CLabel> All maintenances done to this machine</CLabel>
        {user.userRole === "technician" && (
          <CButton size="sm" color="dark" to={`/pickup/machine/${machineId}`}>
            <CIcon name="cil-plus" /> Pickup this machine!
          </CButton>
        )}
      </CCardHeader>
      <CCardBody>
        {maint_Per_Machine.length > 0 ? (
          <CDataTable
            size="sm"
            items={maint_Per_Machine}
            fields={MaintenanceFields}
            tableFilter
            hover
            cleaner
            pagination
            scopedSlots={{
              Actions: (pickup) => (
                <td className="d-flex justify-content-between">
                  {user.userRole === "technician" && (
                    <>
                      <CLink
                        className="text-success"
                        to={`/pickup/edit/${pickup.machineId}/${pickup._id}`}
                      >
                        <CTooltip content={`Edit this pickup detail.`}>
                          <CIcon name="cil-pencil" />
                        </CTooltip>
                      </CLink>
                      <span className="text-muted">|</span>
                      <CLink
                        className="text-danger"
                        onClick={() => deletePickupDetail(pickup._id)}
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
                        to={`/pickup/detail/${pickup._id}`}
                      >
                        <CTooltip
                          content={`See detail of machine machine pickup!`}
                        >
                          <CIcon name="cil-align-center" />
                        </CTooltip>
                      </CLink>
                    </>
                  }
                </td>
              ),
            }}
          />
        ) : (
          <BadRouting text="The isn't a maintenance done to this machine yet!" />
        )}
      </CCardBody>
    </CCard>
  );
}

export default MaintenanceListPerMachine;
