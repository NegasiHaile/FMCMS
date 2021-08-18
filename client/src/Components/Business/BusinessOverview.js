import React from "react";
import {
  CForm,
  CRow,
  CFormGroup,
  CLabel,
  CButton,
  CCol,
  CCard,
  CCardBody,
  CTabs,
  CCardHeader,
  CImg,
} from "@coreui/react";

function BusinessOverview(props) {
  const business = props;
  return (
    <>
      <CRow>
        <CCol sm="12" md="6" lg="4">
          <span className="d-flex justify-content-between">
            <span>Business Name: </span>
            <span>{business.businessName}</span>
          </span>
          <span className="d-flex justify-content-between">
            <span>Campany Name: </span>
            <span>{business.companyName}</span>
          </span>
          <span className="d-flex justify-content-between">
            <span>Business TIN: </span>
            <span>{business.TIN}</span>
          </span>
          <span className="d-flex justify-content-between">
            <span>Business VAT: </span>
            <span>{business.VAT}</span>
          </span>
        </CCol>
        <CCol sm="12" md="6" lg="4">
          <span className="d-flex justify-content-between">
            <span>Location City: </span>
            <span>{business.city}</span>
          </span>
          <span className="d-flex justify-content-between">
            <span>Sub City: </span>
            <span>{business.SubCity}</span>
          </span>
          <span className="d-flex justify-content-between">
            <span>Kebele: </span>
            <span>{business.kebele}</span>
          </span>

          <span className="d-flex justify-content-between">
            <span>Woreda: </span>
            <span>{business.woreda}</span>
          </span>
          <span className="d-flex justify-content-between">
            <span>Building Name: </span>
            <span>{business.buildingName}</span>
          </span>
          <span className="d-flex justify-content-between">
            <span>Office Number: </span>
            <span>{business.officeNumber}</span>
          </span>
        </CCol>
        <CCol sm="12" md="6" lg="4">
          <span className="d-flex justify-content-between">
            <span>Email: </span>
            <span>{business.email}</span>
          </span>
          <span className="d-flex justify-content-between">
            <span>telephone: </span>
            <span>{business.telephone}</span>
          </span>
          <span className="d-flex justify-content-between">
            <span>Fax: </span>
            <span>{business.fax}</span>
          </span>
          <hr></hr>

          <span className="d-flex justify-content-between">
            <span>Jupiter Branch: </span>
            <span>{business.branch}</span>
          </span>
          <span className="d-flex justify-content-between">
            <span>Technician Id: </span>
            <span>{business.sw_Tech}</span>
          </span>
        </CCol>

        <CCol sm="12">
          <hr />
          <h6> Certificate/ Business Trade license</h6>
          <hr />
          <CImg
            className="w-100"
            src={business.TL_Image}
            alt={business.businessName}
          />
        </CCol>
      </CRow>
    </>
  );
}

export default BusinessOverview;
