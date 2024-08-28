import React, { useContext, useState, useEffect, Suspense } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { GlobalState } from "../../GlobalState";
import { CCard, CCardBody, CDataTable, CLink, CTooltip } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { getConfig } from "../../config";

function SalesList() {
  const state = useContext(GlobalState);
  const { apiUrl } = getConfig();
  const [user] = state.UserAPI.User;
  const [Sales] = state.SalesAPI.Sales;
  const [salesToDisplay, setSalesToDisplay] = useState([]);

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
  useEffect(() => {
    if (Sales.length > 0) {
      if (user.userRole !== "super-admin" && user.userRole !== "main-store") {
        setSalesToDisplay(
          Sales.filter((filteredSale) => filteredSale.branchId == user.branch)
        );
      } else {
        setSalesToDisplay(Sales);
      }
    }
  }, [user, Sales]);
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
          const res = await axios.put(
            `${apiUrl}/sales/cancel_unapprove_sale/${saleId}`
          );
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
    "status",
    {
      key: "Actions",
      label: "Actions",
      // _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];
  return (
    <Suspense
      fallback={
        <div className="d-flex justify-content-center">
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
      }
    >
      <CCard className=" shadow-sm">
        <CCardBody>
          <CDataTable
            size="sm"
            items={salesToDisplay}
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
                          (sales.status === "rejected" && (
                            <CLink
                              className="text-danger"
                              onClick={() =>
                                cancelUnapprovedSales(sales.saleId)
                              }
                            >
                              <CTooltip content={`Cancel this sales.`}>
                                <CIcon name="cil-trash" />
                              </CTooltip>
                            </CLink>
                          ))}
                      </>
                    )}

                    {user.userRole === "technician" && (
                      <>
                        {" "}
                        {sales.status === "completed" ? (
                          <CLink
                            className="text-danger"
                            to={`/machine/returning_pickup/${sales.machineId}`}
                          >
                            <CTooltip
                              content={`Withdraw machine of this sales.`}
                            >
                              <CIcon name="cil-recycle" />
                            </CTooltip>
                          </CLink>
                        ) : (
                          <span className="text-dark">
                            <CTooltip
                              content={`Sales is ${sales.status}, you can't withdraw this.`}
                            >
                              <small> ???</small>
                            </CTooltip>
                          </span>
                        )}
                      </>
                    )}

                    <CLink
                      className="text-info"
                      to={`/sales/detail/${sales.saleId}`}
                    >
                      <CTooltip content={`See detail of this sales.`}>
                        <CIcon name="cil-arrow-right" />
                      </CTooltip>
                    </CLink>
                  </td>
                </>
              ),
            }}
          />
        </CCardBody>
      </CCard>
    </Suspense>
  );
}

export default SalesList;
