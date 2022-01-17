import React, { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom"

import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupAppend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import Swal from "sweetalert2";

import CIcon from "@coreui/icons-react";


function ResetPassword() {
    const [newPassword, setNewPassword] = useState("")
    const [retypeNewPassword, setRetypeNewPassword] = useState("")

    const [newPasswordSecure, setNewPasswordSecure] = useState(true)
    const [retypeNewPasswordSecure, setRetypeNewPasswordSecure] = useState(true)

const onSubmitResetPassword = async (e) => {
    e.preventDefault();
    
  };
    return (
        <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer className="mt-5">
          <CRow className="justify-content-center">
            <CCol
              md="6"
              lg="5"
              className="shadow-lg p-3 mb-5 mx-3 bg-white rounded"
            >
              <CRow className="justify-content-center mt-3 mb-4">
                <CCol md="11">
                  <CRow className="justify-content-center">
                    <img
                      style={{
                        borderRadius: "50%",
                        height: "75px",
                      }}
                      className=" bg-white p-2 border"
                      alt="Logo"
                      src="/logo/smalllogo.png"
                    />
                  </CRow>
                </CCol>
                <CCol md="11" className="mt-2">
                  <h5 className="text-center text-muted">Reset Password</h5>
                  <p className="text-center  text-muted">
                    Create your new strong password!
                  </p>
                </CCol>
                <CCol md="11" className="my-4">
                  <CForm onSubmit={onSubmitResetPassword}>
                  <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-unlocked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        className = "r-b-none"
                        type= {newPasswordSecure ? "password" : "text"}
                        name="newPassword"
                        placeholder="New passowrd"
                        autoComplete="current-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                                            min={10}
                                            max={10}
                      />
                      <CInputGroupAppend>
          <CInputGroupText className="l-b-none pw-show-hide"
          onClick={() => setNewPasswordSecure(!newPasswordSecure)}>
            <CIcon  name= {newPasswordSecure ? "cil-sun" : "cil-low-vision"}/>
          </CInputGroupText>
        </CInputGroupAppend>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-unlocked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                      className = "r-b-none"
                        type= {retypeNewPasswordSecure ? "password" : "text"}
                        name="retypeNewPassword"
                        placeholder="Retype your password"
                        autoComplete="current-password"
                        value={retypeNewPassword}
                        onChange={(e) => setRetypeNewPassword(e.target.value)}
                        required
                      />
                      <CInputGroupAppend>
          <CInputGroupText className="l-b-none pw-show-hide" 
          onClick={() => setRetypeNewPasswordSecure(!retypeNewPasswordSecure)}>
            <CIcon  name= {retypeNewPasswordSecure ? "cil-sun" : "cil-low-vision"}/>
          </CInputGroupText>
        </CInputGroupAppend>
                    </CInputGroup>
                    <CRow className="mt-2">
                      <CCol sm="12" md="12">
                        <CButton
                          type="submit"
                          className="px-4 w-100 jptr-btn"
                                            >
                                                <CIcon name="cil-recycle" /> Reset Password
                                            </CButton>
                                        </CCol>
                                        
                    
                                        <CCol className="col-12 mt-4">
                                            <p className="mb-0  text-center">
                                                <Link to="/" className="text-info">
                        <h6>Sign In</h6>
                      </Link></p>
                        <p className="mb-0 text-center">
                          <small>
                            &copy; Copyright 2021{" "}
                            <a
                              href="http://jupiter-tradingeth.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-info"
                            >
                              Jupiter-Trading
                            </a>
                            .
                            <br /> All rights reserved.
                          </small>
                        </p>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    )
}

export default ResetPassword
