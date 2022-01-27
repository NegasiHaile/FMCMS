import React from "react";
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CButton,
  CRow,
  CCol,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupText,
  CLink,
  CTooltip,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

function SystemSetting() {
  return (
    <CCardGroup columns className="cols-2">
      <CCard>
        <CCardHeader className="d-flex justify-content-between">
          <h6>Sender email</h6>
        </CCardHeader>
        <CCardBody>
          <table className="table table-sm borderless">
            <tbody>
              <tr>
                <td>NegasiHaile19@gmail.com</td>
                <td>Primary</td>
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
                  <CButton className="ghost">Make Primary</CButton>
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
          <CInputGroup className="mb-4" size="sm">
            <CInput className="r-b-none" required />
            <CInputGroupAppend>
              <CInputGroupText className="jptr-btn" role="button">
                <CIcon name="cil-plus" /> Add email
              </CInputGroupText>
            </CInputGroupAppend>
          </CInputGroup>
        </CCardBody>
      </CCard>
    </CCardGroup>
  );
}

export default SystemSetting;
