import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";

import { CButton, CCard, CDataTable } from "@coreui/react";

function BusinessMachines({ businessId }) {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [businesses] = state.BusinessAPI.businesses;
  const [allSales] = state.SalesAPI.Sales;
  const [allMachines] = state.MachineAPI.machines;

  const [salesPerBusiness, setSalesPerBusiness] = useState(null);

  useEffect(() => {
    if (allSales.length !== 0) {
      setSalesPerBusiness(
        allSales.filter(
          (filteredSales) => filteredSales.businessId === businessId
        )
      );
    } else {
      setSalesPerBusiness(null);
    }
  }, [businessId, allSales]);

  const salesTableAttributes = [
    "machineSerialNumber",
    "machinePrice",
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
    <div>
      {salesPerBusiness ? (
        <CDataTable
          size="sm"
          items={salesPerBusiness}
          fields={salesTableAttributes}
          hover
        />
      ) : (
        <h5 className="text-muted text-center">
          This business haven't a machine yet!
        </h5>
      )}
      {/* {sales.length !== 0 && (
        <>
          {sales.map((sale) => (
            <div key={sale.saleId}>
              {business.machine === "assigned" &&
                (user.userRole === "client" || user.userRole === "sales") && (
                  <CButton
                    variant="ghost"
                    color="danger"
                    size="sm"
                    className="w-100 mt-3"
                    to={`/business/return-machine/${sale.saleId}`}
                  >
                    Request to return this machine
                  </CButton>
                )}
              {business.machine === "returning" &&
                user.userRole === "branch-admin" && (
                  <CButton
                    variant="ghost"
                    color="success"
                    size="sm"
                    className="w-100 mt-3"
                  >
                    Confirm Return
                  </CButton>
                )}
            </div>
          ))}{" "}
        </>
      )} */}
    </div>
  );
}

export default BusinessMachines;
