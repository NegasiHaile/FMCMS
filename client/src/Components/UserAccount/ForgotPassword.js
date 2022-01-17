import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  CCard,
  CButton,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
function ForgotPassword() {
  const [accountEmail, setAccountEmail] = useState();

  const onsubmitForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/user/forgot_Password", {
        email: accountEmail,
      });
      alert(res.data.msg);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <div className="clearfix mb-2">
              <h2 className="float-left display-4 mr-4">FMCMS</h2>
              <h5 className="pt-2">Oops! Forgotten your password?</h5>
              <p className="text-muted float-left">
                Enter your email below & hit the Submit button.
              </p>
            </div>
            <CForm onSubmit={onsubmitForgotPassword}>
              <CInputGroup className="input-prepend">
                <CInputGroupPrepend>
                  <CInputGroupText>
                    <CIcon name="cil-envelope-closed" />
                  </CInputGroupText>
                </CInputGroupPrepend>
                <CInput
                  name="accountEmail"
                  type="email"
                  placeholder="Enter your FMCMS account email?"
                  required
                  value={accountEmail}
                  onChange={(e) => setAccountEmail(e.target.value)}
                />
                <CInputGroupAppend>
                  <CButton type="submit" className="jptr-btn">
                    Submit
                  </CButton>
                </CInputGroupAppend>
              </CInputGroup>
            </CForm>
            <div className="mt-5">
              <Link to="/" className="pt-2 text-center text-info">
                Go-Back
              </Link>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}

export default ForgotPassword;
