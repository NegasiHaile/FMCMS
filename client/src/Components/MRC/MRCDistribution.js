import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import {
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CLabel,
  CForm,
  CSelect,
  CInput,
  CRow,
  CCol,
  CFormGroup,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";

function MRCDistribution() {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [mrcs] = state.MRCAPI.mrcs;
  const [allBranchs] = state.branchAPI.branchs;
  const [mrcCallback, setMRCCallback] = state.MRCAPI.callback;

  const mrcDistributionDetail = {
    branchId: user.branch,
    startingFrom: "",
    endTo: "",
  };

  const [mrcDistribution, setMRCDistribution] = useState(mrcDistributionDetail);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setMRCDistribution({ ...mrcDistribution, [name]: value });
  };
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
  const onSubmitMRCDistribution = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/mrc/distribution_by_range", {
        ...mrcDistribution,
      });
      sweetAlert("success", res.data.msg);
      setMRCCallback(!mrcCallback);
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };

  console.log(mrcDistribution);
  return (
    <CCard sm="12" md="10" lg="8">
      <CCardHeader>
        <h6>Ditribut MRC to sub branchs by range</h6>
      </CCardHeader>
      <CForm onSubmit={onSubmitMRCDistribution}>
        <CCardBody>
          <CRow>
            <CCol md="4">
              <CFormGroup>
                <CLabel> Range starting point </CLabel>
                <CSelect
                  aria-label="Default select example"
                  id="startingFrom"
                  name="startingFrom"
                  onChange={onChangeInput}
                  value={mrcDistribution.startingFrom}
                  required
                >
                  <option value="">Select starting range...</option>
                  {mrcs
                    .filter((filteredMRC) => filteredMRC.branch === "none")
                    .map((mrc) => (
                      <option value={mrc.MRC} key={mrc._id}>
                        {mrc.MRC}
                      </option>
                    ))}
                </CSelect>
              </CFormGroup>
            </CCol>
            <CCol md="4">
              <CFormGroup>
                <CLabel> Range end point </CLabel>
                <CSelect
                  aria-label="Default select example"
                  id="endTo"
                  name="endTo"
                  onChange={onChangeInput}
                  value={mrcDistribution.endTo}
                  required
                >
                  <option value="">Select end range...</option>
                  {mrcs
                    .filter(
                      (filteredMRC) =>
                        filteredMRC.branch === "none" &&
                        filteredMRC.MRC > mrcDistribution.startingFrom
                    )
                    .map((mrc) => (
                      <option value={mrc.MRC} key={mrc._id}>
                        {mrc.MRC}
                      </option>
                    ))}
                </CSelect>
              </CFormGroup>
            </CCol>
            <CCol md="4">
              <CFormGroup>
                <CLabel>To which branch</CLabel>
                <CSelect
                  aria-label="Default select example"
                  id="branchId"
                  name="branchId"
                  onChange={onChangeInput}
                  value={mrcDistribution.branchId}
                  required
                >
                  <option value="">Select branch...</option>
                  {allBranchs.map((branch) => (
                    <option value={branch._id} key={branch._id}>
                      {branch.branchName}
                    </option>
                  ))}
                </CSelect>
              </CFormGroup>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CRow className="d-flex justify-content-center">
            <CCol sm="12" md="6" lg="4">
              <CRow>
                <CCol>
                  <CButton
                    type="submit"
                    size="sm"
                    color="dark"
                    className="w-100"
                  >
                    <CIcon name="cil-control" /> Distribute
                  </CButton>
                </CCol>

                <CCol>
                  <CButton
                    size="sm"
                    color="danger"
                    className="w-100"
                    onClick={() => setMRCDistribution(mrcDistributionDetail)}
                  >
                    <CIcon name="cil-x" /> Clear
                  </CButton>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCardFooter>
      </CForm>
    </CCard>
  );
}

export default MRCDistribution;
