import React, { useContext } from "react";

import { GlobalState } from "../../GlobalState";
import { CCard, CCardBody, CDataTable } from "@coreui/react";

function MachineReturningLists() {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [allreturning] = state.ReturnMachineAPI.returnMachines;
  const salesTableAttributes = [
    // "branchId",
    "id",
    "returnReason",
    "status",
  ];
  return (
    <>
      <CCard className=" shadow-sm">
        <CCardBody>
          <CDataTable
            size="sm"
            items={allreturning}
            fields={salesTableAttributes}
            tableFilter
            // columnFilter
            itemsPerPageSelect
            itemsPerPage={10}
            hover
            footer
            cleaner
            sorter
            pagination
            scopedSlots={{}}
          />
        </CCardBody>
      </CCard>
    </>
  );
}

export default MachineReturningLists;
