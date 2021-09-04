import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import BadRouting from "../../Utils/routing/BadRouting";
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
      assignementDetail.MRC = machine.MRC;
      assignementDetail.SIM = machine.SIM;
      setMachieneDetail(machine);
    } else {
    }
  }, [id, machines]);
  // console.log("Outside useEffect" + JSON.stringify(assignementDetail));
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hours: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const assignMRCorSIM = async (e) => {
    e.preventDefault();
    if (onMRCEdit) {
      const res = await axios.put(`/machine/assigne_mrc/${id}`, {
        ...assignementDetail,
      });
      setMachineCallback(!machineCallback);
      alert(JSON.stringify(res.data.msg));
    } else if (onSIMEdit) {
      const res = await axios.put(`/machine/assigne_sim/${id}`, {
        ...assignementDetail,
      });
      setMachineCallback(!machineCallback);
      alert(JSON.stringify(res.data.msg));
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
                      {machieneDetail.MRC}
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
                    <span> {formatDate(machieneDetail.createdAt)}</span>
                  </p>
                </CCol>
              </CRow>
              <CTabs>
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink>
                      <CIcon name="cil-spreadsheet"></CIcon> Owner
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
                  <CTabPane></CTabPane>
                  <CTabPane></CTabPane>
                  <CTabPane></CTabPane>
                </CTabContent>
              </CTabs>
            </CCardBody>
          </CCard>
        ) : (
          <BadRouting text="This is bad routing! No machine data to fetch, please go back to machines list page and click the see-detail button of the machine you need to see it's detail." />
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
