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
  CRow,
  CCol,
  CFormGroup,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";

const MachineDistribute = () => {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [allMachines] = state.MachineAPI.machines;
  const [allBusinesses] = state.BusinessAPI.businesses;
  const [callback, setCallback] = state.MachineAPI.callback;
  const [callbackBusiness, setCallbackBusiness] = state.BusinessAPI.callback;
  const [callbackSales, setCallbackSales] = state.SalesAPI.callback;

  const distributingDetail = {
    branch: user.branch,
    machineId: "",
    businessId: "",
  };
  const [distributingMachine, setDistributingMachine] =
    useState(distributingDetail);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setDistributingMachine({ ...distributingMachine, [name]: value });
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
  const distributeMachine = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/machine/distribute", {
        ...distributingMachine,
      });
      sweetAlert("success", res.data.msg);
      setCallback(!callback);
      setCallbackBusiness(!callbackBusiness);
      setCallbackSales(!callbackSales);
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };
  return (
    <CRow className="d-flex justify-content-center">
      <CCard sm="12" md="10" lg="8">
        <CCardHeader></CCardHeader>
        <CForm onSubmit={distributeMachine}>
          <CCardBody>
            <CRow>
              <CCol md="6">
                <CFormGroup>
                  <CLabel>Select Machine</CLabel>
                  <CSelect
                    aria-label="Default select example"
                    id="machineId"
                    name="machineId"
                    onChange={onChangeInput}
                    value={distributingMachine.machineId}
                    required
                  >
                    <option value="">Select machine identity...</option>
                    {allMachines
                      .filter(
                        (machine) =>
                          machine.salesStatus !== "sold" &&
                          machine.branch == user.branch &&
                          machine.problemStatus === "fine"
                      )
                      .map((filteredMachine) => (
                        <option
                          value={filteredMachine._id}
                          key={filteredMachine._id}
                        >
                          SEN: {filteredMachine.serialNumber} {"---"}
                          Brand: {filteredMachine.brand}
                        </option>
                      ))}
                  </CSelect>
                  <small className="text-muted">
                    If the machine is not in the above list it may be
                    distributed or it's problem status is damaged!
                  </small>
                </CFormGroup>
              </CCol>
              <CCol md="6">
                <CFormGroup>
                  <CLabel>Select business</CLabel>
                  <CSelect
                    aria-label="Default select example"
                    id="businessId"
                    name="businessId"
                    onChange={onChangeInput}
                    value={distributingMachine.businessId}
                    required
                  >
                    <option value="">Select business identity...</option>
                    {allBusinesses
                      .filter((bussiness) => bussiness.branch == user.branch)
                      .map((filteredBussiness) => (
                        <option
                          value={filteredBussiness._id}
                          key={filteredBussiness._id}
                        >
                          {filteredBussiness.tradeName}
                        </option>
                      ))}
                  </CSelect>
                  <small className="text-muted">
                    If the business is not in the list above it may be assigned
                    a mchine or you aren't accepted it yet!
                  </small>
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
                      <CIcon name="cil-control" /> Assign machine
                    </CButton>
                  </CCol>

                  <CCol>
                    <CButton
                      size="sm"
                      color="danger"
                      className="w-100"
                      onClick={() => setDistributingMachine(distributingDetail)}
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
    </CRow>
  );
};

export default MachineDistribute;
