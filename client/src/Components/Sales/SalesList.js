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

function SalesList() {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [Sales] = state.SalesAPI.Sales;

  console.log("Inner " + JSON.stringify(Sales));
  const salesTableAttributes = [
    // "branchId",
    "tradeName",
    "machineSerialNumber",
    "machinePrice",
    "status",
    "createdAt",
  ];
  return (
    <>
      <CCard className=" shadow-sm">
        <CCardBody>
          <CDataTable
            size="sm"
            items={Sales}
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

export default SalesList;
