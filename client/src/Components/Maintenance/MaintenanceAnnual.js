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
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { getConfig } from "../../config";

function MaintenanceAnnual() {
  const { apiUrl } = getConfig();
  const [upld, setUpld] = useState({
    machineId: "",
    businessId: "",
    acceptanceFile: "",
  });

  const onChangeInput = (e) => {
    try {
      const { name, value } = e.target;
      setUpld({ ...upld, [name]: value });
    } catch {}
  };
  const onChangeFileInput = (e) => {
    setUpld({ ...upld, acceptanceFile: e.target.files[0] });
  };

  const onSubmitSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("machineId", upld.machineId);
    formData.append("businessId", upld.businessId);
    formData.append("acceptanceFile", upld.acceptanceFile);
    try {
      if (upld.machineId !== "11111") {
        const res = await axios.post(`${apiUrl}/business/upload`, formData);
        alert(res.data.msg);
      } else {
        alert("Wrong value!");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <CCard>
      <CCardBody>
        <CForm onSubmit={onSubmitSave}>
          <CRow>
            <CCol xs="12">
              <CFormGroup>
                machineId
                <CInput
                  id="machineId"
                  name="machineId"
                  placeholder="Enter machineId."
                  value={upld.machineId}
                  onChange={onChangeInput}
                  required
                />
              </CFormGroup>
            </CCol>
            <CCol xs="12">
              <CFormGroup>
                Name
                <CInput
                  id="businessId"
                  name="businessId"
                  placeholder="Enter sub machineId."
                  value={upld.businessId}
                  onChange={onChangeInput}
                  required
                />
              </CFormGroup>
            </CCol>
            <CCol xs="12">
              <CFormGroup>
                File
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
                <CIcon name="cil-save" /> Save Detail
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </CCard>
  );
}

export default MaintenanceAnnual;
