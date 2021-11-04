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
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
const ChangePassword = () => {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [token] = state.token;
  const [Password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    retypeNewPassword: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setPassword({ ...Password, [name]: value });
  };

  const onSubmitChangePassword = async (e) => {
    e.preventDefault();
    try {
      if (Password.newPassword === Password.retypeNewPassword) {
        const res = await axios.post(
          `/user/change_password/${user._id}`,
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
                  type="password"
                  name="oldPassword"
                  placeholder="old password"
                  autoComplete="oldPassword"
                  onChange={onChangeInput}
                  value={Password.oldPassword}
                  required
                />
              </CInputGroup>
              <div className="mb-3">
                <CInputGroup>
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <CIcon name="cil-lock-locked" />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    autoComplete="new-password"
                    minLength="6"
                    onChange={onChangeInput}
                    value={Password.newPassword}
                    required
                  />
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
                    type="password"
                    placeholder="Repeat new password"
                    autoComplete="new-password"
                    name="retypeNewPassword"
                    minLength="6"
                    onChange={onChangeInput}
                    value={Password.retypeNewPassword}
                    required
                  />
                </CInputGroup>
                {Password.retypeNewPassword !== "" &&
                  Password.newPassword !== Password.retypeNewPassword && (
                    <small className="text-danger">
                      * Password not match, please retype to match new password!
                    </small>
                  )}
              </div>

              <CButton
                type="submit"
                color="primary"
                block
                disabled={
                  Password.oldPassword !== "" &&
                  Password.newPassword.length >= 6 &&
                  Password.newPassword === Password.retypeNewPassword
                    ? false
                    : true
                }
              >
                Change Password
              </CButton>
            </CForm>
          </CCardBody>
          <CCardFooter className="p-4"></CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ChangePassword;
