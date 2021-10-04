import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import BadRouting from "../../Utils/routing/BadRouting";
import {
  CButton,
  CCard,
  CCardBody,
  CImg,
  CRow,
  CCol,
  CLabel,
  CLink,
  CForm,
  CFormGroup,
  CSelect,
  CTooltip,
  CInput,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";
function MachinePickupDetail() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [machinePikups] = state.MachinePickUpAPI.machinePickups;
  const [pickup, setPickup] = useState([]);

  useEffect(() => {
    machinePikups.forEach((pickupItem) => {
      if (pickupItem._id === params.id) {
        return setPickup([pickupItem]);
      }
    });
  }, [params.id, machinePikups]);

  // console.log("Outside useEffect :" + JSON.stringify(pickup));
  // console.log("Outside length :" + pickup.lenght);

  // console.log("pickup id :" + params.id);
  const handleCheckboxValue = (value) => {
    if (value === true) {
      return "YES";
    } else if (value === false) {
      return "NO";
    } else {
      return " ";
    }
  };
  const formatingDate = (stringdate) => {
    return new Date(stringdate).toLocaleString();
  };

  return (
    <div style={{ minWidth: "900px", border: "solid 0px #D8DBE0" }}>
      {pickup.length > 0 ? (
        <CCard className="mt-4 w-100 border-0">
          <CCardBody>
            <CRow>
              <CCol className="d-flex justify-content-center" lg="12">
                <CImg height="60px" src="/logo/fulllogo.png" />
              </CCol>
              <CCol className="col-12 mt-4  border-bottom">
                <h2 className="text-center text-muted bold">
                  Machine pickup detail
                </h2>
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
                  Machine materials checkup during pickup
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
                        <h6>* Pickup Reason </h6>
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
                            Select machine pickup reason...
                          </option>
                          <option value="annual">Annual Maintenance</option>
                          <option value="incident">Incident Maintenance</option>
                          <option value="information_change">
                            Information Change
                          </option>
                          <option value="withdrawal">Withdrawal Machine</option>
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
                            <td className="border text-right">610.88</td>{" "}
                          </tr>
                          <tr>
                            <th colSpan="5" className="text-right border-0">
                              Total
                            </th>{" "}
                            <td className="border text-right">42.76</td>{" "}
                          </tr>
                          <tr>
                            <th colSpan="5" className="text-right border-0">
                              VAT
                            </th>{" "}
                            <td className="border text-right">42.76</td>{" "}
                          </tr>
                          <tr>
                            <th colSpan="5" className="text-right border-0">
                              G. Total
                            </th>{" "}
                            <td className="border text-right">42.76</td>{" "}
                          </tr>
                        </tbody>
                      </table>
                    </>
                  )}
                </CCol>
              )}

              {pickup[0].category === "temporarly_store" && (
                <CCol className="col-12 mt-4">
                  <CRow className="border rounded mx-1 py-4">
                    <CCol className="col-6">
                      <CRow className="mb-2">
                        <CCol className="col-4">
                          <h6>Time duration of temporarily store </h6>
                        </CCol>
                        <CCol className="col-8">
                          <input
                            className="w-100 form-control"
                            id="waitingDuration"
                            name="waitingDuration"
                            value={pickup[0].waitingDuration}
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
                          <h6>Temporarly store cost per month(ETB) </h6>
                        </CCol>
                        <CCol className="col-8">
                          <input
                            className="w-100 form-control"
                            type="number"
                            id="waitingCostPerMonth"
                            name="waitingCostPerMonth"
                            value={pickup[0].waitingCostPerMonth}
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

              {pickup[0].category === "withdrawal" && (
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
                          <h6>Withdrawal reason cetificate </h6>
                        </CCol>
                        <CCol className="col-10">
                          <input
                            className="w-100 form-control"
                            id="returnCertificate"
                            name="returnCertificate"
                            value={pickup[0].status}
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

              <CCol className="col-12 mt-3">
                <h4 className="text-decoration-underline">Pickup Summery</h4>
                <h6 className="border-bottom " style={{ lineHeight: "1.6" }}>
                  The machine with <b> 1000949382773</b> serial number is
                  assigned to the company{" "}
                  <b> Edna Mall privated Limited Company</b> and fiscalized with
                  MRC of <b> CLC10008768 </b>
                  and SIM <b> 0987664321 </b> in <b> {pickup[0].branchName}</b>,
                  and picked up for {pickup[0].category}{" "}
                  {pickup[0].category === "annual" ||
                  pickup[0].category === "incident"
                    ? " maintenance "
                    : pickup[0].category === "return"
                    ? " machine "
                    : pickup[0].category === ""
                    ? " _______ "
                    : ""}
                  .
                </h6>
              </CCol>
              <CCol className="col-12 mt-3">
                <CRow className="mt-3 border rounded mx-1 py-4">
                  <CCol className="col-12">
                    <h5>Internal Use</h5>
                  </CCol>
                  <CCol className="col-7">
                    <CRow className="mb-2">
                      <CCol className="col-4">
                        <h6>* Pickup By :</h6>
                      </CCol>
                      <CCol className="col-7 border-bottom">
                        <h6>{pickup[0].pickedupBy}</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-4">
                        <h6>* Signature :</h6>
                      </CCol>
                      <CCol className="col-7 border-bottom"></CCol>
                    </CRow>
                  </CCol>
                  <CCol className="col-5">
                    <CRow className="mb-2">
                      <CCol className="col-5">
                        <h6>* Pickup Date :</h6>
                      </CCol>
                      <CCol className="col-6 border-bottom">
                        <h6>{formatingDate(pickup[0].createdAt)}</h6>
                      </CCol>
                    </CRow>
                  </CCol>

                  <CCol className="col-7 mt-4">
                    <CRow className="mb-2">
                      <CCol className="col-4">
                        <h6>* Technician :</h6>
                      </CCol>
                      <CCol className="col-7 border-bottom">
                        <h6></h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-4">
                        <h6>* Signature :</h6>
                      </CCol>
                      <CCol className="col-7 border-bottom"></CCol>
                    </CRow>
                  </CCol>
                  <CCol className="col-5 mt-4">
                    <CRow className="mb-2">
                      <CCol className="col-5">
                        <h6>* Technical date :</h6>
                      </CCol>
                      <CCol className="col-6 border-bottom">
                        <h6> </h6>
                      </CCol>
                    </CRow>
                  </CCol>

                  <CCol className="col-7 mt-4">
                    <CRow className="mb-2">
                      <CCol className="col-4">
                        <h6>* Confirmed by :</h6>
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
                  <CCol className="col-5 mt-4">
                    <CRow className="mb-2">
                      <CCol className="col-5">
                        <h6>* Confirmed date :</h6>
                      </CCol>
                      <CCol className="col-6 border-bottom">
                        <h6> </h6>
                      </CCol>
                    </CRow>
                  </CCol>
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
          </CCardBody>
        </CCard>
      ) : (
        <div className="mt-3">
          <BadRouting text="Bad routing, go back to the machine pickup list and come with correct route!" />
        </div>
      )}
    </div>
  );
}

export default MachinePickupDetail;
