import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  CButton,
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
              md="6"
              lg="5"
              className="shadow-lg p-3 mb-5 mx-3 bg-white rounded"
            >
              <CRow className="justify-content-center mt-3 mb-5">
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
                  <h5 className="text-center text-muted">WELCOME</h5>
                  <p class="text-center  text-muted">
                    Jupiter tading FMCMS signin!
                  </p>
                </CCol>
                <CCol md="11" className="my-4">
                  <CForm onSubmit={loginSubmit}>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-envelope-closed" />
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
                    <CCol className="col-12 mt-1 d-flex justify-content-end">
                      <a
                        href="http://jupiter-tradingeth.com/"
                        className="text-info"
                      >
                        Forgot password
                      </a>
                    </CCol>
                    <CRow className="mt-2">
                      <CCol sm="12" md="12">
                        <CButton
                          type="submit"
                          color="light"
                          className="px-4 w-100"
                        >
                          <CIcon name="cil-blind" /> Login
                        </CButton>
                      </CCol>
                      <CCol className="col-12 mt-1">
                        <p class="mb-0 text-center mt-4">
                          <a
                            href="http://jupiter-tradingeth.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-info"
                          >
                            Jupiter-Trading
                          </a>
                          <br />
                          <small>Copy right &copy; 2021.</small>
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
    </>
  );
};

export default Login;
