import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
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
function ReturningList() {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [pickupMachines] = state.MachinePickUpAPI.machinePickups;
  const [returns, setReturns] = useState([]);

  useEffect(() => {
    if (pickupMachines.length > 0) {
      if (user.userRole === "super-admin" || user.userRole === "main-store") {
        setReturns(
          pickupMachines.filter(
            (filteredPickUp) =>
              filteredPickUp.category === "withdrawal" ||
              filteredPickUp.category === "temporarly_store"
          )
        );
      } else {
        setReturns(
          pickupMachines.filter(
            (filteredPickUp) =>
              (filteredPickUp.category === "withdrawal" ||
                filteredPickUp.category === "temporarly_store") &&
              filteredPickUp.branchId === user.branch
          )
        );
      }
    }
  }, [user, pickupMachines, setReturns]);
  return (
    <>
      <CCard className=" shadow-sm">
        <CCardBody>
          <CDataTable
            size="sm"
            items={returns}
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
                        content={`See detail of this ${pickup.category}.`}
                      >
                        <CIcon name="cil-arrow-right" />
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

export default ReturningList;
