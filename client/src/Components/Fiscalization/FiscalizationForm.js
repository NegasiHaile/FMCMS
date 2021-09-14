import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import {
  CButton,
  CCard,
  CCardBody,
  CImg,
  CRow,
  CCol,
  CLink,
  CForm,
  CFormGroup,
  CSelect,
  CTooltip,
  CInput,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";
function FiscalizationForm() {
  return (
    <CCard>
      <CCardBody>
        <CRow>
          <CCol className="d-flex justify-content-center" lg="12">
            <CImg height="40px" src="/logo/fulllogo.png" />
          </CCol>
          <CCol lg="12" className="mt-2  border-bottom">
            <h4 className="text-center bold">Machine Fiscalization Form</h4>
          </CCol>
          <CCol lg="12" className="d-flex justify-content-end">
            <p>
              <span className="">Date : </span>{" "}
              <span className="border-bottom"> 12/05/2021</span>
              <br />
              <span className="">Branch :</span>{" "}
              <b className="border-bottom"> Gerji-Branch</b>
            </p>
          </CCol>
          <CCol lg="12">
            <CRow>
              <CCol>
                <h6 className="text-decoration-underline">
                  <b> Customer Detail</b>
                </h6>
                <CRow className="mb-1">
                  <CCol sm="3" lg="3">
                    Campany :
                  </CCol>
                  <CCol sm="9" lg="9" className="border-bottom">
                    Edna Mall Private limited compony
                  </CCol>
                </CRow>
                <CRow className="mb-1">
                  <CCol sm="3" lg="3">
                    Owner :
                  </CCol>
                  <CCol sm="9" lg="9" className="border-bottom">
                    Negasi Web Developer
                  </CCol>
                </CRow>
                <CRow className="mb-1">
                  <CCol sm="2" lg="3">
                    TIN :
                  </CCol>
                  <CCol sm="9" lg="9" className="border-bottom">
                    1000987654
                  </CCol>
                </CRow>
                <CRow className="mb-1">
                  <CCol sm="2" lg="3">
                    VAT :
                  </CCol>
                  <CCol sm="9" lg="9" className="border-bottom">
                    3456456456
                  </CCol>
                </CRow>
                <CRow className="mb-1">
                  <CCol sm="2" lg="3">
                    Tel :
                  </CCol>
                  <CCol sm="9" lg="9" className="border-bottom">
                    0987654321
                  </CCol>
                </CRow>
              </CCol>
              <CCol>
                <h6 className="text-decoration-underline">
                  <b> Machine Detail</b>
                </h6>
                <CRow className="mb-1">
                  <CCol sm="3" lg="3">
                    Brand :
                  </CCol>
                  <CCol sm="9" lg="9" className="border-bottom">
                    GADBL
                  </CCol>
                </CRow>
                <CRow className="mb-1">
                  <CCol sm="3" lg="3">
                    Model :
                  </CCol>
                  <CCol sm="9" lg="9" className="border-bottom">
                    GB100
                  </CCol>
                </CRow>
                <CRow className="mb-1">
                  <CCol sm="2" lg="3">
                    SER No :
                  </CCol>
                  <CCol sm="9" lg="9" className="border-bottom">
                    0009876546
                  </CCol>
                </CRow>
                <CRow className="mb-1">
                  <CCol sm="2" lg="3">
                    MRC :
                  </CCol>
                  <CCol sm="9" lg="9" className="border-bottom">
                    CLC0008765
                  </CCol>
                </CRow>
                <CRow className="mb-1">
                  <CCol sm="2" lg="3">
                    SIM :
                  </CCol>
                  <CCol sm="9" lg="9" className="border-bottom">
                    0987654321
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </CCol>
          <CCol lg="12" className="mt-2">
            <CRow>
              <CCol>
                <h6 className="text-decoration-underline">
                  <b> Fiscalization Summery</b>
                </h6>
                <p className="border-bottom">
                  The machine with <b> 1000949382773</b> serial number is
                  assigned to the company{" "}
                  <b> Edna Mall privated Limited Company</b> and fiscalized with
                  MRC of <b> CLC10008768 </b>
                  and SIM <b> 0987654321 </b> in <b> Branch Name </b>{" "}
                </p>{" "}
              </CCol>
            </CRow>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
}

export default FiscalizationForm;
