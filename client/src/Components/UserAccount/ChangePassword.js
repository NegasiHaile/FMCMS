import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import Swal from "sweetalert2";
import {
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CCol,
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
import CIcon from "@coreui/icons-react";
import { getConfig } from "../../config";
const ChangePassword = () => {
  const state = useContext(GlobalState);
  const { apiUrl } = getConfig();
  const [user] = state.UserAPI.User;
  const [token] = state.token;
  const [Password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    retypeNewPassword: "",
  });

  const [oldPasswordSecure, setOldPasswordSecure] = useState(true);
  const [newPasswordSecure, setNewPasswordSecure] = useState(true);
  const [retypeNewPasswordSecure, setRetypeNewOldPasswordSecure] =
    useState(true);

  const [showModal, setShowModal] = useState(false);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setPassword({ ...Password, [name]: value });
  };

  const onSubmitChangePassword = async (e) => {
    e.preventDefault();
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})"
    );

    try {
      if (Password.newPassword === Password.retypeNewPassword) {
        if (Password.oldPassword !== Password.newPassword) {
          if (strongRegex.test(Password.newPassword)) {
            const res = await axios.post(
              `${apiUrl}/user/change_password/${user._id}`,
              {
                ...Password,
              },
              { headers: { Authorization: token } }
            );
            Swal.fire({
              position: "center",
              background: "#EBEDEF", // 2EB85C success // E55353 danger // 1E263C sidebar
              icon: "success",
              text: res.data.msg,
              confirmButtonColor: "#1E263C",
              showConfirmButton: false,
              // timer: 1500,
            });
          } else {
            setShowModal(true);
          }
        } else {
          Swal.fire({
            position: "center",
            background: "#EBEDEF", // 2EB85C success // E55353 danger // 1E263C sidebar
            icon: "error",
            text: "Your new password and old password must not be equal!",
            confirmButtonColor: "#1E263C",
            showConfirmButton: false,
            // timer: 1500,
          });
        }
      } else {
        Swal.fire({
          position: "center",
          background: "#EBEDEF", // 2EB85C success // E55353 danger // 1E263C sidebar
          icon: "error",
          text: "New password doesn't match, please retype your password!",
          confirmButtonColor: "#1E263C",
          showConfirmButton: false,
          // timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        background: "#EBEDEF", // 2EB85C success // E55353 danger // 1E263C sidebar
        icon: "error",
        text: error.response.data.msg,
        confirmButtonColor: "#1E263C",
        showConfirmButton: false,
        // timer: 1500,
      });
    }
  };

  const pw_strength_modal = {
    borderColor: "#999900",
  };
  return (
    <CRow className="d-flex justify-content-center">
      <CCol xs="12" md="9" lg="7" xl="6">
        <CCard className="mx-4 shadow">
          <CCardHeader>
            <h6 className="text-muted text-center text-uppercase">
              Change password
            </h6>
          </CCardHeader>
          <CCardBody className="p-4">
            <CForm onSubmit={onSubmitChangePassword}>
              <CInputGroup className="mb-3">
                <CInputGroupPrepend>
                  <CInputGroupText>
                    <CIcon name="cil-lock-unlocked" />
                  </CInputGroupText>
                </CInputGroupPrepend>
                <CInput
                  className="r-b-none"
                  type={oldPasswordSecure ? "password" : "text"}
                  name="oldPassword"
                  placeholder="old password"
                  autoComplete="oldPassword"
                  onChange={onChangeInput}
                  value={Password.oldPassword}
                  required
                />
                <CInputGroupAppend>
                  <CInputGroupText
                    className="l-b-none pw-show-hide"
                    onClick={() => setOldPasswordSecure(!oldPasswordSecure)}
                  >
                    <CIcon
                      name={oldPasswordSecure ? "cil-sun" : "cil-low-vision"}
                    />
                  </CInputGroupText>
                </CInputGroupAppend>
              </CInputGroup>
              <div className="mb-3">
                <CInputGroup>
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <CIcon name="cil-lock-locked" />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput
                    className="r-b-none"
                    type={newPasswordSecure ? "password" : "text"}
                    name="newPassword"
                    placeholder="New Password"
                    autoComplete="new-password"
                    onChange={onChangeInput}
                    value={Password.newPassword}
                    required
                    minLength={6}
                  />
                  <CInputGroupAppend>
                    <CInputGroupText
                      className="l-b-none pw-show-hide"
                      onClick={() => setNewPasswordSecure(!newPasswordSecure)}
                    >
                      <CIcon
                        name={newPasswordSecure ? "cil-sun" : "cil-low-vision"}
                      />
                    </CInputGroupText>
                  </CInputGroupAppend>
                </CInputGroup>
                {Password.newPassword !== "" &&
                  Password.newPassword.length < 6 && (
                    <small className="text-danger d-block">
                      * New password must be more than or equals to 6
                      chareacters lengthen!
                    </small>
                  )}
              </div>
              <div className="mb-3">
                <CInputGroup>
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <CIcon name="cil-lock-locked" />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput
                    className="r-b-none"
                    type={retypeNewPasswordSecure ? "password" : "text"}
                    placeholder="Repeat new password"
                    autoComplete="new-password"
                    name="retypeNewPassword"
                    onChange={onChangeInput}
                    value={Password.retypeNewPassword}
                    required
                    minLength={6}
                  />
                  <CInputGroupAppend>
                    <CInputGroupText
                      className="l-b-none pw-show-hide"
                      onClick={() =>
                        setRetypeNewOldPasswordSecure(!retypeNewPasswordSecure)
                      }
                    >
                      <CIcon
                        name={
                          retypeNewPasswordSecure ? "cil-sun" : "cil-low-vision"
                        }
                      />
                    </CInputGroupText>
                  </CInputGroupAppend>
                </CInputGroup>
                {Password.retypeNewPassword !== "" &&
                  Password.newPassword !== Password.retypeNewPassword && (
                    <small className="text-danger">
                      * Password not match, please retype to match new password!
                    </small>
                  )}
              </div>

              <CButton type="submit" className="jptr-btn" block>
                Change Password
              </CButton>
            </CForm>
          </CCardBody>
          <CCardFooter className="p-4"></CCardFooter>
        </CCard>
      </CCol>

      <CModal
        show={showModal}
        onClose={() => setShowModal(!showModal)}
        style={pw_strength_modal}
      >
        <CModalHeader closeButton className="jptr-bg">
          <h6 className="text-light">Rules to create strong password.</h6>
        </CModalHeader>
        <CModalBody>
          <h6>Your password must contain:-</h6>
          <ol>
            <li>At least 1 lowercase alphabetical character.</li>
            <li>At least 1 uppercase alphabetical character.</li>
            <li>At least 1 numeric character.</li>
            <li>At least 1 special character.</li>
            <li>At least 6 characters longer.</li>
          </ol>
          <p>
            {" "}
            Also, The New password and Retype password fields must be filled
            equally.
          </p>
        </CModalBody>
      </CModal>
    </CRow>
  );
};

export default ChangePassword;
