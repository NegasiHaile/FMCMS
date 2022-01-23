import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import { useParams } from "react-router-dom";
import FilterMRC from "../../Utils/Filters/FilterMRC";
import FilterSIMCard from "../../Utils/Filters/FilterSIMCard";
import {
  CButton,
  CCard,
  CCardBody,
  CImg,
  CRow,
  CCol,
  CSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";

import BadRouting from "../../Utils/routing/BadRouting";

function FiscalizationItem() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [Sales] = state.SalesAPI.Sales;
  const [callbackSales, setCallbackSales] = state.SalesAPI.callback;
  const [salesDetail, setSalesDetail] = useState("");
  const [allUsers] = state.UsersAPI.users;
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    if (Sales.length > 0) {
      const slsDtl = Sales.filter(
        (filteredSale) => filteredSale.saleId === params.id
      );
      setSalesDetail(slsDtl[0]);
    }
  }, [Sales, params.id]);
  useEffect(() => {
    if (!user.branch) {
      setTechnicians(
        allUsers.filter((fltrdUser) => fltrdUser.userRole === "technician")
      );
    } else {
      setTechnicians(
        allUsers.filter(
          (fltrdUser) =>
            fltrdUser.userRole === "technician" &&
            fltrdUser.branch === user.branch
        )
      );
    }
  }, [user, allUsers]);

  const formatingDate = (stringdate) => {
    return new Date(stringdate).toLocaleString();
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSalesDetail({ ...salesDetail, [name]: value });
    console.log(salesDetail);
  };
  const sweetAlert = (type, text) => {
    Swal.fire({
      position: "center",
      background: "#EBEDEF", // 2EB85C success // E55353 danger // 1E263C sidebar
      icon: type,
      text: text,
      confirmButtonColor: "#3C4B64",
      showConfirmButton: true,
      // timer: 1500,
    });
  };
  const editSalesTechnician = async (id) => {
    try {
      const res = await axios.put(`/sales/assign_technician/${id}`, {
        technician: salesDetail.technician,
      });
      setCallbackSales(!callbackSales);
      sweetAlert("success", res.data.msg);
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };

  return (
    <div style={{ minWidth: "900px", border: "solid 0px #D8DBE0" }}>
      {salesDetail ? (
        <CCard className="w-100 border-0">
          <CCardBody>
            <CRow className="mt-3 p-4">
              <CCol className="d-flex justify-content-center" lg="12">
                <CImg height="50px" src="/logo/fulllogo.png" />
              </CCol>
              <CCol className="col-12 mt-2  border-bottom">
                <h4 className="text-center text-muted bold">
                  {user.userRole === "customer-service" &&
                  (salesDetail.status === "delivery" ||
                    salesDetail.status === "completed")
                    ? "MACHINE DELIVERY NOTE"
                    : "Machine fiscalization detail"}
                </h4>
              </CCol>

              <CCol className="col-12 mt-4 d-flex justify-content-end">
                <p>
                  <span className="">Date : </span>{" "}
                  <span className="border-bottom">
                    {" "}
                    {new Date().toLocaleString()}
                  </span>
                  <br />
                  <span className="">Branch :</span>{" "}
                  <b className="border-bottom"> {salesDetail.branchName}</b>
                </p>
              </CCol>

              <CCol className="col-12 mt-2">
                <CRow>
                  <CCol>
                    <h4 className="text-decoration-underline">
                      Customer Detail
                    </h4>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>Campany :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>{salesDetail.tradeName}</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>Owner :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>{salesDetail.companyName}</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>TIN :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>{salesDetail.TIN}</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>VAT :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>{salesDetail.VAT}</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>Tel :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>{salesDetail.telephone}</h6>
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol>
                    <h4 className="text-decoration-underline">
                      Machine Detail
                    </h4>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6> Brand : </h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>{salesDetail.machineBrand}</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>Model :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>{salesDetail.machineModel}</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>SER No :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>{salesDetail.machineSerialNumber}</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>MRC :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>
                          {" "}
                          <FilterMRC
                            mrcId={salesDetail.machineMRC}
                            filterType="mrcNumber"
                          />
                        </h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>SIM :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>
                          {" "}
                          <FilterSIMCard
                            simId={salesDetail.machineSIM}
                            filterType="simNumber"
                          />
                        </h6>
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
              </CCol>

              <CCol className="col-12 mt-4">
                <h4 className="text-decoration-underline">
                  Fiscalization Summery
                </h4>
                <h6 className="border-bottom " style={{ lineHeight: "1.6" }}>
                  This machine with <b> {salesDetail.machineSerialNumber}</b>{" "}
                  serial number is assigned to the company{" "}
                  <b> {salesDetail.tradeName}</b> and fiscalized with the above
                  detail in <b> {salesDetail.branchName} </b> of jupiter
                  tradingeth on {new Date().toLocaleString()}
                </h6>{" "}
              </CCol>

              <CCol className="col-12 mt-4">
                <CRow className="mt-4 border rounded mx-1 py-4">
                  <CCol className="col-6 my-2">
                    <CRow className="mb-2">
                      <CCol className="col-5">
                        <h6>Fiscalization Status:</h6>
                      </CCol>
                      <CCol className="col-6 border-bottom">
                        <h6>{salesDetail.fiscalization}</h6>
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol className="col-6 my-2">
                    <CRow className="mb-2">
                      <CCol className="col-4">
                        <h6>Fiscalization Date :</h6>
                      </CCol>
                      <CCol className="col-7 border-bottom">
                        <h6>{formatingDate(salesDetail.createdAt)}</h6>
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol className="col-6 my-2">
                    <CRow className="mb-2">
                      <CCol className="col-4">
                        <h6>Assigned Technician :</h6>
                      </CCol>
                      <CCol className="col-8  input-group ">
                        {/* <div className="input-group mb-3"> */}
                        <CSelect
                          aria-label="Default select example"
                          id="technician"
                          name="technician"
                          onChange={handleInputChange}
                          value={salesDetail.technician}
                          disabled={
                            user.userRole === "customer-service" &&
                            salesDetail.status === "instore"
                              ? false
                              : true
                          }
                          style={
                            salesDetail.status === "instore"
                              ? {
                                  border: "0px",
                                  borderBottom: "solid 1px #D8DBE0",
                                  background: "white",
                                }
                              : {
                                  border: "0px",
                                  borderBottom: "solid 1px #D8DBE0",
                                  background: "white",
                                  color: "#3C4B64",
                                  appearance: "none",
                                }
                          }
                        >
                          <option value="">Technician unassigned ...</option>
                          {technicians.map((theUser) => (
                            <option value={theUser._id} key={theUser._id}>
                              {theUser.fName + " " + theUser.mName}
                            </option>
                          ))}
                        </CSelect>
                        {salesDetail.status === "instore" &&
                          user.userRole === "customer-service" && (
                            <div className="input-group-append">
                              <CButton
                                color="dark"
                                className="d-print-none input-group-text mb-2"
                                onClick={() =>
                                  editSalesTechnician(salesDetail.saleId)
                                }
                              >
                                Done!
                              </CButton>
                            </div>
                          )}
                        {/* </div> */}
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol className="col-6 my-2">
                    <CRow className="mb-2">
                      <CCol className="col-4">
                        {salesDetail.renewHistory && (
                          <h6>
                            {" "}
                            Annual service of{" "}
                            {Number(salesDetail.renewHistory.slice(-1)) + 1} :
                          </h6>
                        )}
                      </CCol>
                      <CCol className="col-7 border-bottom">
                        <h6>{formatingDate(salesDetail.nextRenewDate)}</h6>
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
              </CCol>

              {((user.userRole === "customer-service" &&
                salesDetail.fiscalization === "done") ||
                salesDetail.status === "completed") && (
                <CCol className="col-12 mt-4">
                  <CRow className=" border rounded mx-1 py-4">
                    <CCol className="col-12 border-bottom">
                      <h4>DELIVERY DETAIL</h4>
                    </CCol>
                    <CCol className="col-6 mt-3">
                      <CRow className="mb-2">
                        <CCol className="col-4">
                          <h6>Delivered By :</h6>
                        </CCol>
                        <CCol className="col-7 border-bottom">
                          <h6> </h6>
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-4">
                          <h6>Signature :</h6>
                        </CCol>
                        <CCol className="col-7 border-bottom">
                          <h6> </h6>
                        </CCol>
                      </CRow>
                    </CCol>
                    <CCol className="col-6 mt-5">
                      <CRow className="mb-2">
                        <CCol className="col-4">
                          <h6>Delivery Date :</h6>
                        </CCol>
                        <CCol className="col-7 border-bottom">
                          <h6> {new Date().toLocaleString()}</h6>
                        </CCol>
                      </CRow>
                    </CCol>
                    <CCol className="col-6 mt-4">
                      <CRow className="mb-2">
                        <CCol className="col-4">
                          <h6>Contact Person Name:</h6>
                        </CCol>
                        <CCol className="col-7 border-bottom">
                          <h6></h6>
                        </CCol>
                      </CRow>
                    </CCol>
                    <CCol className="col-6 mt-4">
                      <CRow className="mb-2">
                        <CCol className="col-4">
                          <h6>Contact Person Signature :</h6>
                        </CCol>
                        <CCol className="col-7 border-bottom">
                          <h6> </h6>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CRow>
                </CCol>
              )}
            </CRow>
          </CCardBody>
        </CCard>
      ) : (
        <BadRouting text="Bad routing, or fiscalization for this sales is not ready yet!" />
      )}
    </div>
  );
}

function FiscalizationOperations() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [Sales] = state.SalesAPI.Sales;
  const [salesDetail, setSalesDetail] = useState("");
  const [mrcs] = state.MRCAPI.mrcs;
  const [callbackMachines, setCallbackMachines] = state.MachineAPI.callback;
  const [callbackSales, setCallbackSales] = state.SalesAPI.callback;

  const sweetAlert = (type, text) => {
    Swal.fire({
      position: "center",
      background: "#EBEDEF", // 2EB85C success // E55353 danger // 1E263C sidebar
      icon: type,
      text: text,
      confirmButtonColor: "#3C4B64",
      showConfirmButton: true,
      // timer: 1500,
    });
  };

  useEffect(() => {
    if (Sales.length > 0) {
      const slsDtl = Sales.filter(
        (filteredSale) =>
          filteredSale.saleId === params.id &&
          filteredSale.fiscalization !== "none"
      );
      setSalesDetail(slsDtl[0]);
    }
  }, [Sales, setSalesDetail]);

  const onSubmitFiscalizationDone = async (saleId, machineId) => {
    Swal.fire({
      title: "",
      text: "Are you sure this fiscalization is completed and it's ready to pass to controller?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3C4B64",
      cancelButtonColor: "#d33",
      confirmButtonSize: "sm",
      confirmButtonText: "Yes, Completed!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.put(
            `/sales/fiscalization/${saleId}/${machineId}`
          );
          Swal.fire("Done!", res.data.msg, "success");
          setCallbackSales(!callbackSales);
          setCallbackMachines(!callbackMachines);
        } catch (error) {
          sweetAlert("error", error.response.data.msg);
        }
      }
    });
  };
  const onclickRequestForDelivery = async (saleId) => {
    
      Swal.fire({
        title: "",
        text: "Are you want to request this machine to customer service for delivery?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3C4B64",
        cancelButtonColor: "#d33",
        confirmButtonSize: "sm",
        confirmButtonText: "Yes, request it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
          const res = await axios.put(`/sales/request_for_delivery/${saleId}`);
          Swal.fire("Done!", res.data.msg, "success");
          setCallbackSales(!callbackSales);
        } catch (error) {
          sweetAlert("error", error.response.data.msg);
        }
        }
      });
    
  };
  const onclickComplateDelivery = async (saleId, machineId) => {

      Swal.fire({
        title: "",
        text: "Are you this machine sales is delivered to the client?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3C4B64",
        cancelButtonColor: "#d33",
        confirmButtonSize: "sm",
        confirmButtonText: "Yes, it's delivered!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await axios.put(
              `/sales/delivery_completing/${saleId}/${machineId}`
            );
            setCallbackSales(!callbackSales);
            setCallbackMachines(!callbackMachines);
            Swal.fire("Done!", res.data.msg, "success");
          } catch (error) {
            sweetAlert("error", error.response.data.msg);
          }
        }
      });
  };
  return (
    <>
      {salesDetail &&
      salesDetail.fiscalization === "ready" &&
      user._id == salesDetail.technician ? (
        <CButton
          className="mr-2"
          size="sm"
          color="success"
          onClick={() =>
            onSubmitFiscalizationDone(salesDetail.saleId, salesDetail.machineId)
          }
        >
          <CIcon name="cil-memory"></CIcon> Confirm fiscalization!
        </CButton>
      ) : (
        ""
      )}
      {salesDetail &&
        user.userRole === "machine-controller" &&
        salesDetail.fiscalization === "done" &&
        salesDetail.status === "controlling" && (
          <CButton
            className="mr-2"
            size="sm"
            color="warning"
            onClick={() =>
              onclickRequestForDelivery(
                salesDetail.saleId,
                salesDetail.machineId
              )
            }
          >
            <CIcon name="cil-memory"></CIcon> Request for delivery
          </CButton>
        )}
      {salesDetail &&
        user.userRole === "customer-service" &&
        salesDetail.fiscalization === "done" &&
        salesDetail.status === "delivering" && (
          <CButton
            className="mr-2"
            size="sm"
            color="danger"
            onClick={() =>
              onclickComplateDelivery(salesDetail.saleId, salesDetail.machineId)
            }
          >
            <CIcon name="cil-memory"></CIcon> Delivery completed?
          </CButton>
        )}
    </>
  );
}

export { FiscalizationItem, FiscalizationOperations };
