import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import BadRouting from "../../Utils/routing/BadRouting";
import MaintenanceListPerMachine from "../../Maintenance/Components/MaintenanceListPerMachine";
import ReturnListPerMachine from "./ReturnListPerMachine";
import FiscalizationsPerMachine from "./FiscalizationsPerMachine";
import {
  CButton,
  CCard,
  CCardBody,
  CImg,
  CRow,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTabs,
  CLink,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CForm,
  CFormGroup,
  CSelect,
  CTooltip,
  CInput,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";

function MachineDetail({ id }) {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [machines] = state.MachineAPI.machines;
  const [machineCallback, setMachineCallback] = state.MachineAPI.callback;
  const [mrcs] = state.MRCAPI.mrcs;
  const [mrcCallback, setMRCCallback] = state.MRCAPI.callback;
  const [machieneDetail, setMachieneDetail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [onMRCEdit, setOnMRCEdit] = useState(false);
  const [onSIMEdit, setOnSIMEdit] = useState(false);

  const [assignementDetail, setAssignementDetail] = useState({
    MRC: "",
    SIM: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setAssignementDetail({ ...assignementDetail, [name]: value });
  };

  useEffect(() => {
    if (id && machines) {
      const machine = machines.find(
        (filteredMachine) => filteredMachine._id === id
      );
      if (machine) {
        assignementDetail.MRC = machine.MRC;
        assignementDetail.SIM = machine.SIM;
        setMachieneDetail(machine);
      } else {
        setMachieneDetail("");
      }
    } else {
    }
  }, [id, machines]);

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

  const formatingDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };
  const assignMRCorSIM = async (e) => {
    e.preventDefault();
    if (onMRCEdit) {
      const res = await axios.put(`/machine/assigne_mrc/${id}`, {
        ...assignementDetail,
      });
      setMRCCallback(!mrcCallback);
      setMachineCallback(!machineCallback);
      sweetAlert("success", res.data.msg);
    } else if (onSIMEdit) {
      const res = await axios.put(`/machine/assigne_sim/${id}`, {
        ...assignementDetail,
      });
      setMRCCallback(!mrcCallback);
      setMachineCallback(!machineCallback);
      sweetAlert("success", res.data.msg);
    }
  };
  const filterMRCusing_id = (id) => {
    const activeMRC = mrcs.filter((filteredMRC) => filteredMRC._id === id);
    if (activeMRC.length > 0) {
      return activeMRC[0].MRC;
    } else {
      return "none";
    }
  };
  return (
    <div>
      <>
        {machieneDetail ? (
          <CCard>
            <CCardBody>
              <CRow className="mb-2">
                <CCol
                  sm="12"
                  md="4"
                  lg="3"
                  className="d-flex justify-content-center"
                >
                  <CImg
                    className="shadow-sm "
                    height="120"
                    src="/Others/fmimg1.jpg"
                    alt="Fiscal machine image"
                  />
                </CCol>
                <CCol sm="6" md="3" lg="3" className="mt-1">
                  <h6></h6>
                  <p className="d-flex justify-content-between">
                    <strong>* Serial Number:</strong>{" "}
                    <span> {machieneDetail.serialNumber} </span>
                  </p>
                  <p className="d-flex justify-content-between">
                    <strong>* Machine Model:</strong>
                    <span> {machieneDetail.machineModel} </span>
                  </p>
                  <p className="d-flex justify-content-between">
                    <strong>* Machine Brand:</strong>
                    <span> {machieneDetail.brand} </span>
                  </p>
                </CCol>
                <CCol sm="6" md="3" lg="3" className="mt-1">
                  <h6></h6>
                  <p className="d-flex justify-content-between">
                    <strong>* Acctual Price:</strong>{" "}
                    <span> {machieneDetail.price} ETB </span>
                  </p>
                  <p className="d-flex justify-content-between">
                    <strong>* Problem Status:</strong>
                    <span> {machieneDetail.problemStatus} </span>
                  </p>
                  <p className="d-flex justify-content-between">
                    <strong>* Sales Status:</strong>
                    <span> {machieneDetail.salesStatus}</span>
                  </p>
                </CCol>
                <CCol sm="6" md="3" lg="3" className="mt-1">
                  <h6></h6>
                  <p className="d-flex justify-content-between">
                    <strong>* MRC:</strong>
                    <span>
                      {filterMRCusing_id(machieneDetail.MRC)}
                      {user.userRole === "branch-store" && (
                        <>
                          {" "}
                          {" | "}
                          <CLink
                            className="text-success"
                            onClick={() => {
                              setOnSIMEdit(false);
                              setOnMRCEdit(true);
                              setShowModal(true);
                            }}
                          >
                            <CTooltip content={`Edit MRC of this machine!`}>
                              <CIcon name="cil-pen-alt" />
                            </CTooltip>
                          </CLink>
                        </>
                      )}
                    </span>
                  </p>
                  <p className="d-flex justify-content-between">
                    <strong>* SIM:</strong>

                    <span>
                      {machieneDetail.SIM}
                      {user.userRole === "branch-store" && (
                        <>
                          {" "}
                          {" | "}
                          <CLink
                            className="text-success"
                            onClick={() => {
                              setOnMRCEdit(false);
                              setOnSIMEdit(true);
                              setShowModal(true);
                            }}
                          >
                            <CTooltip
                              content={`Edit SIM card number of this machine!`}
                            >
                              <CIcon name="cil-pen-alt" />
                            </CTooltip>
                          </CLink>{" "}
                        </>
                      )}
                    </span>
                  </p>
                  <p className="d-flex justify-content-between">
                    <strong>* Date:</strong>
                    <span> {formatingDate(machieneDetail.createdAt)}</span>
                  </p>
                </CCol>
              </CRow>
              <CTabs>
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink>
                      <CIcon name="cil-list"></CIcon> Fiscalization
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>
                      <CIcon name="cil-options"></CIcon> Maintenance
                    </CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>
                      <CIcon name="cil-recycle"></CIcon> Returning
                    </CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent className="my-3">
                  <CTabPane>
                    <FiscalizationsPerMachine machineId={machieneDetail._id} />
                    {/* <div style={{ overflowX: "scroll" }}>
                      {machieneDetail.salesStatus === "sold" ? (
                        <FiscalizationForm />
                      ) : (
                        <BadRouting text="Fiscalization not available yet!" />
                      )}
                    </div> */}
                  </CTabPane>
                  <CTabPane>
                    <MaintenanceListPerMachine machineId={machieneDetail._id} />
                  </CTabPane>
                  <CTabPane>
                    <ReturnListPerMachine machineId={machieneDetail._id} />
                  </CTabPane>
                </CTabContent>
              </CTabs>
            </CCardBody>
          </CCard>
        ) : (
          <BadRouting text="Bad routing! Please go back to machines list page and click the see-detail button of you need to see it's detail." />
        )}{" "}
      </>
      <CModal show={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader closeButton>
          <CModalTitle className="text-muted">
            Assign {onMRCEdit && "MRC"} {onSIMEdit && "SIM Card"} to this
            Machine
          </CModalTitle>
        </CModalHeader>
        <CForm onSubmit={assignMRCorSIM}>
          <CModalBody>
            <CRow>
              {onMRCEdit && (
                <CCol sm="12">
                  <CFormGroup>
                    MRC
                    <CSelect
                      aria-label="Default select example"
                      id="MRC"
                      name="MRC"
                      value={assignementDetail.MRC}
                      onChange={onChangeInput}
                      required
                    >
                      <option value="none">Select MRC...</option>
                      {mrcs
                        .filter(
                          (mrc) =>
                            (mrc.status === "free" &&
                              mrc.branch == user.branch) ||
                            mrc._id == machieneDetail.MRC
                        )
                        .map((filteredmrc) => (
                          <option value={filteredmrc._id} key={filteredmrc._id}>
                            {filteredmrc.MRC}
                          </option>
                        ))}
                    </CSelect>
                  </CFormGroup>
                </CCol>
              )}
              {onSIMEdit && (
                <CCol sm="12">
                  <CFormGroup>
                    Insert the 10 digit of SIM card number
                    <CInput
                      id="SIM"
                      name="SIM"
                      placeholder="Inser SIM card number."
                      maxLength="10"
                      minLength="10"
                      value={assignementDetail.SIM}
                      onChange={onChangeInput}
                      required
                    />
                  </CFormGroup>
                </CCol>
              )}
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CButton type="submit" size="sm" color="dark">
              <CIcon name="cil-save" /> SAVE
            </CButton>
            <CButton
              size="sm"
              color="danger"
              onClick={() => {
                setOnMRCEdit(false);
                setOnSIMEdit(false);
                setShowModal(false);
              }}
            >
              <CIcon name="cil-x" /> Close
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </div>
  );
}

export default MachineDetail;
