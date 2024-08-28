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
import { getConfig } from "../../config";
function ForgotPassword() {
  const { apiUrl } = getConfig();
  const [accountEmail, setAccountEmail] = useState("");

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

  const onsubmitForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${apiUrl}/user/forgot_Password`, {
        email: accountEmail,
      });
      sweetAlert("success", res.data.msg);
      setAccountEmail("");
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <div className="clearfix mb-2">
              <h2 className="float-left display-4 mr-4">FMCMS</h2>
              <h5 className="pt-2">Oops! Forgot your password?</h5>
              <p className="text-muted float-left">
                Enter email associeated with your FMCMS account <br /> in the
                field below and submit!
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
