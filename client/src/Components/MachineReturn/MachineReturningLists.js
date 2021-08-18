import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { GlobalState } from "../../GlobalState";
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

function MachineReturningLists() {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [allreturning] = state.ReturnMachineAPI.returnMachines;
  console.log(allreturning);
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
