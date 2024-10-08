import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import { useParams } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";

import BadRouting from "../Utils/routing/BadRouting";
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
  CForm,
  CFormGroup,
  CLabel,
  CTextarea,
  CSelect,
} from "@coreui/react";

import { Viewer } from "@react-pdf-viewer/core"; // install this library
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"; // install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
import { Worker } from "@react-pdf-viewer/core"; // install this library

import BusinessMachines from "./components/BusinessMachines";
import { getConfig } from "../../config";

function BusinessDetail() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const state = useContext(GlobalState);
  const { apiUrl } = getConfig();
  const params = useParams();
  const [user] = state.UserAPI.User;
  const [businesses] = state.BusinessAPI.businesses;
  const [business, setBusiness] = useState("");
  const [branchs] = state.branchAPI.branchs;
  const users = state.UsersAPI.users;
  const [allSales] = state.SalesAPI.Sales;
  const [newSales, setNewSales] = useState([]);
  const [callback, setCallback] = state.MachineAPI.callback;
  const [callbackBusiness, setCallbackBusiness] = state.BusinessAPI.callback;
  const [callbackSales, setCallbackSales] = state.SalesAPI.callback;
  const [allMachines] = state.MachineAPI.machines;
  // const [ownerId, setOwnerId] = useState("");

  const [showRejectBusinessModal, setShowRejectBusinessModal] = useState(false);
  const [notification, setNotification] = useState({
    senderId: user._id,
    receiverId: "",
    subject: "Rejection",
    theMessage: "",
  });

  const [showAssigneMachineModal, setShowAssigneMachineModal] = useState(false);
  const [assigneMachine, setAssigneMachine] = useState({
    branchId: user.branch,
    businessId: params.id,
    machineId: "",
    status: "New",
  });

  useEffect(() => {
    var bsns = businesses.filter(
      (filteredBusiness) => filteredBusiness._id === params.id
    );
    if (bsns.length > 0) {
      setBusiness(bsns[0]);
      setNotification({
        senderId: user._id,
        receiverId: bsns[0].ownerID,
        subject: "Rejection",
        theMessage: "",
      });
      // console.log(bsnsSales);
      setNewSales(
        allSales.filter(
          (filteredSale) =>
            filteredSale.businessId === params.id &&
            filteredSale.status === "New"
        )
      );
    } else {
      setBusiness("");
      setNewSales([]);
    }
  }, [businesses, allSales, params.id]);

  const SweetAlert = (type, text) => {
    Swal.fire({
      position: "center",
      background: "#EBEDEF", // 2EB85C success // E55353 danger // 1E263C sidebar
      icon: type,
      text: text,
      confirmButtonColor: "#1E263C",
      showConfirmButton: false,
      // timer: 1500,
    });
  };
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNotification({ ...notification, [name]: value });
  };
  const AccepteBusinessCredentials = (businessId) => {
    try {
      Swal.fire({
        title: "Accepte?",
        text: "Is the overall document is valid and you can assign it a machine!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1E263C",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Accepte it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.put(
            `${apiUrl}/business/accepte/${businessId}`
          );
          setCallbackBusiness(!callbackBusiness);
          Swal.fire("Accepted!", res.data.msg, "success");
        }
      });
    } catch (error) {
      SweetAlert("error", error.response.data.msg);
    }
  };
  const rejectBusinessCredentails = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${apiUrl}/business/reject/${business._id}`, {
        ...notification,
      });
      setCallbackBusiness(!callbackBusiness);
      setShowRejectBusinessModal(!showRejectBusinessModal);
      SweetAlert("success", res.data.msg);
    } catch (error) {
      SweetAlert("error", error.response.data.msg);
    }
  };
  const onSubmitAssigneMachine = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/machine/distribute`, {
        ...assigneMachine,
      });
      setCallback(!callback);
      setCallbackBusiness(!callbackBusiness);
      setCallbackSales(!callbackSales);
      SweetAlert("success", res.data.msg);
    } catch (error) {
      SweetAlert("error", error.response.data.msg);
    }
  };
  const onSubmitRequestForApproval = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        // title: "Accepte?",
        text: "Are you sure you want to request this transaction for approval!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1E263C",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Request it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await axios.put(
              `${apiUrl}/sales/request_for_approval/${params.id}`
            );
            setCallback(!callback);
            setCallbackBusiness(!callbackBusiness);
            setCallbackSales(!callbackSales);
            Swal.fire("Sent!", res.data.msg, "success");
          } catch (error) {
            SweetAlert("error", error.response.data.msg);
          }
        }
      });
    } catch (error) {
      SweetAlert("error", error.response.data.msg);
    }
  };

  return (
    <>
      {business ? (
        <CCard>
          <CCardBody>
            <CRow className="mb-2">
              <CCol sm="12" md="3" className="d-flex justify-content-center">
                <CImg
                  className="shadow-sm "
                  height="172"
                  src="/Others/bsnsIcon1.png"
                  alt="Business Img"
                />
              </CCol>
              <CCol sm="12" md="9">
                <CRow>
                  <CCol lg="12" className="mt-1 border-bottom">
                    <h6></h6>
                    <p>
                      <strong> * Trade Name:</strong> {business.tradeName}
                    </p>
                    <p>
                      <strong> * Company Name:</strong> {business.companyName}
                    </p>
                  </CCol>

                  <CCol sm="12" md="6" className="mt-1 border-bottom">
                    <h6></h6>
                    <p className="d-flex justify-content-between">
                      <strong> * TIN:</strong> {business.TIN}
                    </p>
                    <p className="d-flex justify-content-between">
                      <strong> * VAT:</strong> {business.VAT}
                    </p>
                  </CCol>
                  <CCol sm="12" md="6" className="mt-1 border-bottom">
                    <h6></h6>
                    <p className="d-flex justify-content-between">
                      <strong> * Machine:</strong> {business.machine}
                    </p>
                    <p className="d-flex justify-content-between">
                      <strong> * Credentials:</strong> {business.credentials}
                    </p>
                    {user.userRole === "branch-admin" && (
                      <>
                        {" "}
                        {business.credentials === "Pending" && (
                          <span className="d-flex justify-content-between">
                            <CButton
                              color="dark"
                              size="sm"
                              className="mr-1 w-50"
                              onClick={() => {
                                AccepteBusinessCredentials(business._id);
                              }}
                            >
                              <CIcon name="cil-check-circle" /> Accept
                            </CButton>
                            <CButton
                              onClick={() => {
                                setShowRejectBusinessModal(
                                  !showRejectBusinessModal
                                );
                              }}
                              color="danger"
                              size="sm"
                              className="ml-1 w-50"
                            >
                              <CIcon name="cil-x" /> Reject
                            </CButton>
                          </span>
                        )}
                      </>
                    )}
                    {newSales.length > 0 && user.userRole === "sales" && (
                      <span className="d-flex justify-content-between">
                        <CButton
                          color="success"
                          size="sm"
                          className="mr-1 w-100"
                          onClick={onSubmitRequestForApproval}
                        >
                          <CIcon name="cil-check-circle" /> Request for approval
                        </CButton>
                      </span>
                    )}
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
            <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-location-pin"></CIcon> Address
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-spreadsheet"></CIcon> Document
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-options"></CIcon> References
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-print"></CIcon> Machines
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CTabContent className="my-3">
                <CTabPane>
                  <CRow>
                    <CCol sm="12" md="6" lg="5" className="mt-1">
                      <h6>Business Address</h6>
                      <hr></hr>
                      <span className="d-flex justify-content-between">
                        <strong>City:</strong> {business.city}
                      </span>
                      <span className="d-flex justify-content-between">
                        <strong>Sub City:</strong> {business.subCity}
                      </span>
                      <span className="d-flex justify-content-between">
                        <strong>Kebele:</strong> {business.kebele}
                      </span>
                      <span className="d-flex justify-content-between">
                        <strong>Woreda:</strong> {business.woreda}
                      </span>
                      <span className="d-flex justify-content-between">
                        <strong>Building Name:</strong> {business.buildingName}
                      </span>
                      <span className="d-flex justify-content-between">
                        <strong>Office Number:</strong> {business.officeNumber}
                      </span>
                    </CCol>
                    <CCol sm="6" md="6" lg="5" className="mt-1">
                      <h6>Business Contacts</h6>
                      <hr></hr>{" "}
                      <span className="d-flex justify-content-between">
                        <strong>Telephone:</strong>
                        {business.telephone}
                      </span>
                      <span className="d-flex justify-content-between">
                        <strong>Email:</strong> {business.email}
                      </span>
                      <span className="d-flex justify-content-between">
                        <strong>Fax:</strong> {business.fax}
                      </span>
                    </CCol>
                  </CRow>
                </CTabPane>

                <CTabPane>
                  <div className="pdf-container">
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
                      <Viewer
                        fileUrl={business.TL_Image}
                        plugins={[defaultLayoutPluginInstance]}
                      />
                    </Worker>
                  </div>
                  {/* <CImg
                  className="w-100"
                  src={business.TL_Image}
                  alt={business.businessName}
                /> */}
                </CTabPane>
                <CTabPane>
                  <CRow>
                    <CCol sm="12" md="4" lg="4" className="mt-1">
                      <h6 className="text-muted">Business Owner</h6>
                      <hr></hr>
                      {users
                        .filter(
                          (filteredUser) =>
                            filteredUser._id === business.ownerID
                        )
                        .map((owner) => (
                          <div key={owner._id}>
                            <span className="d-flex justify-content-between">
                              <strong>Owner name:</strong>{" "}
                              <CLink to={`/client/detail/${owner._id}`}>
                                {owner.fName} {owner.mName}
                              </CLink>
                            </span>
                            <span className="d-flex justify-content-between">
                              <strong>Phone:</strong> {owner.phoneNumber}
                            </span>
                            <span className="d-flex justify-content-between">
                              <strong>email:</strong> {owner.email}
                            </span>
                            <span className="d-flex justify-content-between">
                              <strong>Account Status:</strong> {owner.status}
                            </span>
                          </div>
                        ))}
                    </CCol>
                    <CCol sm="12" md="4" lg="4" className="mt-1">
                      <h6 className="text-muted">Servicing Branch</h6>
                      <hr></hr>
                      {branchs
                        .filter(
                          (filteredBranch) =>
                            filteredBranch._id === business.branch
                        )
                        .map((branch) => (
                          <div key={branch._id}>
                            <span className="d-flex justify-content-between">
                              <strong>Branch Name:</strong> {branch.branchName}
                            </span>
                            <span className="d-flex justify-content-between">
                              <strong>City:</strong> {branch.city}
                            </span>
                            <span className="d-flex justify-content-between">
                              <strong>Telephone:</strong> {branch.telephone}
                            </span>
                            <span className="d-flex justify-content-between">
                              <strong>Email:</strong> {branch.email}
                            </span>
                          </div>
                        ))}
                    </CCol>
                  </CRow>
                </CTabPane>
                <CTabPane>
                  <CRow>
                    <CCol sm="12" md="8" lg="10" className="mt-1">
                      <h6 className="text-muted">Machine Detail</h6>
                      <hr></hr>
                      {business.machine === "unassigned" ? (
                        <span className="d-flex justify-content-between">
                          <strong>Machine:</strong> {business.machine}
                        </span>
                      ) : (
                        <BusinessMachines businessId={business._id} />
                      )}
                    </CCol>
                    {user.userRole === "sales" && (
                      <CCol sm="12" md="4" lg="2" className="mt-1">
                        <CButton
                          onClick={() => {
                            setShowAssigneMachineModal(
                              !showAssigneMachineModal
                            );
                          }}
                          color="dark"
                          size="sm"
                          className="w-100"
                        >
                          Add Machine
                        </CButton>
                      </CCol>
                    )}
                  </CRow>
                </CTabPane>
              </CTabContent>
            </CTabs>
          </CCardBody>

          {/* Reject business Request modal */}
          <CModal
            show={showRejectBusinessModal}
            onClose={() => setShowRejectBusinessModal(!showRejectBusinessModal)}
          >
            <CModalBody>
              <CForm onSubmit={rejectBusinessCredentails}>
                <CCol>
                  <CLabel htmlFor="textarea-input">Your message</CLabel>
                  <CTextarea
                    id="theMessage"
                    name="theMessage"
                    onChange={onChangeInput}
                    rows="4"
                    placeholder="Write something why you are rejecting this request..."
                    required
                  />
                </CCol>
                <CCol className="d-flex justify-content-between pt-2">
                  <CButton
                    type="submit"
                    size="sm"
                    variant="outline"
                    color="dark"
                  >
                    <CIcon name="cil-check-circle" /> confirm Rejection
                  </CButton>
                  <CButton
                    size="sm"
                    variant="outline"
                    color="danger"
                    onClick={() =>
                      setShowRejectBusinessModal(!showRejectBusinessModal)
                    }
                  >
                    <CIcon name="cil-x" /> Close
                  </CButton>
                </CCol>
              </CForm>
            </CModalBody>
          </CModal>

          {/* Assigne a machine to a business */}
          <CModal
            show={showAssigneMachineModal}
            onClose={() => setShowAssigneMachineModal(!showAssigneMachineModal)}
          >
            <CForm onSubmit={onSubmitAssigneMachine} className="m-2">
              <CCol>
                <CFormGroup>
                  <CLabel>Machine you want to assigne to this business</CLabel>
                  <CSelect
                    aria-label="Default select example"
                    id="machineId"
                    value={assigneMachine.machineId}
                    onChange={(event) => {
                      setAssigneMachine({
                        ...assigneMachine,
                        machineId: event.target.value,
                      });
                    }}
                    required
                  >
                    <option value="">Select machine ...</option>
                    {allMachines
                      .filter(
                        (filteredMachine) =>
                          filteredMachine.salesStatus === "unsold" &&
                          filteredMachine.availableIn === "branch-store" &&
                          filteredMachine.branch == user.branch
                      )
                      .map((thisMachine) => (
                        <option value={thisMachine._id} key={thisMachine._id}>
                          SER NO: {thisMachine.serialNumber} - Brand:{" "}
                          {thisMachine.brand}
                        </option>
                      ))}
                  </CSelect>
                </CFormGroup>
              </CCol>
              <CCol className="d-flex justify-content-between mt-1">
                <CButton type="submit" size="sm" variant="outline" color="dark">
                  <CIcon name="cil-check-circle" /> Done!
                </CButton>
                <CButton
                  size="sm"
                  variant="outline"
                  color="danger"
                  onClick={() =>
                    setShowAssigneMachineModal(!showAssigneMachineModal)
                  }
                >
                  <CIcon name="cil-x" /> Close
                </CButton>
              </CCol>
            </CForm>
          </CModal>
        </CCard>
      ) : (
        <BadRouting text="Bad routing! Please go back to businesses list page and click the detail button of you need to see it's detail!'" />
      )}
    </>
  );
}

export default BusinessDetail;
