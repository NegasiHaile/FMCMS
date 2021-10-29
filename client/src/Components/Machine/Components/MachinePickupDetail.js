import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import BadRouting from "../../Utils/routing/BadRouting";

import PdfViewer from "../../Utils/PdfViewer/PdfViewer";
import {
  CButton,
  CCard,
  CCardBody,
  CImg,
  CRow,
  CCol,
  CSelect,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";
function MachinePickupDetail() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [users] = state.UsersAPI.users;
  const [user] = state.UserAPI.User;
  const [machinePikups] = state.MachinePickUpAPI.machinePickups;
  const [pricings] = state.PricingAPI.pricings;
  const [pickup, setPickup] = useState([]);

  const [callbackPickup, setCallbackPickup] = state.MachinePickUpAPI.callback;

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    machinePikups.forEach((pickupItem) => {
      if (pickupItem._id === params.id) {
        return setPickup([pickupItem]);
      }
    });
  }, [params.id, machinePikups]);

  const handleCheckboxValue = (value) => {
    if (value === true) {
      return "YES";
    } else if (value === false) {
      return "NO";
    } else {
      return " ";
    }
  };
  const findUserFullName = (id) => {
    const userDetail = users.filter((user) => user._id === id);
    if (userDetail.length > 0) {
      return (
        userDetail[0].fName +
        " " +
        userDetail[0].mName +
        " " +
        userDetail[0].lName
      );
    } else {
      return "Undifined";
    }
  };
  const findTotalPrice = (infoChange) => {
    var total = 0.0;
    infoChange.forEach((item) => {
      const price = item.price * item.quantity;
      total = total + price;
    });
    return total;
  };
  const findVAT = (infoChange) => {
    const Vat = pricings.filter(
      (price) => price.pricingName.toLowerCase() === "vat"
    );
    return (findTotalPrice(infoChange) * Vat[0].price) / 100;
  };
  const findGTotal = (infoChange) => {
    return (findVAT(infoChange) + findTotalPrice(infoChange) + 0.0).toFixed(1);
  };

  const formatingDate = (stringdate) => {
    return new Date(stringdate).toLocaleString();
  };
  const sweetAlert = (type, text) => {
    Swal.fire({
      title: text,
      position: "center",
      background: "#EBEDEF", // 2EB85C success // E55353 danger // 1E263C sidebar
      icon: type,
      confirmButtonColor: "#3C4B64",
      showConfirmButton: true,
      // timer: 1500,
    });
  };
  const maintenanceProblemSolved = (machineId) => {
    try {
      Swal.fire({
        text: "Are you sure this maintenance is done!",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3C4B64",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Done!",
      }).then(async (result) => {
        try {
          if (result.isConfirmed) {
            const res = await axios.put(`/machine/problem_solved/${machineId}`);
            setCallbackPickup(!callbackPickup);
            sweetAlert("success", res.data.msg);
          }
        } catch (error) {
          sweetAlert("error", error.response.data.msg);
        }
      });
    } catch (error) {}
  };

  return (
    <div style={{ minWidth: "900px", border: "solid 0px #D8DBE0" }}>
      {pickup.length > 0 ? (
        <>
          <CCard className="w-100 border-0">
            <CCardBody>
              <CRow className="mt-3 p-4">
                <CCol className="d-flex justify-content-center" lg="12">
                  <CImg height="60px" src="/logo/fulllogo.png" />
                </CCol>
                <CCol className="col-12 mt-3  border-bottom">
                  <h3 className="text-center text-muted">
                    {user.userRole === "customer-service" &&
                    (pickup[0].status === "delivering" ||
                      pickup[0].status === "completed")
                      ? "MACHINE DELIVERY NOTE"
                      : "Machine receiving note"}
                  </h3>
                </CCol>

                <CCol className="col-12 mt-4 d-flex justify-content-end">
                  <p>
                    <span className="">Date : </span>{" "}
                    <span className="border-bottom">
                      {new Date().toLocaleString()}
                    </span>
                    <br />
                    <span className="">Branch :</span>{" "}
                    <b className="border-bottom"> {pickup[0].branchName}</b>
                  </p>
                </CCol>

                <CCol className="col-12 mt-2">
                  <CRow>
                    <CCol>
                      <h4 className="text-decoration-underline">
                        Customer Detail
                      </h4>
                      <CRow className="mb-2">
                        <CCol className="col-3">
                          <h6>Campany :</h6>
                        </CCol>
                        <CCol className="col-8 border-bottom">
                          <h6>{pickup[0].tradeName}</h6>
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-3">
                          <h6>Owner :</h6>
                        </CCol>
                        <CCol className="col-8 border-bottom">
                          <h6>{pickup[0].companyName}</h6>
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-3">
                          <h6>TIN :</h6>
                        </CCol>
                        <CCol className="col-8 border-bottom">
                          <h6>{pickup[0].TIN}</h6>
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-3">
                          <h6>VAT :</h6>
                        </CCol>
                        <CCol className="col-8 border-bottom">
                          <h6>{pickup[0].VAT}</h6>
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-3">
                          <h6>Tel :</h6>
                        </CCol>
                        <CCol className="col-8 border-bottom">
                          <h6>{pickup[0].telephone}</h6>
                        </CCol>
                      </CRow>
                    </CCol>
                    <CCol>
                      <h4 className="text-decoration-underline">
                        Machine Detail
                      </h4>
                      <CRow className="mb-2">
                        <CCol className="col-3">
                          <h6> Brand : </h6>
                        </CCol>
                        <CCol className="col-8 border-bottom">
                          <h6>{pickup[0].machineBrand}</h6>
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-3">
                          <h6>Model :</h6>
                        </CCol>
                        <CCol className="col-8 border-bottom">
                          <h6>{pickup[0].machineModel}</h6>
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-3">
                          <h6>SER No :</h6>
                        </CCol>
                        <CCol className="col-8 border-bottom">
                          <h6>{pickup[0].serialNumber}</h6>
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-3">
                          <h6>MRC :</h6>
                        </CCol>
                        <CCol className="col-8 border-bottom">
                          <h6>{pickup[0].machineMRC}</h6>
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-3">
                          <h6>SIM :</h6>
                        </CCol>
                        <CCol className="col-8 border-bottom">
                          <h6>{pickup[0].machineSIM}</h6>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CRow>
                </CCol>

                <CCol className="col-12 mt-4">
                  <h4 className="text-center">
                    {" "}
                    Materials collected during receiving
                  </h4>
                  <CRow className="mt-3">
                    <CCol>
                      <CRow className="mb-2">
                        <CCol className="col-8">
                          <h6>Memory Key :</h6>
                        </CCol>
                        <CCol className="col-3 text-center border rounded">
                          {handleCheckboxValue(pickup[0].memoryKey)}
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-8">
                          <h6>Drawer :</h6>
                        </CCol>
                        <CCol className="col-3 text-center border rounded">
                          {handleCheckboxValue(pickup[0].drawer)}
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-8">
                          <h6> Paper :</h6>
                        </CCol>
                        <CCol className="col-3 text-center border rounded">
                          {handleCheckboxValue(pickup[0].paper)}
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-8">
                          <h6> Terminal :</h6>
                        </CCol>
                        <CCol className="col-3 text-center border rounded">
                          {handleCheckboxValue(pickup[0].terminal)}
                        </CCol>
                      </CRow>
                    </CCol>
                    <CCol>
                      <CRow className="mb-2">
                        <CCol className="col-8">
                          <h6>Terminal Adapter :</h6>
                        </CCol>
                        <CCol className="col-3 text-center border rounded">
                          {handleCheckboxValue(pickup[0].terminalAdapte)}
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-8">
                          <h6>Machine :</h6>
                        </CCol>
                        <CCol className="col-3 text-center border rounded">
                          {handleCheckboxValue(pickup[0].machineMaterial)}
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-8">
                          <h6> S. Book Terminal :</h6>
                        </CCol>
                        <CCol className="col-3 text-center border rounded">
                          {handleCheckboxValue(pickup[0].SBookTerminal)}
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-8">
                          <h6> S. Book Machine :</h6>
                        </CCol>
                        <CCol className="col-3 text-center border rounded">
                          {handleCheckboxValue(pickup[0].SbookMachine)}
                        </CCol>
                      </CRow>
                    </CCol>
                    <CCol>
                      <CRow className="mb-2">
                        <CCol className="col-8">
                          <h6> Paper Roller :</h6>
                        </CCol>
                        <CCol className="col-3 text-center border rounded">
                          {handleCheckboxValue(pickup[0].paperRoller)}
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-8">
                          <h6> Paper Cover :</h6>
                        </CCol>
                        <CCol className="col-3 text-center border rounded">
                          {handleCheckboxValue(pickup[0].paperCover)}
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-8">
                          <h6> Machine Adapter :</h6>
                        </CCol>
                        <CCol className="col-3 text-center border rounded">
                          {handleCheckboxValue(pickup[0].machineAdapter)}
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-8">
                          <h6> FD Form :</h6>
                        </CCol>
                        <CCol className="col-3 text-center border rounded">
                          {handleCheckboxValue(pickup[0].FDForm)}
                        </CCol>
                      </CRow>
                    </CCol>
                    <CCol className="col-12 mt-1">
                      <h5> Status Check :</h5>
                      <CRow className="mb-2">
                        <CCol className="col-3 d-flex justify-content-between">
                          <h6>* Seal Number</h6>
                          <p className="text-center border rounded px-4">
                            {handleCheckboxValue(pickup[0].sealNumber)}
                          </p>
                        </CCol>
                        <CCol className="col-3 d-flex justify-content-between">
                          <h6>* MRC OK</h6>
                          <p className="text-center border rounded px-4">
                            {handleCheckboxValue(pickup[0].MRCNumber)}
                          </p>
                        </CCol>
                        <CCol className="d-flex justify-content-between">
                          <h6> Receiving Reason </h6>
                          <CSelect
                            aria-label="Default select example"
                            id="category"
                            name="category"
                            value={pickup[0].category}
                            required
                            disabled
                            style={{
                              border: "0px",
                              borderBottom: "solid 1px #D8DBE0",
                              background: "white",
                              appearance: "none",
                            }}
                          >
                            <option value="">
                              Select machine receiving reason...
                            </option>
                            <option value="annual">Annual Maintenance</option>
                            <option value="incident">
                              Incident Maintenance
                            </option>
                            <option value="information_change">
                              Information Change
                            </option>
                            <option value="withdrawal">
                              Withdrawal Machine
                            </option>
                            <option value="temporarly_store">
                              Temporarly Store
                            </option>
                          </CSelect>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CRow>
                </CCol>
                {pickup[0].category === "annual" && (
                  <CCol className="col-12 mt-4">
                    <CRow className="border rounded mx-1 py-4">
                      <CCol className="col-6">
                        <CRow className="mb-2">
                          <CCol className="col-4">
                            <h6>Current annual service issued date </h6>
                          </CCol>
                          <CCol className="col-8">
                            <input
                              className="w-100 form-control"
                              id="issueDate"
                              name="issueDate"
                              value={pickup[0].issueDate}
                              type="date"
                              required
                              disabled
                              style={{
                                border: "0px",
                                borderBottom: "solid 1px #D8DBE0",
                                background: "white",
                                resize: "none",
                              }}
                            />
                          </CCol>
                        </CRow>
                      </CCol>
                      <CCol className="col-6">
                        <CRow className="mb-2">
                          <CCol className="col-4">
                            <h6>Next annual service issue date: </h6>
                          </CCol>
                          <CCol className="col-8">
                            <input
                              className="w-100 form-control"
                              id="annualNextMaintenanceDate"
                              name="annualNextMaintenanceDate"
                              value={pickup[0].annualNextMaintenanceDate}
                              type="date"
                              required
                              disabled
                              style={{
                                border: "0px",
                                borderBottom: "solid 1px #D8DBE0",
                                background: "white",
                                resize: "none",
                              }}
                            />
                          </CCol>
                        </CRow>
                      </CCol>
                    </CRow>
                  </CCol>
                )}
                {pickup[0].category === "incident" && (
                  <CCol className="col-12 mt-4">
                    <CRow className="border rounded mx-1 py-4">
                      <CCol>
                        <CRow className="mb-2">
                          <CCol className="col-2">
                            <h6>Client reported problems</h6>
                          </CCol>
                          <CCol className="col-10">
                            <textarea
                              className="w-100 form-control"
                              id="clientReportedProblems"
                              name="clientReportedProblems"
                              value={pickup[0].clientReportedProblems}
                              rows="1"
                              required
                              disabled
                              style={{
                                border: "0px",
                                borderBottom: "solid 1px #D8DBE0",
                                background: "white",
                                resize: "none",
                              }}
                            />
                          </CCol>
                        </CRow>
                        <CRow className="mb-2">
                          <CCol className="col-2">
                            <h6>Technician reported problems</h6>
                          </CCol>
                          <CCol className="col-10">
                            <textarea
                              className="w-100 form-control"
                              id="technicianReportedProblems"
                              name="technicianReportedProblems"
                              value={pickup[0].technicianReportedProblems}
                              rows="1"
                              required
                              disabled
                              style={{
                                border: "0px",
                                borderBottom: "solid 1px #D8DBE0",
                                background: "white",
                                resize: "none",
                              }}
                            />
                          </CCol>
                        </CRow>
                      </CCol>
                    </CRow>
                  </CCol>
                )}
                {pickup[0].category === "information_change" && (
                  <CCol className="col-12">
                    {pickup[0].infoChange.length > 0 && (
                      <>
                        {" "}
                        <h5> List of part(s) required</h5>
                        <table className="table table-sm border-bottom-0 border-left-0">
                          <thead>
                            <tr>
                              <th scope="col" className="border">
                                Order
                              </th>
                              <th scope="col" className="border">
                                Description
                              </th>
                              <th scope="col" className="border">
                                Part No
                              </th>
                              <th scope="col" className="border">
                                Item price
                              </th>
                              <th scope="col" className="border">
                                Quantity
                              </th>
                              <th scope="col" className="border text-right">
                                Unit Price
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {pickup[0].infoChange.map((item, index) => (
                              <tr className="border" key={index}>
                                <th scope="row" className="border">
                                  {index + 1}
                                </th>
                                <td className="border">{item.description}</td>
                                <td className="border">{item.partNo}</td>
                                <td className="border">{item.price}</td>
                                <td className="border">{item.quantity}</td>
                                <td className="border text-right">
                                  {item.price * item.quantity}
                                  {" ETB"}
                                </td>
                              </tr>
                            ))}

                            <tr>
                              <th
                                colSpan="5"
                                scope="row"
                                className="text-right border-0"
                              >
                                Labor
                              </th>{" "}
                              <td className="border text-right">
                                0.00{" ETB"}
                              </td>{" "}
                            </tr>
                            <tr>
                              <th colSpan="5" className="text-right border-0">
                                Total
                              </th>{" "}
                              <td className="border text-right">
                                {findTotalPrice(pickup[0].infoChange)} {" ETB"}
                              </td>{" "}
                            </tr>
                            <tr>
                              <th colSpan="5" className="text-right border-0">
                                VAT
                              </th>{" "}
                              <td className="border text-right">
                                {findVAT(pickup[0].infoChange)}
                                {" ETB"}
                              </td>{" "}
                            </tr>
                            <tr>
                              <th colSpan="5" className="text-right border-0">
                                G. Total
                              </th>{" "}
                              <td className="border text-right">
                                {findGTotal(pickup[0].infoChange)}
                                {" ETB"}
                              </td>{" "}
                            </tr>
                          </tbody>
                        </table>
                      </>
                    )}
                  </CCol>
                )}

                {(pickup[0].category === "withdrawal" ||
                  pickup[0].category === "temporarly_store") && (
                  <CCol className="col-12 mt-4">
                    <CRow className="border rounded mx-1 py-4">
                      <CCol>
                        <CRow className="mb-2">
                          <CCol className="col-2">
                            <h6>Machine withdrawal reason </h6>
                          </CCol>
                          <CCol className="col-10">
                            <textarea
                              className="w-100 form-control"
                              id="returnReason"
                              name="returnReason"
                              value={pickup[0].returnReason}
                              rows="1"
                              required
                              disabled
                              style={{
                                border: "0px",
                                borderBottom: "solid 1px #D8DBE0",
                                background: "white",
                                resize: "none",
                              }}
                            />
                          </CCol>
                        </CRow>
                        <CRow className="mb-2">
                          <CCol className="col-2">
                            <h6>Machine Withdrawal status </h6>
                          </CCol>
                          <CCol className="col-10 input-group mb-3">
                            {/* <div className="input-group mb-3"> */}
                            <input
                              className=" form-control"
                              id="returnCertificate"
                              name="returnCertificate"
                              value={
                                pickup[0].status === "controlling_storing"
                                  ? "In machine controller"
                                  : pickup[0].status
                              }
                              rows="1"
                              required
                              disabled
                              style={{
                                border: "0px",
                                borderBottom: "solid 1px #D8DBE0",
                                background: "white",
                                resize: "none",
                              }}
                            />
                            <div className="input-group-append">
                              <CButton
                                color="dark"
                                className="d-print-none input-group-text"
                                onClick={() => {
                                  setShowModal(!showModal);
                                }}
                              >
                                Preview file
                              </CButton>
                            </div>
                            {/* </div> */}
                          </CCol>
                        </CRow>
                      </CCol>
                    </CRow>
                  </CCol>
                )}

                <CCol className="col-12 mt-3">
                  <h4 className="text-decoration-underline">
                    {user.userRole === "customer-service" &&
                    (pickup[0].status === "delivering" ||
                      pickup[0].status === "completed")
                      ? " DELIVERING SUMMERY"
                      : "Receiving Summery"}
                  </h4>
                  <h6 className="border-bottom " style={{ lineHeight: "1.6" }}>
                    This machine with <b> 1000949382773</b> serial number is
                    assigned to the company{" "}
                    <b> Edna Mall privated Limited Company</b> and fiscalized
                    with MRC of <b> CLC10008768 </b>
                    and SIM <b> 0987664321 </b> in{" "}
                    <b> {pickup[0].branchName}</b>, and recieved for{" "}
                    {pickup[0].category}{" "}
                    {pickup[0].category === "annual" ||
                    pickup[0].category === "incident"
                      ? " maintenance "
                      : pickup[0].category === "return"
                      ? " machine "
                      : pickup[0].category === ""
                      ? " _______ "
                      : ""}
                    {user.userRole === "customer-service" &&
                    (pickup[0].status === "delivering" ||
                      pickup[0].status === "completed")
                      ? ", Then delivered to the company contact person"
                      : ""}
                    .
                  </h6>
                </CCol>
                <CCol className="col-12 mt-3">
                  <CRow className="mt-3 border rounded mx-1 py-4">
                    <CCol className="col-12">
                      <h5>Internal Use</h5>
                    </CCol>
                    <CCol className="col-6">
                      <CRow className="mb-2">
                        <CCol className="col-4">
                          <h6>* Received By :</h6>
                        </CCol>
                        <CCol className="col-7 border-bottom">
                          <h6>{findUserFullName(pickup[0].pickedupBy)}</h6>
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-4">
                          <h6>* Signature :</h6>
                        </CCol>
                        <CCol className="col-7 border-bottom"></CCol>
                      </CRow>
                    </CCol>
                    <CCol className="col-6">
                      <CRow className="mb-2">
                        <CCol className="col-4">
                          <h6>* Recieved at :</h6>
                        </CCol>
                        <CCol className="col-6 border-bottom">
                          <h6>{formatingDate(pickup[0].createdAt)}</h6>
                        </CCol>
                      </CRow>
                    </CCol>

                    {(pickup[0].category === "annual" ||
                      pickup[0].category === "incident" ||
                      pickup[0].category === "information_change") && (
                      <CCol className="col-6 mt-4">
                        <CRow className="mb-2">
                          <CCol className="col-4">
                            <h6>* Technician :</h6>
                          </CCol>
                          <CCol className="col-7 border-bottom">
                            <h6>{findUserFullName(pickup[0].technician)}</h6>
                          </CCol>
                        </CRow>
                        <CRow className="mb-2">
                          <CCol className="col-4">
                            <h6>* Signature :</h6>
                          </CCol>
                          <CCol className="col-7 border-bottom"></CCol>
                        </CRow>
                      </CCol>
                    )}
                    {pickup[0].category === "temporarly_store" && (
                      <CCol className="col-6 mt-4">
                        <CRow className="mb-2">
                          <CCol className="col-4">
                            <h6> Stored At :</h6>
                          </CCol>
                          <CCol className="col-7 border-bottom">
                            <h6>{formatingDate(pickup[0].createdAt)}</h6>
                          </CCol>
                        </CRow>
                        {(pickup[0].status === "delivering" ||
                          pickup[0].status === "completed") && (
                          <CRow className="mb-2">
                            <CCol className="col-4">
                              <h6> Dispatched at :</h6>
                            </CCol>
                            <CCol className="col-7 border-bottom">
                              <h6>{new Date().toLocaleString()}</h6>
                            </CCol>
                          </CRow>
                        )}
                      </CCol>
                    )}
                    {user.userRole === "customer-service" && (
                      <CCol className="col-6 mt-4">
                        <CRow className="mb-2">
                          <CCol className="col-4">
                            <h6>* Delivered by :</h6>
                          </CCol>
                          <CCol className="col-7 border-bottom">
                            <h6> </h6>
                          </CCol>
                        </CRow>
                        <CRow className="mb-2">
                          <CCol className="col-4">
                            <h6>* Signature :</h6>
                          </CCol>
                          <CCol className="col-7 border-bottom"></CCol>
                        </CRow>
                      </CCol>
                    )}
                  </CRow>

                  <CRow className="mt-4 border rounded mx-1 py-4">
                    <CCol className="col-7">
                      <CRow className="mb-2">
                        <CCol className="col-4">
                          <h6>* Contact Person :</h6>
                        </CCol>
                        <CCol className="col-7 border-bottom">
                          <h6> </h6>
                        </CCol>
                      </CRow>
                    </CCol>
                    <CCol>
                      <CRow className="mb-2">
                        <CCol className="col-4">
                          <h6>* Signiture :</h6>
                        </CCol>
                        <CCol className="col-7 border-bottom"></CCol>
                      </CRow>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
              {pickup[0].machineProblemStatus === "maintaining" &&
                pickup[0].technician === user._id && (
                  <CCol className="col-12 d-flex justify-content-end d-print-none">
                    <CButton
                      className="mr-2"
                      size="sm"
                      color="dark"
                      onClick={() =>
                        maintenanceProblemSolved(pickup[0].machineId)
                      }
                    >
                      <CIcon name="cil-memory"></CIcon> Problem Solved!
                    </CButton>
                  </CCol>
                )}
            </CCardBody>

            <CModal
              size="lg"
              show={showModal}
              onClose={() => setShowModal(!showModal)}
              className="d-print-none"
            >
              <CModalHeader closeButton>
                <CModalTitle>Withdrawal certificate preview</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <PdfViewer thePdfFile={pickup[0].returnCertificate} />
              </CModalBody>
              <CModalFooter>
                <CButton
                  size="sm"
                  color="danger"
                  onClick={() => setShowModal(!showModal)}
                >
                  <CIcon name="cil-x" /> Close
                </CButton>
              </CModalFooter>
            </CModal>
          </CCard>
        </>
      ) : (
        <div className="mt-3">
          <BadRouting text="Bad routing, Please go back to maintenance list page and click the detail button of you need to see it's detail!" />
        </div>
      )}
    </div>
  );
}
function MachinePickupOperations() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [machinePikups] = state.MachinePickUpAPI.machinePickups;
  const [callbackPickup, setCallbackPickup] = state.MachinePickUpAPI.callback;
  const [callbackMachine, setCallbackMachine] = state.MachineAPI.callback;
  const [callbackSIMCard, setCallbackSIMCard] = state.SIMCardAPI.callback;
  const [pickup, setPickup] = useState([]);

  useEffect(() => {
    machinePikups.forEach((pickupItem) => {
      if (pickupItem._id === params.id) {
        return setPickup([pickupItem]);
      }
    });
  }, [params.id, machinePikups]);
  // console.log(pickup)
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
  const onSubmitMaintenanceProcessing = async (
    _id,
    machineId,
    category,
    request,
    simCard
  ) => {
    try {
      Swal.fire({
        text: "Are you sure you want to request this for " + request + "!",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3C4B64",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, request it!",
      }).then(async (result) => {
        try {
          if (result.isConfirmed) {
            const res = await axios.put(`/pickup/maintenance_processing`, {
              _id,
              machineId,
              category,
              request,
              simCard,
            });
            setCallbackPickup(!callbackPickup);
            setCallbackMachine(!callbackMachine);
            setCallbackSIMCard(!callbackSIMCard);
            sweetAlert("success", res.data.msg);
          }
        } catch (error) {
          sweetAlert("error", error.response.data.msg);
        }
      });
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };
  return (
    <>
      {" "}
      {pickup.length > 0 && (
        <>
          {(pickup[0].category === "annual" ||
            pickup[0].category === "incident" ||
            pickup[0].category === "information_change") && (
            <>
              {user.userRole === "technician" && pickup[0].status === "New" && (
                <CButton
                  className="mr-2"
                  size="sm"
                  color="dark"
                  onClick={() =>
                    onSubmitMaintenanceProcessing(
                      pickup[0]._id,
                      pickup[0].machineId,
                      pickup[0].category,
                      "controlling_maintenance"
                    )
                  }
                >
                  <CIcon name="cil-memory"></CIcon> Request to
                  machine-controller!
                </CButton>
              )}
              {user.userRole === "machine-controller" &&
                pickup[0].status === "controlling_maintenance" && (
                  <CButton
                    className="mr-2"
                    size="sm"
                    color="danger"
                    onClick={() =>
                      onSubmitMaintenanceProcessing(
                        pickup[0]._id,
                        pickup[0].machineId,
                        pickup[0].category,
                        "maintaining"
                      )
                    }
                  >
                    <CIcon name="cil-memory"></CIcon> Request for maintenance!
                  </CButton>
                )}

              {pickup[0].status === "maintaining" &&
                pickup[0].technician === user._id && (
                  <CButton
                    className="mr-2"
                    size="sm"
                    color="success"
                    onClick={() =>
                      onSubmitMaintenanceProcessing(
                        pickup[0]._id,
                        pickup[0].machineId,
                        pickup[0].category,
                        "controlling_delivery"
                      )
                    }
                  >
                    <CIcon name="cil-memory"></CIcon> Request back to
                    controller!
                  </CButton>
                )}
            </>
          )}

          {(pickup[0].category === "withdrawal" ||
            pickup[0].category === "temporarly_store") && (
            <>
              {user.userRole === "technician" && pickup[0].status === "New" && (
                <CButton
                  className="mr-2"
                  size="sm"
                  color="dark"
                  onClick={() =>
                    onSubmitMaintenanceProcessing(
                      pickup[0]._id,
                      pickup[0].machineId,
                      pickup[0].category,
                      "controlling_storing"
                    )
                  }
                >
                  <CIcon name="cil-memory"></CIcon> Request to
                  machine-controller!
                </CButton>
              )}
              {user.userRole === "machine-controller" &&
                pickup[0].status === "controlling_storing" && (
                  <CButton
                    className="mr-2"
                    size="sm"
                    color="warning"
                    onClick={() =>
                      onSubmitMaintenanceProcessing(
                        pickup[0]._id,
                        pickup[0].machineId,
                        pickup[0].category,
                        "storing"
                      )
                    }
                  >
                    <CIcon name="cil-memory"></CIcon> Request to branch-store!
                  </CButton>
                )}
              {user.userRole === "branch-store" &&
                pickup[0].status === "storing" && (
                  <CButton
                    className="mr-2"
                    size="sm"
                    color="danger"
                    onClick={() =>
                      onSubmitMaintenanceProcessing(
                        pickup[0]._id,
                        pickup[0].machineId,
                        pickup[0].category,
                        "stored",
                        pickup[0].machineSIM
                      )
                    }
                  >
                    <CIcon name="cil-memory"></CIcon> Approve storing!
                  </CButton>
                )}
              {user.userRole === "branch-store" &&
                pickup[0].status === "stored" &&
                pickup[0].category === "temporarly_store" && (
                  <CButton
                    className="mr-2"
                    size="sm"
                    color="info"
                    onClick={() =>
                      onSubmitMaintenanceProcessing(
                        pickup[0]._id,
                        pickup[0].machineId,
                        pickup[0].category,
                        "controlling_delivery"
                      )
                    }
                  >
                    <CIcon name="cil-memory"></CIcon> Request back to
                    controller!
                  </CButton>
                )}
            </>
          )}

          {user.userRole === "machine-controller" &&
            pickup[0].status === "controlling_delivery" && (
              <CButton
                className="mr-2"
                size="sm"
                color="danger"
                onClick={() =>
                  onSubmitMaintenanceProcessing(
                    pickup[0]._id,
                    pickup[0].machineId,
                    pickup[0].category,
                    "delivering"
                  )
                }
              >
                <CIcon name="cil-memory"></CIcon> Request for delivery!
              </CButton>
            )}
          {user.userRole === "customer-service" &&
            pickup[0].status === "delivering" && (
              <CButton
                className="mr-2"
                size="sm"
                color="warning"
                onClick={() =>
                  onSubmitMaintenanceProcessing(
                    pickup[0]._id,
                    pickup[0].machineId,
                    pickup[0].category,
                    "completed"
                  )
                }
              >
                <CIcon name="cil-memory"></CIcon> Complete delivery?
              </CButton>
            )}
        </>
      )}{" "}
    </>
  );
}
export { MachinePickupDetail, MachinePickupOperations };
