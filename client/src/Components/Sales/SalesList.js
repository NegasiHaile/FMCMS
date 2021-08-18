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
  const [allSales] = state.SalesAPI.Sales;
  console.log(allSales);
  const salesTableAttributes = [
    // "branchId",
    "tradeName",
    "machineSerialNumber",
    "machinePrice",
    "status",
  ];
  return (
    <>
      <CCard className=" shadow-sm">
        <CCardBody>
          <CDataTable
            size="sm"
            items={allSales}
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
