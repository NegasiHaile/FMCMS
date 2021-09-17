import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import BadRouting from "../../Utils/routing/BadRouting";
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
import Swal from "sweetalert2";

function MaintenanceListPerMachine({ machineId }) {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [maintenances] = state.MaintenanceAPI.maintenances;
  const [maint_Per_Machine, setMaint_Per_Machine] = useState([]);

  useEffect(() => {
    if (maintenances.length > 0) {
      setMaint_Per_Machine(
        maintenances.filter((maintenance) => maintenance.machineID == machineId)
      );
    }
  }, [maintenances, machineId, setMaint_Per_Machine]);

  console.log(JSON.stringify(machineId));

  const MaintenanceFields = [
    "machineID",
    "catagory",
    "type",
    "maintenanceStatus",
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
          <CButton
            size="sm"
            color="dark"
            to={`/maintenance/pickup/${machineId}`}
          >
            <CIcon name="cil-plus" /> Pickup for mainenance
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
              Actions: (machine) => (
                <td className="d-flex justify-content-between">Hide</td>
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
