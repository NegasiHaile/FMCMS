import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../GlobalState";
import { CCard, CCardBody, CDataTable, CLink, CTooltip } from "@coreui/react";
import CIcon from "@coreui/icons-react";

const machinePickupsFields = [
  "tradeName",
  "serialNumber",
  "machineModel",
  "category",
  "createdAt",
  "branchName",
  "status",
  {
    key: "Actions",
    label: "Actions",
    // _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
];
function MaintenanceList() {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [pickupMachines] = state.MachinePickUpAPI.machinePickups;
  const [maintenances, setMaintenances] = useState([]);
  const [callbackMachinePickup, setCallbackMachinePickup] =
    state.MachinePickUpAPI.callback;

  useEffect(() => {
    if (pickupMachines.length > 0) {
      if (user.userRole === "super-admin" || user.userRole === "main-store") {
        setMaintenances(
          pickupMachines.filter(
            (filteredPickUp) =>
              filteredPickUp.category === "annual" ||
              filteredPickUp.category === "incident" ||
              filteredPickUp.category === "information_change"
          )
        );
      } else {
        setMaintenances(
          pickupMachines.filter(
            (filteredPickUp) =>
              (filteredPickUp.category === "annual" ||
                filteredPickUp.category === "incident" ||
                filteredPickUp.category === "information_change") &&
              filteredPickUp.branchId === user.branch
          )
        );
      }
    }
  }, [user, pickupMachines, setMaintenances]);
  return (
    <>
      <CCard className=" shadow-sm">
        <CCardBody>
          <CDataTable
            size="sm"
            items={maintenances}
            fields={machinePickupsFields}
            tableFilter
            columnFilter
            itemsPerPageSelect
            itemsPerPage={10}
            hover
            cleaner
            sorter
            pagination
            scopedSlots={{
              Actions: (pickup) => (
                <td className="d-flex justify-content-between">
                  <>
                    <CLink
                      className="text-info"
                      to={`/pickup/detail/${pickup._id}`}
                    >
                      <CTooltip
                        content={`See detail of this ${pickup.category} maintenance.`}
                      >
                        <CIcon name="cil-align-center" />
                      </CTooltip>
                    </CLink>
                  </>
                </td>
              ),
            }}
          />
        </CCardBody>
      </CCard>
    </>
  );
}

export default MaintenanceList;
