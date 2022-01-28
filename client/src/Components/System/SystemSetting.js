import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CForm,
  CButton,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupText,
  CLink,
  CTooltip,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

function SystemSetting() {
  const [senderEmail, setSenderEmail] = useState("");

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
  const onSubmitAddEmail = (e) => {
    e.preventDefault();
    sweetAlert("success", "res.data.msg");
  };

  const removeSenderEmail = (e) => {
    Swal.fire({
      text: "Are you sure you want to remove this email?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3C4B64",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          sweetAlert("success", "Sender email successfuly removed!");
        } catch (error) {
          sweetAlert("error", error.response.data.msg);
        }
      }
    });
  };
  return (
    <CCardGroup columns className="cols-2">
      <CCard>
        <CCardHeader className="d-flex justify-content-between">
          <h6>Sender email</h6>
        </CCardHeader>
        <CCardBody>
          <div className=" table-responsive">
            <table className="table table-sm borderless">
              <tbody>
                <tr>
                  <td>NegasiHaile19@gmail.com</td>
                  <td className="text-success">Primary</td>
                  <td className="d-flex justify-content-end">
                    <CLink
                      className="text-danger"
                      onClick={() => removeSenderEmail()}
                    >
                      <CTooltip content={`Remove this sender email.`}>
                        <CIcon name="cil-trash" />
                      </CTooltip>
                    </CLink>
                  </td>
                </tr>
                <tr>
                  <td>Negasi.Haile@Horizontech.com</td>
                  <td>
                    <CButton size="sm" color="primary" variant="ghost">
                      Make Primary
                    </CButton>
                  </td>
                  <td className="d-flex justify-content-end">
                    <CLink
                      className="text-danger"
                      onClick={() => removeSenderEmail()}
                    >
                      <CTooltip content={`Remove this sender email.`}>
                        <CIcon name="cil-trash" />
                      </CTooltip>
                    </CLink>
                  </td>
                </tr>
              </tbody>
            </table>
            <CForm onSubmit={onSubmitAddEmail}>
              <CInputGroup className="mb-4">
                <CInput
                  className="r-b-none"
                  name="senderEmail"
                  type="email"
                  placeholder="Enter sender email?"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                />
                <CInputGroupAppend>
                  <CButton
                    className="jptr-btn"
                    size="sm"
                    role="button"
                    type="submit"
                  >
                    <CIcon name="cil-plus" /> Add email
                  </CButton>
                </CInputGroupAppend>
              </CInputGroup>
            </CForm>
          </div>
        </CCardBody>
      </CCard>
    </CCardGroup>
  );
}

export default SystemSetting;
