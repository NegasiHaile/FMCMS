import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import {
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CSelect,
  CInput,
  CRow,
  CCol,
  CFormGroup,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";
import { getConfig } from "../../config";
function DistributeSIMCard() {
  const simCardDistributionFields = {
    branchId: "",
    quantity: 1,
  };
  const [simCardDistribution, setSIMCardDistributiojn] = useState(
    simCardDistributionFields
  );

  const state = useContext(GlobalState);
  const { apiUrl } = getConfig();
  const [allSIMCards] = state.SIMCardAPI.simCards;
  const [undistributedSIMCards, setUndistributedSIMCards] = useState([]);

  const [allBranchs] = state.branchAPI.branchs;
  const [simCardsCallback, setSIMCardsCallback] = state.SIMCardAPI.callback;

  useEffect(() => {
    setUndistributedSIMCards(
      allSIMCards.filter(
        (filteredSIMCard) =>
          filteredSIMCard.branch === "none" &&
          filteredSIMCard.problemStatus === "fine"
      )
    );
  }, [allSIMCards]);
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
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setSIMCardDistributiojn({ ...simCardDistribution, [name]: value });
  };
  const onSubmitSIMCardDistribution = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${apiUrl}/sim_card/distribution`, {
        ...simCardDistribution,
      });
      sweetAlert("success", res.data.msg);
      setSIMCardsCallback(!simCardsCallback);
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };
  return (
    <CCard sm="12" md="10" lg="8">
      <CCardHeader>
        <h6>Ditribut SIM Cards to sub branchs</h6>
      </CCardHeader>
      <CForm onSubmit={onSubmitSIMCardDistribution}>
        <CCardBody>
          <CRow>
            <CCol md="4">
              <CFormGroup>
                SIM card quantity out of ({undistributedSIMCards.length})
                <CInput
                  type="number"
                  id="quantity"
                  name="quantity"
                  placeholder="Quantity"
                  onChange={onChangeInput}
                  value={simCardDistribution.quantity}
                  min="1"
                  max={undistributedSIMCards.length}
                  required
                ></CInput>
              </CFormGroup>
            </CCol>
            <CCol md="4">
              <CFormGroup>
                To which branch
                <CSelect
                  aria-label="Default select example"
                  id="branchId"
                  name="branchId"
                  onChange={onChangeInput}
                  value={simCardDistribution.branchId}
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
            <CCol md="4" className="mt-4">
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
                    onClick={() =>
                      setSIMCardDistributiojn(simCardDistributionFields)
                    }
                  >
                    <CIcon name="cil-x" /> Clear
                  </CButton>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
      </CForm>
    </CCard>
  );
}

export default DistributeSIMCard;
