import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import Swal from "sweetalert2";

import CIcon from "@coreui/icons-react";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/login", { ...user });

      localStorage.setItem("firstLogin", true);

      window.location.href = "/dashboard";
    } catch (err) {
      Swal.fire({
        position: "center",
        background: "#EBEDEF", // 2EB85C success // E55353 danger // 1E263C sidebar
        icon: "error",
        text: err.response.data.msg,
        confirmButtonColor: "#1E263C",
        showConfirmButton: true,
        // timer: 1500,
      });
    }
  };
  return (
    <>
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol
              sm="11"
              md="9"
              lg="7"
              className="shadow-lg p-3 mb-5 mx-3 bg-white rounded"
            >
              <CRow className="justify-content-center">
                <CCol md="11">
                  <CRow className="justify-content-center">
                    <img
                      style={{
                        borderRadius: "50%",
                        height: "75px",
                        marginTop: "-50px",
                      }}
                      className="shadow-sm bg-white p-2"
                      alt="Logo"
                      src="/logo/smalllogo.png"
                    />
                  </CRow>
                </CCol>
                <CCol md="11" className="mt-2">
                  <h6 className="text-center text-muted">
                    JuPiTeR-Trading-FMCMS
                  </h6>
                </CCol>
                <CCol md="11" className="my-4">
                  <CForm onSubmit={loginSubmit}>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="email"
                        name="email"
                        placeholder="Email address"
                        autoComplete="username"
                        onChange={onChangeInput}
                        value={user.email}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-unlocked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={user.password}
                        onChange={onChangeInput}
                        required
                      />
                    </CInputGroup>
                    <CRow className="mt-3">
                      <CCol sm="12" md="6">
                        <CButton
                          size="sm"
                          type="submit"
                          color="light"
                          className="px-4 w-100"
                        >
                          <CIcon name="cil-blind" /> Login
                        </CButton>
                      </CCol>
                      <CCol sm="12" md="6" className="text-right">
                        <CButton color="link" className="px-0" to="#">
                          <span className="text-dark">Forgot password?</span>
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  );
};

export default Login;
