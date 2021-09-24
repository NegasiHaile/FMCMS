import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import { useParams } from "react-router-dom";
import { CButton, CCard, CCardBody, CImg, CRow, CCol } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";

import BadRouting from "../../Utils/routing/BadRouting";

function FiscalizationItem() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [Sales] = state.SalesAPI.Sales;
  const [salesDetail, setSalesDetail] = useState("");
  const [mrcs] = state.MRCAPI.mrcs;

  useEffect(() => {
    if (Sales.length > 0) {
      setSalesDetail(
        Sales.filter(
          (filteredSale) =>
            filteredSale.saleId === params.id &&
            (filteredSale.fiscalization !== "none" ||
              filteredSale.fiscalization !== "")
        )
      );
    }
  }, [Sales, setSalesDetail]);

  const formatingDate = (stringdate) => {
    return new Date(stringdate).toLocaleString();
  };
  const handleMRCNumberById = (mrcId) => {
    if (mrcId != "undefined" || mrcId != "none") {
      const mrcDetail = mrcs.filter((fltrdMRC) => fltrdMRC._id == mrcId);
      console.log(JSON.stringify(mrcDetail));
      if (mrcDetail.length === 1) return mrcDetail[0].MRC;
      return " ";
    }
  };
  return (
    <div style={{ minWidth: "900px", border: "solid 0px #D8DBE0" }}>
      {salesDetail.length > 0 ? (
        <CCard className="mt-5 w-100">
          <CCardBody>
            <CRow>
              <CCol className="d-flex justify-content-center" lg="12">
                <CImg height="50px" src="/logo/fulllogo.png" />
              </CCol>
              <CCol className="col-12 mt-2  border-bottom">
                <h4 className="text-center text-muted bold">
                  Machine fiscalization detail
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
                  <b className="border-bottom"> {salesDetail[0].branchName}</b>
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
                        <h6>{salesDetail[0].tradeName}</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>Owner :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>{salesDetail[0].companyName}</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>TIN :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>{salesDetail[0].TIN}</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>VAT :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>{salesDetail[0].VAT}</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>Tel :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>{salesDetail[0].telephone}</h6>
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
                        <h6>{salesDetail[0].machineBrand}</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>Model :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>{salesDetail[0].machineModel}</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>SER No :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>{salesDetail[0].machineSerialNumber}</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>MRC :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>
                          {handleMRCNumberById(salesDetail[0].machineMRC)}
                        </h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>SIM :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>{salesDetail[0].machineSIM}</h6>
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
                  This machine with <b> {salesDetail[0].machineSerialNumber}</b>{" "}
                  serial number is assigned to the company{" "}
                  <b> {salesDetail[0].tradeName}</b> and fiscalized with above
                  detail in <b> {salesDetail[0].branchName} </b> on{" "}
                  {new Date().toLocaleString()}
                </h6>{" "}
              </CCol>

              <CCol className="col-12 mt-4">
                <CRow className="mt-4 border rounded mx-1 py-4">
                  <CCol>
                    <CRow className="mb-2">
                      <CCol className="col-4">
                        <h6>Fiscalization Status:</h6>
                      </CCol>
                      <CCol className="col-7 border-bottom">
                        <h6>{salesDetail[0].fiscalization}</h6>
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol>
                    <CRow className="mb-2">
                      <CCol className="col-4">
                        <h6>Fiscalized By :</h6>
                      </CCol>
                      <CCol className="col-7 border-bottom">
                        <h6>{user.fName + " " + user.mName}</h6>
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
              </CCol>
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
      setSalesDetail(
        Sales.filter(
          (filteredSale) =>
            filteredSale.saleId === params.id &&
            filteredSale.fiscalization === "ready"
        )
      );
    }
  }, [Sales, setSalesDetail]);

  const onSubmitFiscalizationDone = async (saleId, machineId) => {
    try {
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
          const res = await axios.put(
            `/sales/fiscalization/${saleId}/${machineId}`
          );
          Swal.fire("Done!", res.data.msg, "success");
          setCallbackSales(!callbackSales);
          setCallbackMachines(!callbackMachines);
        }
      });
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };
  return (
    <>
      {user.userRole === "technician" && salesDetail.length > 0 && (
        <CButton
          className="mr-2"
          size="sm"
          color="dark"
          onClick={() =>
            onSubmitFiscalizationDone(
              salesDetail[0].saleId,
              salesDetail[0].machineId
            )
          }
        >
          <CIcon name="cil-memory"></CIcon> Confirm fiscalization!
        </CButton>
      )}
    </>
  );
}

export { FiscalizationItem, FiscalizationOperations };
