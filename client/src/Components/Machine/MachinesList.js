import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import NewArivals from "../Machine/Components/NewArivals";
import FilterMRC from "../Utils/Filters/FilterMRC";
import FilterSIMCard from "../Utils/Filters/FilterSIMCard";
import {
  CBadge,
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CLabel,
  CForm,
  CSelect,
  CRow,
  CCol,
  CFormGroup,
  CInput,
  CDataTable,
  CLink,
  CTooltip,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";
import { getConfig } from "../../config";

const MachinesList = () => {
  const state = useContext(GlobalState);
  const { apiUrl } = getConfig();
  const [user] = state.UserAPI.User;
  const [token] = state.token;
  const [allMachines] = state.MachineAPI.machines;
  const [machines, setMachines] = useState([]);
  const [allBranchs] = state.branchAPI.branchs;
  const [callback, setCallback] = state.MachineAPI.callback;
  const [callbackBusiness, setCallbackBusiness] = state.BusinessAPI.callback;
  const [callbackSales, setCallbackSales] = state.SalesAPI.callback;
  const [activemachine, setActivemachine] = useState("none");
  const [showModal, setShowModal] = useState(false);
  // const [distributingMachineId, setDistributingMachineId] = useState("none");
  const distributingMachineId = useState("none");
  const [showMachineDistributeModal, setShowMachineDistributeModal] =
    useState(false);
  const [newArivalsModal, setNewArivalsModal] = useState(false);
  const [newArivals, setNewArivals] = useState([]);
  const [businesses] = state.BusinessAPI.businesses;

  const machineDetail = {
    serialNumber: "",
    machineModel: "",
    brand: "",
    price: "",
    branch: "none",
    problemStatus: "",
    // for distributing
    businessId: "",
  };
  const [machine, setMachine] = useState(machineDetail);

  useEffect(() => {
    if (user.userRole !== "super-admin" && user.userRole !== "main-store") {
      setMachines(
        allMachines.filter(
          (filteredMachine) =>
            filteredMachine.branch == user.branch &&
            filteredMachine.availableIn !== "main-store"
        )
      );
      setNewArivals(
        allMachines.filter(
          (filteredMachine) =>
            filteredMachine.branch == user.branch &&
            filteredMachine.availableIn === "main-store"
        )
      );
    } else {
      setMachines(allMachines);
    }
  }, [user, allMachines]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setMachine({ ...machine, [name]: value });
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

  const onSubmitRegisterMachine = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/machine/register`, {
        ...machine,
      });
      sweetAlert("success", res.data.msg);
      setCallback(!callback);
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };
  const editmachineDetail = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${apiUrl}/machine/edit/${activemachine}`,
        { ...machine },
        {
          headers: { Authorization: token },
        }
      );
      sweetAlert("success", res.data.msg);
      setShowModal(!showModal);
      setCallback(!callback);
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };

  const deletemachine = async (_id) => {
    // e.preventDefault();
    try {
      Swal.fire({
        title: "Delete?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3C4B64",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.delete(`${apiUrl}/machine/delete/${_id}`, {
            headers: { Authorization: token },
          });
          Swal.fire("Deleted!", res.data.msg, "success");
          setCallback(!callback);
        }
      });
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };

  const distributeMachine = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/machine/distribute`, {
        ...machine,
        machineId: distributingMachineId,
      });
      sweetAlert("success", res.data.msg);
      setShowMachineDistributeModal(!showMachineDistributeModal);
      setCallback(!callback);
      setCallbackBusiness(!callbackBusiness);
      setCallbackSales(!callbackSales);
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };

  // console.log(machine);
  const machineTablefields = [
    "serialNumber",
    "machineModel",
    "brand",
    "price",
    "MRC",
    "SIM",
    "fiscalizationTimes",
    "salesStatus",
    "availableIn",
    "problemStatus",
    {
      key: "Actions",
      label: "Actions",
      // _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];
  return (
    <>
      <CCard className=" shadow-sm">
        <CCardHeader className="d-flex justify-content-between">
          <CLabel className="text-uppercase">Machines list</CLabel>
          {user.userRole === "main-store" && (
            <CButton
              size="sm"
              color="dark"
              onClick={() => {
                setActivemachine("none");
                setMachine({ ...machineDetail });
                setShowModal(!showModal);
              }}
            >
              <CIcon name="cil-plus" /> Add Machine
            </CButton>
          )}
          {user.userRole === "branch-store" && (
            <CButton
              size="sm"
              color="danger"
              variant="outline"
              onClick={() => {
                setNewArivalsModal(!newArivalsModal);
              }}
            >
              New Arivals{" "}
              <CBadge color="danger" className="mfs-auto">
                {newArivals.length}
              </CBadge>
            </CButton>
          )}
        </CCardHeader>
        <CCardBody>
          <CDataTable
            size="sm"
            items={machines}
            fields={machineTablefields}
            tableFilter
            columnFilter
            itemsPerPageSelect
            itemsPerPage={10}
            hover
            cleaner
            sorter
            pagination
            scopedSlots={{
              MRC: (machine) => (
                <td>
                  <FilterMRC mrcId={machine.MRC} filterType="mrcNumber" />
                </td>
              ),
              SIM: (machine) => (
                <td>
                  <FilterSIMCard simId={machine.SIM} filterType="simNumber" />
                </td>
              ),
              salesStatus: (machine) => (
                <td className="d-flex justify-content-between">
                  {machine.salesStatus}
                  {/* {user.userRole === "sales" && (
                    <>
                      {machine.salesStatus === "unsold" ? (
                        <CLink
                          className="text-primary"
                          onClick={() => {
                            setDistributingMachineId(machine._id);
                            setShowMachineDistributeModal(
                              !showMachineDistributeModal
                            );
                          }}
                        >
                          <CTooltip
                            content={`Sale - ${machine.serialNumber}- machine.`}
                          >
                            <CIcon name="cil-control" />
                          </CTooltip>
                        </CLink>
                      ) : machine.salesStatus === "returning" ? (
                        <CLink
                          className="text-success"
                          onClick={() => {
                            setDistributingMachineId(machine._id);
                            revertMachine(machine._id);
                          }}
                        >
                          <CTooltip
                            content={`Revert - ${machine.serialNumber}- machine.`}
                          >
                            <CIcon name="cil-loop" />
                          </CTooltip>
                        </CLink>
                      ) : (
                        ""
                      )}
                    </>
                  )} */}
                </td>
              ),
              Actions: (machine) => (
                <td className="d-flex justify-content-between">
                  {user.userRole === "main-store" && (
                    <>
                      {machine.salesStatus === "unsold" && (
                        <>
                          <CLink
                            className="text-success"
                            onClick={() => {
                              setMachine({ ...machine });
                              setActivemachine(machine._id);
                              setShowModal(!showModal);
                            }}
                          >
                            <CTooltip
                              content={`Edit the  - ${machine.serialNumber}- machine detail.`}
                            >
                              <CIcon name="cil-pencil" />
                            </CTooltip>
                          </CLink>

                          {machine.availableIn === "main-store" && (
                            <>
                              {" "}
                              <span className="text-muted">|</span>
                              <CLink
                                className="text-danger"
                                onClick={() => deletemachine(machine._id)}
                              >
                                <CTooltip
                                  content={`Delete - ${machine.serialNumber}- machine.`}
                                >
                                  <CIcon name="cil-trash" />
                                </CTooltip>
                              </CLink>{" "}
                            </>
                          )}
                        </>
                      )}
                      <span className="text-muted">|</span>
                    </>
                  )}

                  {
                    <>
                      <CLink
                        className="text-info"
                        to={`/machine/indetail/${machine._id}`}
                      >
                        <CTooltip
                          content={`See detail of  - ${machine.serialNumber}- machine.`}
                        >
                          <CIcon name="cil-arrow-right" />
                        </CTooltip>
                      </CLink>
                    </>
                  }
                </td>
              ),
            }}
          />
        </CCardBody>

        {/* register machine modal */}
        <CModal
          size="lg"
          show={showModal}
          onClose={() => setShowModal(!showModal)}
        >
          <CModalHeader closeButton>
            <CModalTitle className="text-muted">Open-New-machine</CModalTitle>
          </CModalHeader>
          <CForm onSubmit={onSubmitRegisterMachine}>
            <CModalBody>
              <CRow>
                <CCol xs="12" md="6">
                  <CFormGroup>
                    Serial Number
                    <CInput
                      id="serialNumber"
                      name="serialNumber"
                      placeholder="Enter serial number."
                      value={machine.serialNumber}
                      onChange={onChangeInput}
                      required
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="12" md="6">
                  <CFormGroup>
                    Model
                    <CInput
                      id="machineModel"
                      name="machineModel"
                      placeholder="Enter machine model."
                      value={machine.machineModel}
                      onChange={onChangeInput}
                      required
                    />
                  </CFormGroup>
                </CCol>

                <CCol xs="12" md="4">
                  <CFormGroup>
                    Brand
                    <CInput
                      id="brand"
                      name="brand"
                      placeholder="Enter brand."
                      value={machine.brand}
                      onChange={onChangeInput}
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="12" md="4">
                  <CFormGroup>
                    Price
                    <CInput
                      id="price"
                      name="price"
                      placeholder="Enter price."
                      value={machine.price}
                      onChange={onChangeInput}
                      required
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="12" md="4">
                  <CFormGroup>
                    Machine status
                    <CSelect
                      aria-label="Default select example"
                      id="problemStatus"
                      name="problemStatus"
                      onChange={onChangeInput}
                      value={machine.problemStatus}
                      required
                    >
                      <option value="">Select machine status...</option>
                      <option value="fine">Fine</option>
                      <option value="damaged">Damaged</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>
                {activemachine !== "none" && (
                  <CCol xs="12" md="4">
                    <CFormGroup>
                      <CLabel>Branch</CLabel>
                      <CSelect
                        aria-label="Default select example"
                        id="branch"
                        name="branch"
                        onChange={onChangeInput}
                        value={machine.branch}
                        required
                      >
                        <option value="none">Select branch...</option>
                        {allBranchs.map((branch) => (
                          <option value={branch._id} key={branch._id}>
                            {branch.branchName}
                          </option>
                        ))}
                      </CSelect>
                    </CFormGroup>
                  </CCol>
                )}
              </CRow>
            </CModalBody>
            <CModalFooter>
              {activemachine === "none" ? (
                <CButton type="submit" size="sm" color="dark">
                  <CIcon name="cil-save" /> Register machine
                </CButton>
              ) : (
                <CButton size="sm" color="dark" onClick={editmachineDetail}>
                  <CIcon name="cil-pencil" /> Save Changes
                </CButton>
              )}
              <CButton
                size="sm"
                color="danger"
                onClick={() => setShowModal(!showModal)}
              >
                <CIcon name="cil-x" /> Close
              </CButton>
            </CModalFooter>
          </CForm>
        </CModal>

        {/* Saling machine modal */}
        <CModal
          show={showMachineDistributeModal}
          onClose={() => setShowModal(!showMachineDistributeModal)}
        >
          <CModalHeader closeButton>
            <CModalTitle className="text-muted">Distribute-machine</CModalTitle>
          </CModalHeader>
          <CForm onSubmit={distributeMachine}>
            <CModalBody>
              <CRow>
                <CCol md="6">
                  <CFormGroup>
                    Machine Id
                    <CSelect
                      aria-label="Default select example"
                      id="machineId"
                      name="machineId"
                      onChange={onChangeInput}
                      required
                    >
                      <option value={distributingMachineId}>
                        {distributingMachineId}
                      </option>
                    </CSelect>
                  </CFormGroup>
                </CCol>
                <CCol md="6">
                  <CFormGroup>
                    To wich business
                    <CSelect
                      aria-label="Default select example"
                      id="businessId"
                      name="businessId"
                      onChange={onChangeInput}
                      value={machine.businessId}
                      required
                    >
                      <option value="">Select business...</option>
                      {businesses
                        .filter(
                          (bussiness) =>
                            bussiness.credentials === "New" &&
                            bussiness.branch == user.branch
                        )
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
                      If the business is not in the list it may be assigned a
                      mchine or not registered yet!
                    </small>
                  </CFormGroup>
                </CCol>
              </CRow>
            </CModalBody>
            <CModalFooter>
              <CButton type="submit" size="sm" color="dark">
                <CIcon name="cil-control" /> Sale this machine
              </CButton>
              <CButton
                size="sm"
                color="danger"
                onClick={() => {
                  setActivemachine("none");
                  setMachine({ machine, ...machineDetail });
                  setShowMachineDistributeModal(!showMachineDistributeModal);
                }}
              >
                <CIcon name="cil-x" /> Close
              </CButton>
            </CModalFooter>
          </CForm>
        </CModal>

        {/* Machines of new arivals */}
        <CModal
          size="lg"
          show={newArivalsModal}
          onClose={() => setNewArivalsModal(!newArivalsModal)}
        >
          <CModalHeader closeButton>
            <CModalTitle className="text-muted">New arivals</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <NewArivals newArivals={newArivals} />
          </CModalBody>
          <CModalFooter>
            <CButton
              size="sm"
              color="danger"
              onClick={() => {
                setNewArivalsModal(!newArivalsModal);
              }}
            >
              <CIcon name="cil-x" /> Close
            </CButton>
          </CModalFooter>
        </CModal>
      </CCard>
    </>
  );
};

export default MachinesList;
