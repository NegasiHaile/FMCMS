import React from "react";
import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
function ForgotPassword() {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <div className="clearfix">
              <h2 className="float-left display-4 mr-4">FMCMS</h2>
              <h5 className="pt-2">Oops! Forgot your password?</h5>
              <p className="text-muted float-left">Enter your email below & hit the forgot button.</p>
            </div>
            <CForm> 
            <CInputGroup className="input-prepend">
              <CInputGroupPrepend>
                <CInputGroupText>
                  <CIcon name="cil-envelope-closed" />
                </CInputGroupText>
              </CInputGroupPrepend>
              <CInput  type="email" placeholder="Enter your account email?" required />
              <CInputGroupAppend>
                <CButton type="submit" color="info">Forgot</CButton>
              </CInputGroupAppend>
            </CInputGroup>
            </CForm>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}

export default ForgotPassword;
