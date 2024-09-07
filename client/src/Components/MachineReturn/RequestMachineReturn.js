import React, { useState } from "react";
import axios from "axios";
import {
  CButton,
  CCard,
  CCardBody,
  CForm,
  CRow,
  CCol,
  CFormGroup,
  CInput,
  CTextarea,
  CCardHeader,
  CLabel,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useParams } from "react-router-dom";
import { getConfig } from "../../config";

function RequestMachineReturn() {
  const params = useParams();
  const { apiUrl } = getConfig();
  const [retuenMachineReason, setretuenMachineReason] = useState({
    salesId: params.salesId,
    returnReason: "",
    acceptanceFile: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setretuenMachineReason({ ...retuenMachineReason, [name]: value });
  };

  const onChangeFileInput = (e) => {
    setretuenMachineReason({
      ...retuenMachineReason,
      acceptanceFile: e.target.files[0],
    });
  };

  const onSubmitSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("salesId", retuenMachineReason.salesId);
    formData.append("returnReason", retuenMachineReason.returnReason);
    formData.append("acceptanceFile", retuenMachineReason.acceptanceFile);
    try {
      const res = await axios.post(
        `${apiUrl}/business/return_machine_request`,
        formData
      );
      alert(res.data.msg);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <CCol className="d-flex justify-content-center">
      <CCard sm="12" md="10" lg="8">
        <CCardHeader>
          <h6>Machine return request form</h6>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={onSubmitSave}>
            <CRow>
              <CCol xs="12">
                <CFormGroup>
                  <CLabel className="text-muted">
                    Your reason to return the machine
                  </CLabel>
                  <CTextarea
                    rows="3"
                    id="returnReason"
                    name="returnReason"
                    placeholder="Enter a clear reason why you are returning back the machine!"
                    value={retuenMachineReason.returnReason}
                    onChange={onChangeInput}
                    required
                  />
                </CFormGroup>
              </CCol>
              <CCol xs="12">
                <CFormGroup>
                  <CLabel className="text-muted">Reason Certificate</CLabel>
                  <CInput
                    id="acceptanceFile"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    name="acceptanceFile"
                    onChange={onChangeFileInput}
                    required
                  />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow className="d-flex justify-content-center">
              <CCol xs="12" sm="6" className="d-flex justify-content-between">
                <CButton type="submit" size="sm" className="px-4" color="dark">
                  <CIcon name="cil-save" /> Send Request
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  );
}

export default RequestMachineReturn;
