import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom"

import { GlobalState } from "../../GlobalState";
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
  CModal,
  CModalHeader,
  CModalBody,
} from "@coreui/react";
import Swal from "sweetalert2";

import CIcon from "@coreui/icons-react";

function ResetPassword() {
  const state = useContext(GlobalState);
  const [allUsers] = state.UsersAPI.users;
  const params = useParams();
  const [newPassword, setNewPassword] = useState("")
  const [retypeNewPassword, setRetypeNewPassword] = useState("")

  const [newPasswordSecure, setNewPasswordSecure] = useState(true)
  const [retypeNewPasswordSecure, setRetypeNewPasswordSecure] = useState(true)

  const [showModal, setShowModal] = useState(false);
  
  const [account, setAccount] = useState([])

    useEffect(() => {
      setAccount(allUsers[0])
    }, [params.resetToken])
  
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
const onSubmitResetPassword = async (e) => {
  e.preventDefault();
  const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");
  
  try {
    if (newPassword === retypeNewPassword) {
      if (strongRegex.test(newPassword)) {
        // alert(params.resetToken)
        const res = await axios.put(`/user/reset_password/${params.resetToken}`, {
          newPassword : newPassword,
        })
        setNewPassword("");
        setRetypeNewPassword("");
        sweetAlert("success", res.data.msg)
      }
      else {
        setShowModal(true)
      }
    } else {
      sweetAlert("error", "New password and Retype password must be equal!")
    }
  } catch (error) {
    sweetAlert("error", error.response.data.msg)
  }
  };
  const pw_strength_modal = {
    borderColor: "#999900"
  }
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
                        minLength={6}
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
                        minLength={6}
                      />
                      <CInputGroupAppend>
          <CInputGroupText className="l-b-none pw-show-hide" 
          onClick={() => setRetypeNewPasswordSecure(!retypeNewPasswordSecure)}>
            <CIcon  name= {retypeNewPasswordSecure ? "cil-sun" : "cil-low-vision"}/>
          </CInputGroupText>
        </CInputGroupAppend>
                    </CInputGroup>
                  <CCol className="col-12 mt-1 d-flex justify-content-end">
                      <a className="text-info pointer" role="button" onClick={() => setShowModal(!showModal)}>
                        Strong password?
                      </a>
                    </CCol>
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
                                            <div className="mb-0  text-center">
                                                <Link to="/" className="text-info">
                        <h6>Sign In</h6>
                      </Link></div>
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
          <CModal
          show={showModal}
          onClose={() => setShowModal(!showModal)}
          style={pw_strength_modal}
        >
          <CModalHeader closeButton 
          className="jptr-bg">
            <h6 className="text-light">Rules to create strong password.</h6>
          </CModalHeader>
          <CModalBody>
            <h6>Your password must contain:-</h6>
            <ol >
              <li >At least 1 lowercase alphabetical character.</li>
              <li >At least 1 uppercase alphabetical character.</li>
              <li >At least 1 numeric character.</li>
              <li >At least 1 special character.</li>
              <li >At least 6 characters longer.</li>
            </ol>
            <p > Also, The New password and Retype password fields must be filled equally.</p>
            </CModalBody>
        </CModal>
        </CContainer>

        
      </div>
    )
}

export default ResetPassword
