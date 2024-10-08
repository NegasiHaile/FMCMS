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
import { getConfig } from "../../config";

function MachineDistribution() {
  const state = useContext(GlobalState);
  const { apiUrl } = getConfig();
  const [user] = state.UserAPI.User;
  const [allMachines] = state.MachineAPI.machines;
  const [machineBrands, setMachineBrands] = useState("");
  const [allBranchs] = state.branchAPI.branchs;
  const [callbackMachine, setCallbackMachine] = state.MachineAPI.callback;

  const distributingDetail = {
    branchId: user.branch,
    brand: "",
    quantity: "",
  };

  const [machineDistribution, setmachineDistribution] =
    useState(distributingDetail);

  useEffect(() => {
    function removeDuplicates(data, key) {
      return [
        ...new Map(data.map((machine) => [key(machine), machine])).values(),
      ];
    }
    setMachineBrands(removeDuplicates(allMachines, (machine) => machine.brand));
  }, [allMachines]);
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setmachineDistribution({ ...machineDistribution, [name]: value });
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
  const onSubmitMachineDistribution = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/machine/distribution`, {
        ...machineDistribution,
      });
      setmachineDistribution(distributingDetail);
      setCallbackMachine(!callbackMachine);
      sweetAlert("success", res.data.msg);
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };
  return (
    <CCard sm="12" md="10" lg="8">
      <CCardHeader>
        <h6 className="text-uppercase">Ditribut machines to sub branchs</h6>
      </CCardHeader>
      <CForm onSubmit={onSubmitMachineDistribution}>
        <CCardBody>
          <CRow>
            <CCol md="4">
              <CFormGroup>
                <CLabel>Machine Brand</CLabel>
                <CSelect
                  aria-label="Default select example"
                  id="brand"
                  name="brand"
                  onChange={onChangeInput}
                  value={machineDistribution.brand}
                  required
                >
                  <option value="">Select machine brand...</option>
                  {machineBrands &&
                    machineBrands.map((machine) => (
                      <option value={machine.brand} key={machine._id}>
                        {machine.brand} {" / available: "}{" "}
                        {
                          allMachines.filter(
                            (item) =>
                              item.brand === machine.brand &&
                              item.branch === "none"
                          ).length
                        }
                      </option>
                    ))}
                </CSelect>
              </CFormGroup>
            </CCol>
            <CCol md="4">
              <CFormGroup>
                <CLabel>Machine quantity</CLabel>
                <CInput
                  type="number"
                  id="quantity"
                  name="quantity"
                  placeholder="Quantity"
                  onChange={onChangeInput}
                  value={machineDistribution.quantity}
                  min="1"
                  max="500"
                  required
                ></CInput>
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
                  value={machineDistribution.branchId}
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
                    onClick={() => setmachineDistribution(distributingDetail)}
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

export default MachineDistribution;
