import React, { Suspense, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import BadRouting from "../Utils/routing/BadRouting";
import axios from "axios";
import Swal from "sweetalert2";
// import { format } from "timeago.js";
import { CButton, CCard, CCardBody, CLink, CRow, CCol } from "@coreui/react";
import { getConfig } from "../../config";

function SalesDetail() {
  const params = useParams();
  const state = useContext(GlobalState);
  const { apiUrl } = getConfig();
  const [user] = state.UserAPI.User;
  const [Sales] = state.SalesAPI.Sales;
  const [salesDetail, setSalesDetail] = useState("");

  const [callbackMachines, setCallbackMachines] = state.MachineAPI.callback;
  const [callbackBusiness, setCallbackBusiness] = state.BusinessAPI.callback;
  const [callbackSales, setCallbackSales] = state.SalesAPI.callback;

  useEffect(() => {
    if (params.id && Sales) {
      const sale = Sales.find(
        (filteredSale) => filteredSale.saleId === params.id
      );
      setSalesDetail(sale);
    } else {
    }
  }, [params.id, Sales]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };
  const SweetAlert = (type, text) => {
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
  const approveSalesRequest = async (saleId, machineId, businessId) => {
    try {
      Swal.fire({
        // title: "Accepte?",
        text: "Are you sure you want to approve this sales transaction?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1E263C",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Approve it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.put(
            `${apiUrl}/sales/Approve_sales_Request/${saleId}/${machineId}/${businessId}`
          );
          setCallbackMachines(callbackMachines);
          setCallbackSales(!callbackSales);
          setCallbackBusiness(!callbackBusiness);

          SweetAlert("success", res.data.msg);
        }
      });
    } catch (error) {
      SweetAlert("error", error.response.data.msg);
    }
  };

  const requestForFiscalization = async (saleId, machineId) => {
    try {
      Swal.fire({
        // title: "Accepte?",
        text: "Are you sure you want to send this sales for fiscalization?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1E263C",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Request it!",
      }).then(async (result) => {
        try {
          if (result.isConfirmed) {
            const res = await axios.put(
              `${apiUrl}/sales/request_for_fiscalization/${saleId}/${machineId}`
            );
            setCallbackMachines(callbackMachines);
            setCallbackSales(!callbackSales);
            setCallbackBusiness(!callbackBusiness);
            Swal.fire("Requested!", res.data.msg, "success");
          }
        } catch (error) {
          SweetAlert("error", error.response.data.msg);
        }
      });
    } catch (error) {
      SweetAlert("error", error.response.data.msg);
    }
  };
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
      {salesDetail ? (
        <CCard className="card">
          <CCardBody className="card-body">
            <CRow>
              <CCol sm="6" md="4" lg="3" className="border shadow-sm p-4">
                <h6 className="text-center text-muted">Trade-Name</h6>
                <CLink to={`/business/Detail/${salesDetail.businessId}`}>
                  <h6 className="text-center text-primary">
                    {salesDetail.tradeName}
                  </h6>
                </CLink>
              </CCol>
              <CCol sm="6" md="4" lg="3" className="border shadow-sm p-4">
                <h6 className="text-center text-muted">
                  Machine serial number
                </h6>
                <CLink to={`/machine/indetail/${salesDetail.machineId}`}>
                  <h6 className="text-center text-primary">
                    {salesDetail.machineSerialNumber}
                  </h6>
                </CLink>
              </CCol>
              <CCol sm="6" md="4" lg="3" className="border shadow-sm p-4">
                <h6 className="text-center text-muted">Order Date</h6>
                <h6 className="text-center">
                  <span className=" text-info">
                    {formatDate(salesDetail.createdAt)}
                  </span>
                  <p>
                    <small>
                      1 month ago
                      {/* {format(salesDetail.createdAt)} */}
                    </small>
                  </p>
                </h6>
              </CCol>
              <CCol sm="6" md="4" lg="3" className="border shadow-sm p-4">
                <h6 className="text-center text-muted">
                  Sales status:
                  <span className="text-center text-danger">
                    {salesDetail.status}
                  </span>
                  <p>
                    <small>
                      3 monthes ago
                      {/* {format(salesDetail.updatedAt)} */}
                    </small>
                  </p>
                </h6>

                {salesDetail.status === "unapproved" &&
                  user.userRole === "operational-manager" && (
                    <div className="d-flex justify-content-center">
                      <CButton
                        className=""
                        variant="outline"
                        color="success"
                        size="sm"
                        onClick={() =>
                          approveSalesRequest(
                            salesDetail.saleId,
                            salesDetail.machineId,
                            salesDetail.businessId
                          )
                        }
                      >
                        Approve this sales
                      </CButton>
                    </div>
                  )}
                {salesDetail.status === "instore" &&
                  user.userRole === "branch-store" && (
                    <div className="d-flex justify-content-center">
                      <CButton
                        className=""
                        variant="outline"
                        color="success"
                        size="sm"
                        onClick={() =>
                          requestForFiscalization(
                            salesDetail.saleId,
                            salesDetail.machineId
                          )
                        }
                      >
                        Request for fiscalization
                      </CButton>
                    </div>
                  )}
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      ) : (
        <BadRouting text="Bad routing! Please go back to sales list page and click the see-detail button of you need to see it's detail." />
      )}
    </Suspense>
  );
}

export default SalesDetail;
