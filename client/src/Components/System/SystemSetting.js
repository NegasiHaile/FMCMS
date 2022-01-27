import React, { useState } from "react";
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
  const onSubmitAddEmail = (e) => {
    e.preventDefault();
    alert(senderEmail);
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
                    <span>
                      <CLink className="text-danger">
                        <CTooltip content={`Remove this email.`}>
                          <CIcon name="cil-x" />
                        </CTooltip>
                      </CLink>
                    </span>
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
                    <span>
                      <CLink className="text-danger">
                        <CTooltip content={`Remove this email.`}>
                          <CIcon name="cil-x" />
                        </CTooltip>
                      </CLink>
                    </span>
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
