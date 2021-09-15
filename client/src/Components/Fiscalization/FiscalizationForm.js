import React, { useContext, useState, useEffect, useRef } from "react";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
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
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";
import { render } from "react-dom";
import { useReactToPrint } from "react-to-print";

class ComponentToPrint extends React.Component {
  render() {
    return (
      <div>
        <br />
        <CCard className="mt-5 w-100" style={{ minWidth: "900px" }}>
          <CCardBody>
            <CRow>
              <CCol className="d-flex justify-content-center" lg="12">
                <CImg height="60px" src="/logo/fulllogo.png" />
              </CCol>
              <CCol className="col-12 mt-4  border-bottom">
                <h2 className="text-center bold">Machine Fiscalization Form</h2>
              </CCol>

              <CCol className="col-12 mt-4 d-flex justify-content-end">
                <p>
                  <span className="">Date : </span>{" "}
                  <span className="border-bottom"> 12/06/2021</span>
                  <br />
                  <span className="">Branch :</span>{" "}
                  <b className="border-bottom"> Gerji-Branch</b>
                </p>
              </CCol>

              <CCol className="col-12 mt-4">
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
                        <h6>Edna Mall Private limited compony</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>Owner :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>Negasi Web Developer</h6>
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
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>VAT :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>3466466466</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>Tel :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>0987664321</h6>
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
                        <h6>GADBL</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>Model :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>GB100</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>SER No :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>0009876646</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>MRC :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>CLC0008766</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>SIM :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>0987664321</h6>
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
                  The machine with <b> 1000949382773</b> serial number is
                  assigned to the company{" "}
                  <b> Edna Mall privated Limited Company</b> and fiscalized with
                  MRC of <b> CLC10008768 </b>
                  and SIM <b> 0987664321 </b> in <b> Branch Name </b>{" "}
                </h6>{" "}
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
}

const FiscalizationForm = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <ComponentToPrint ref={componentRef} />
      <CButton size="sm" color="danger" onClick={handlePrint}>
        Print this out!
      </CButton>
    </div>
  );
};

export default FiscalizationForm;
