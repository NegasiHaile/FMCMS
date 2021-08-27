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

  const [callbackMachines, setCallbackMachines] = state.MachineAPI.callback;
  const [callbackBusiness, setCallbackBusiness] = state.BusinessAPI.callback;
  const [callbackSales, setCallbackSales] = state.SalesAPI.callback;

  const sweetAlert = (type, text) => {
    Swal.fire({
      position: "center",
      background: "#EBEDEF", // 2EB85C success // E55353 danger // 1E263C sidebar
      icon: type,
      text: text,
      confirmButtonColor: "#1E263C",
      showConfirmButton: false,
      // timer: 1500,
    });
  };

  const cancelUnapprovedSales = async (saleId) => {
    try {
      Swal.fire({
        title: "Cancel?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1E263C",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.put(`/sales/cancel_unapprove_sale/${saleId}`);
          setCallbackSales(!callbackSales);
          setCallbackMachines(!callbackMachines);
          setCallbackBusiness(!callbackBusiness);
          sweetAlert("success", res.data.msg);
        }
      });
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };

  const salesTableAttributes = [
    // "branchId",
    "tradeName",
    "machineSerialNumber",
    "machinePrice",
    "createdAt",
    "status",
    {
      key: "Actions",
      label: "Actions",
      // _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];
  // const formatter = new Intl.DateTimeFormat("en-GB", {
  //   year: "numeric",
  //   month: "long",
  //   day: "2-digit",
  // });
  // {
  //   formatter.format(Date.parse(dateString));
  // }
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
            scopedSlots={{
              Actions: (sales) => (
                <>
                  <td className="d-flex justify-content-between">
                    {(user.userRole === "sales" ||
                      user.userRole === "client") && (
                      <>
                        {sales.status === "New" ||
                        sales.status === "unapproved" ||
                        sales.status === "rejected" ? (
                          <CLink
                            className="text-danger"
                            onClick={() => cancelUnapprovedSales(sales.saleId)}
                          >
                            <CTooltip content={`Cancel this sales.`}>
                              <CIcon name="cil-trash" />
                            </CTooltip>
                          </CLink>
                        ) : (
                          <CLink
                            className="text-success"
                            to={`/business/Detail/`}
                          >
                            <CTooltip
                              content={`Make requet of canceling this sales.`}
                            >
                              <CIcon name="cil-recycle" />
                            </CTooltip>
                          </CLink>
                        )}
                      </>
                    )}

                    <CLink
                      className="text-info"
                      to={`/sales/detail/${sales._id}`}
                    >
                      <CTooltip content={`See detail of this sales.`}>
                        <CIcon name="cil-notes" />
                      </CTooltip>
                    </CLink>
                  </td>
                </>
              ),
            }}
          />
        </CCardBody>
      </CCard>
    </>
  );
}

export default SalesList;
