import React, { useContext, useState, useEffect } from "react";
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";
import {
  CButton,
  CCard,
  CCardBody,
  CImg,
  CRow,
  CCol,
  CLabel,
  CLink,
  CForm,
  CFormGroup,
  CSelect,
  CTooltip,
  CInput,
} from "@coreui/react";
function MachinePickUp({ salesDetail, pickupType }) {
  console.log(JSON.stringify(salesDetail));
  return (
    <div
      className="rounded "
      style={{ minWidth: "900px", border: "solid 10px #D8DBE0" }}
    >
      <CCard className="w-100">
        <CCardBody>
          <CRow>
            <CCol className="d-flex justify-content-center" lg="12">
              <CImg height="50px" src="/logo/fulllogo.png" />
            </CCol>
            <CCol className="col-12 mt-4  border-bottom">
              <h3 className="text-center text-muted bold">
                Machine {pickupType} Pickup Form
              </h3>
            </CCol>

            <CCol className="col-12 mt-4 d-flex justify-content-end">
              <p>
                <span className="">Date : </span>{" "}
                <span className="border-bottom"> {Date.now}</span>
                <br />
                <span className="">Branch :</span>{" "}
                <b className="border-bottom"> {salesDetail.branchName}</b>
              </p>
            </CCol>

            <CCol className="col-12 mt-4">
              <CRow>
                <CCol>
                  <h4 className="text-decoration-underline">Customer Detail</h4>
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
                  <h4 className="text-decoration-underline">Machine Detail</h4>
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
                      <h6>{salesDetail.machineMRC}</h6>
                    </CCol>
                  </CRow>
                  <CRow className="mb-2">
                    <CCol className="col-3">
                      <h6>SIM :</h6>
                    </CCol>
                    <CCol className="col-8 border-bottom">
                      <h6>{salesDetail.machineSIM}</h6>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCol>

            <CCol className="col-12 mt-4">
              <h4 className="text-center">
                {" "}
                Machine materials checkup during fiscalization
              </h4>
              <CRow className="mt-3">
                <CCol>
                  <CRow className="mb-2">
                    <CCol className="col-8">
                      <h6>Memory Key :</h6>
                    </CCol>
                    <CCol className="col-3 text-center border rounded">
                      YES
                      {/* <input
                        className="p-3"
                        type="checkbox"
                        checked={"checked"}
                        onChange={"handleChange"}
                      /> */}
                    </CCol>
                  </CRow>
                  <CRow className="mb-2">
                    <CCol className="col-8">
                      <h6>Drawer :</h6>
                    </CCol>
                    <CCol className="col-3 text-center border rounded">
                      YES
                    </CCol>
                  </CRow>
                  <CRow className="mb-2">
                    <CCol className="col-8">
                      <h6> Paper :</h6>
                    </CCol>
                    <CCol className="col-3 text-center border rounded">
                      YES
                    </CCol>
                  </CRow>
                  <CRow className="mb-2">
                    <CCol className="col-8">
                      <h6> Terminal :</h6>
                    </CCol>
                    <CCol className="col-3 text-center border rounded">
                      YES
                    </CCol>
                  </CRow>
                </CCol>
                <CCol>
                  <CRow className="mb-2">
                    <CCol className="col-8">
                      <h6>Terminal Adapter :</h6>
                    </CCol>
                    <CCol className="col-3 text-center border rounded">
                      YES
                    </CCol>
                  </CRow>
                  <CRow className="mb-2">
                    <CCol className="col-8">
                      <h6>Machine :</h6>
                    </CCol>
                    <CCol className="col-3 text-center border rounded">
                      YES
                    </CCol>
                  </CRow>
                  <CRow className="mb-2">
                    <CCol className="col-8">
                      <h6> S. Book Terminal :</h6>
                    </CCol>
                    <CCol className="col-3 text-center border rounded">
                      YES
                    </CCol>
                  </CRow>
                  <CRow className="mb-2">
                    <CCol className="col-8">
                      <h6> S. Book Machine :</h6>
                    </CCol>
                    <CCol className="col-3 text-center border rounded">
                      YES
                    </CCol>
                  </CRow>
                </CCol>
                <CCol>
                  <CRow className="mb-2">
                    <CCol className="col-8">
                      <h6> Paper Roller :</h6>
                    </CCol>
                    <CCol className="col-3 text-center border rounded">
                      YES
                    </CCol>
                  </CRow>
                  <CRow className="mb-2">
                    <CCol className="col-8">
                      <h6> Paper Cover :</h6>
                    </CCol>
                    <CCol className="col-3 text-center border rounded">
                      YES
                    </CCol>
                  </CRow>
                  <CRow className="mb-2">
                    <CCol className="col-8">
                      <h6> Machine Adapter :</h6>
                    </CCol>
                    <CCol className="col-3 text-center border rounded">
                      YES
                    </CCol>
                  </CRow>
                  <CRow className="mb-2">
                    <CCol className="col-8">
                      <h6> FD Form :</h6>
                    </CCol>
                    <CCol className="col-3 text-center border rounded">
                      YES
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCol>

            <CCol className="col-12 mt-4">
              <h4 className="text-decoration-underline">Pick up Summery</h4>
              <h6 className="border-bottom " style={{ lineHeight: "1.6" }}>
                The machine with <b> 1000949382773</b> serial number is assigned
                to the company <b> Edna Mall privated Limited Company</b> and
                fiscalized with MRC of <b> CLC10008768 </b>
                and SIM <b> 0987664321 </b> in{" "}
                <b>
                  {" "}
                  {salesDetail.branchName} for {pickupType}
                </b>{" "}
              </h6>{" "}
            </CCol>
            <CCol className="col-12 mt-4">
              <CRow className="mt-4 border rounded mx-1 py-4">
                <CCol>
                  <CRow className="mb-2">
                    <CCol className="col-3">
                      <h6>Campany :</h6>
                    </CCol>
                    <CCol className="col-8 border-bottom">
                      <h6>Edna Mall Private limited compony</h6>
                    </CCol>
                  </CRow>
                  <CRow className="mb-2">
                    <CCol className="col-3">
                      <h6>TIN :</h6>
                    </CCol>
                    <CCol className="col-8 border-bottom">
                      <h6>1000987664</h6>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">Company : </div>
                    <p className="border-bottom">
                      {" "}
                      dhfsa jhkjdsfj oieurqwn jsduff hjasdfore fjf kodas
                    </p>
                  </div>
                </CCol>
              </CRow>
              <CRow className="mt-4 border rounded mx-1 py-4">
                <CCol className="col-12">
                  <h5>Internal Use</h5>
                </CCol>
                <CCol>
                  <CRow className="mb-2">
                    <CCol className="col-4">
                      <h6>Technician :</h6>
                    </CCol>
                    <CCol className="col-7 border-bottom">
                      <h6>Negasi Haile</h6>
                    </CCol>
                  </CRow>
                  <CRow className="mb-2">
                    <CCol className="col-4">
                      <h6>Signature :</h6>
                    </CCol>
                    <CCol className="col-7 border-bottom">
                      <h6>----- </h6>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol>
                  <CRow className="mb-2">
                    <CCol className="col-4">
                      <h6>Fiscalization Date :</h6>
                    </CCol>
                    <CCol className="col-7 border-bottom">
                      <h6>Monday 12/20/2021</h6>
                    </CCol>
                  </CRow>
                </CCol>
                <CCol className="col-12 mt-3">
                  <CRow className="mb-2 col-6">
                    <CCol className="col-4">
                      <h6>Confirmed by :</h6>
                    </CCol>
                    <CCol className="col-7 border-bottom">
                      <h6>Negasi Haile</h6>
                    </CCol>
                  </CRow>
                  <CRow className="mb-2 col-6">
                    <CCol className="col-4">
                      <h6>Signature :</h6>
                    </CCol>
                    <CCol className="col-7 border-bottom">
                      <h6>----- </h6>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default MachinePickUp;
