import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [passwordSecure, setPasswordSecure] = useState(true);
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
                  <h5 className="text-center text-muted">WELCOME</h5>
                  <p className="text-center  text-muted">
                    Jupiter-Trading-FMCMS Sign in!
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
                        className="r-b-none"
                        type={passwordSecure ? "password" : "text"}
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={user.password}
                        onChange={onChangeInput}
                        required
                      />
                      <CInputGroupAppend>
                        <CInputGroupText
                          className="l-b-none"
                          style={{
                            backgroundColor: "transparent",
                            cursor: "pointer",
                          }}
                          onClick={() => setPasswordSecure(!passwordSecure)}
                        >
                          <CIcon
                            name={passwordSecure ? "cil-sun" : "cil-low-vision"}
                          />
                        </CInputGroupText>
                      </CInputGroupAppend>
                    </CInputGroup>
                    <CCol className="col-12 mt-1 d-flex justify-content-end">
                      <Link to="/forgotpassword" className="text-info">
                        Forgotten password?
                      </Link>
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
                      <CCol className="col-12 mt-3">
                        <p className="mb-0 text-center">
                          <br />
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
    </>
  );
};

export default Login;
