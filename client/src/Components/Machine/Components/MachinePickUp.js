import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";
import BadRouting from "../../Utils/routing/BadRouting";
import {
  CForm,
  CButton,
  CCard,
  CCardBody,
  CImg,
  CRow,
  CCol,
  CSelect,
  CFormGroup,
  CInput,
  CLink,
  CTooltip,
} from "@coreui/react";
import { getConfig } from "../../../config";
function MachinePickUp({ user, salesDetail, pickupType, pickupId }) {
  const pickupDetail = {
    branchId: user.branch,
    salesId: salesDetail.saleId,
    businessId: salesDetail.businessId,
    machineId: salesDetail.machineId,
    memoryKey: false,
    drawer: false,
    paper: false,
    terminal: false,
    terminalAdapte: false,
    machineMaterial: false,
    SBookTerminal: false,
    SbookMachine: false,
    paperRoller: false,
    paperCover: false,
    machineAdapter: false,
    FDForm: false,
    sealNumber: false,
    MRCNumber: false,
    category: "",
    subCategory: "",
    clientReportedProblems: "",
    technicianReportedProblems: "",
    infoChange: [],
    issueDate: new Date(),
    annualNextMaintenanceDate: "",
    pickedupBy: user._id,
    technician: "",
  };
  const InfoChangeItemFields = {
    description: "",
    partNo: "",
    price: 1,
    quantity: 1,
    unitPrice: 0.0,
  };

  const state = useContext(GlobalState);
  const { apiUrl } = getConfig();
  const [maintenances] = state.MachinePickUpAPI.machinePickups;
  const [pricings] = state.PricingAPI.pricings;
  const [onEdit, setOnEdit] = useState(false);
  const [pickup, setPickup] = useState(pickupDetail);
  const [incompletePickups, setIncompletePickups] = useState([]);
  const [infoChangeItem, setInfoChangeItem] = useState(InfoChangeItemFields);
  const [callbackMachinePickup, setCallbackMachinePickup] =
    state.MachinePickUpAPI.callback;
  const [allUsers] = state.UsersAPI.users;

  useEffect(() => {
    var curr = new Date();
    // curr.setDate(curr.getDate());
    var date = curr.toISOString().substr(0, 10);
    pickup.issueDate = date;
  }, [pickupId]);
  useEffect(() => {
    const newDate = new Date(pickup.issueDate);
    // const date = newDate.getDate();
    // const month = newDate.getMonth() + 1;
    // const year = newDate.getFullYear();
    newDate.setFullYear(newDate.getFullYear() + 1);
    pickup.annualNextMaintenanceDate = newDate.toISOString().substring(0, 10);
  }, [pickupId, pickup.issueDate]);
  useEffect(() => {
    if (pickupId != "undefined") {
      maintenances.forEach((pickupItem) => {
        if (pickupItem._id === pickupId) {
          setPickup(pickupItem);
          setOnEdit(true);
        }
      });
      setIncompletePickups(
        maintenances.filter(
          (pickup) =>
            pickup.machineId === salesDetail.machineId &&
            pickup.status != "completed"
        )
      );

      // console.log("Length : " + incompletePickups.length);
    } else {
      setOnEdit(false);
      setPickup(pickupDetail);
    }
  }, [pickupId, maintenances]);

  // console.log("Length out : " + incompletePickups.length);
  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    if (value === "false" || value === false) {
      setPickup({ ...pickup, [name]: true });
    } else if (value === "true" || value === true) {
      setPickup({ ...pickup, [name]: false });
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPickup({ ...pickup, [name]: value });
    // console.log(pickup);
  };
  const handleInfoChangeItem = (e) => {
    const { name, value } = e.target;
    setInfoChangeItem({ ...infoChangeItem, [name]: value });
    // console.log(infoChangeItem);
  };
  const pushInfoChangeitem = () => {
    pickup.infoChange.unshift(infoChangeItem);
    // pickup.infoChange.push(infoChangeItem);
    setInfoChangeItem(pickup);
    setInfoChangeItem(InfoChangeItemFields);
    // console.log(pickup);
  };
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

  const onSubmitSavePickupDetail = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(`${apiUrl}/pickup/edit/${pickupId}`, {
          ...pickup,
        });
        sweetAlert("success", res.data.msg);
        setCallbackMachinePickup(!callbackMachinePickup);
      } else {
        const res = await axios.post(`${apiUrl}/pickup/machine`, {
          ...pickup,
        });
        setCallbackMachinePickup(!callbackMachinePickup);
        sweetAlert("success", res.data.msg);
      }
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };
  const editmaintenanceTechnician = async (id) => {
    try {
      const res = await axios.put(`${apiUrl}/pickup/assign_technician/${id}`, {
        technicianId: pickup.technician,
      });
      setCallbackMachinePickup(!callbackMachinePickup);
      sweetAlert("success", res.data.msg);
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };

  const cleaeAllTheDetail = (e) => {
    e.preventDefault();
    setPickup(pickupDetail);
    setInfoChangeItem(InfoChangeItemFields);
  };
  const removeInfoChangeItem = (index) => {
    pickup.infoChange.splice(index, 1);
    setInfoChangeItem(pickup);
    setInfoChangeItem(InfoChangeItemFields);
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
  return (
    <div
      className="rounded "
      style={{ minWidth: "900px", border: "solid 0px #D8DBE0" }}
    >
      {(incompletePickups.length === 0 && salesDetail.status !== "canceled") ||
      onEdit ? (
        <CForm onSubmit={onSubmitSavePickupDetail}>
          <CCard className="w-100 border-0">
            <CCardBody>
              <CRow className="mt-3 p-4">
                <CCol className="d-flex justify-content-center" lg="12">
                  <CImg height="50px" src="/logo.svg" />
                </CCol>
                <CCol className="col-12 my-2  border-bottom">
                  <h3 className="text-center text-muted bold">
                    Machine receiving form
                  </h3>
                </CCol>

                <CCol className="col-12 my-2 d-flex justify-content-end">
                  <p>
                    <span className="">Date : </span>
                    <span className="border-bottom">
                      {new Date().toLocaleDateString()}
                    </span>
                    <br />
                    <span className="">Branch :</span>
                    <b className="border-bottom"> {salesDetail.branchName}</b>
                  </p>
                </CCol>

                <CCol className="col-12 my-2">
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
                          <h6>{salesDetail.tradeName}</h6>
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-3">
                          <h6>Owner :</h6>
                        </CCol>
                        <CCol className="col-8 border-bottom">
                          <h6>{salesDetail.companyName}</h6>
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-3">
                          <h6>TIN :</h6>
                        </CCol>
                        <CCol className="col-8 border-bottom">
                          <h6>{salesDetail.TIN}</h6>
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-3">
                          <h6>VAT :</h6>
                        </CCol>
                        <CCol className="col-8 border-bottom">
                          <h6>{salesDetail.VAT}</h6>
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-3">
                          <h6>Tel :</h6>
                        </CCol>
                        <CCol className="col-8 border-bottom">
                          <h6>{salesDetail.telephone}</h6>
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
                          <h6>{salesDetail.machineBrand}</h6>
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-3">
                          <h6>Model :</h6>
                        </CCol>
                        <CCol className="col-8 border-bottom">
                          <h6>{salesDetail.machineModel}</h6>
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-3">
                          <h6>SER No :</h6>
                        </CCol>
                        <CCol className="col-8 border-bottom">
                          <h6>{salesDetail.machineSerialNumber}</h6>
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-3">
                          <h6>MRC :</h6>
                        </CCol>
                        <CCol className="col-8 border-bottom">
                          <h6>{salesDetail.machineMRC}</h6>
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-3">
                          <h6>SIM :</h6>
                        </CCol>
                        <CCol className="col-8 border-bottom">
                          <h6>{salesDetail.machineSIM}</h6>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CRow>
                </CCol>

                <CCol className="col-12 my-2">
                  <h4 className="text-center">
                    Materials checkup during receiving
                  </h4>
                  <CRow className="mt-3">
                    <CCol>
                      <CRow className="mb-2">
                        <CCol className="col-8">
                          <h6>* Memory Key :</h6>
                        </CCol>
                        <CCol className="col-3 text-center ">
                          <input
                            id="memoryKey"
                            name="memoryKey"
                            value={pickup.memoryKey}
                            className="p-3 jptr_checkBox"
                            type="checkbox"
                            checked={pickup.memoryKey}
                            onChange={handleCheckboxChange}
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-8">
                          <h6>* Drawer :</h6>
                        </CCol>
                        <CCol className="col-3 text-center">
                          <input
                            id="drawer"
                            name="drawer"
                            value={pickup.drawer}
                            className="p-3 jptr_checkBox"
                            type="checkbox"
                            checked={pickup.drawer}
                            onChange={handleCheckboxChange}
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-8">
                          <h6>* Paper :</h6>
                        </CCol>
                        <CCol className="col-3 text-center">
                          <input
                            id="paper"
                            name="paper"
                            value={pickup.paper}
                            className="p-3 jptr_checkBox"
                            type="checkbox"
                            checked={pickup.paper}
                            onChange={handleCheckboxChange}
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-8">
                          <h6>* Terminal :</h6>
                        </CCol>
                        <CCol className="col-3 text-center">
                          <input
                            id="terminal"
                            name="terminal"
                            value={pickup.terminal}
                            className="p-3 jptr_checkBox"
                            type="checkbox"
                            checked={pickup.terminal}
                            onChange={handleCheckboxChange}
                          />
                        </CCol>
                      </CRow>
                    </CCol>
                    <CCol>
                      <CRow className="mb-2">
                        <CCol className="col-8">
                          <h6>* Terminal Adapter :</h6>
                        </CCol>
                        <CCol className="col-3 text-center">
                          <input
                            id="terminalAdapte"
                            name="terminalAdapte"
                            value={pickup.terminalAdapte}
                            className="p-3 jptr_checkBox"
                            type="checkbox"
                            checked={pickup.terminalAdapte}
                            onChange={handleCheckboxChange}
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-8">
                          <h6>* Machine :</h6>
                        </CCol>
                        <CCol className="col-3 text-center">
                          <input
                            id="machineMaterial"
                            name="machineMaterial"
                            value={pickup.machineMaterial}
                            className="p-3 jptr_checkBox"
                            type="checkbox"
                            checked={pickup.machineMaterial}
                            onChange={handleCheckboxChange}
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-8">
                          <h6>* S. Book Terminal :</h6>
                        </CCol>
                        <CCol className="col-3 text-center">
                          <input
                            id="SBookTerminal"
                            name="SBookTerminal"
                            value={pickup.SBookTerminal}
                            className="p-3 jptr_checkBox"
                            type="checkbox"
                            checked={pickup.SBookTerminal}
                            onChange={handleCheckboxChange}
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-8">
                          <h6>* S. Book Machine :</h6>
                        </CCol>
                        <CCol className="col-3 text-center">
                          <input
                            id="SbookMachine"
                            name="SbookMachine"
                            value={pickup.SbookMachine}
                            className="p-3 jptr_checkBox"
                            type="checkbox"
                            checked={pickup.SbookMachine}
                            onChange={handleCheckboxChange}
                          />
                        </CCol>
                      </CRow>
                    </CCol>
                    <CCol>
                      <CRow className="mb-2">
                        <CCol className="col-8">
                          <h6>* Paper Roller :</h6>
                        </CCol>
                        <CCol className="col-3 text-center">
                          <input
                            id="paperRoller"
                            name="paperRoller"
                            value={pickup.paperRoller}
                            className="p-3 jptr_checkBox"
                            type="checkbox"
                            checked={pickup.paperRoller}
                            onChange={handleCheckboxChange}
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-8">
                          <h6>* Paper Cover :</h6>
                        </CCol>
                        <CCol className="col-3 text-center">
                          <input
                            id="paperCover"
                            name="paperCover"
                            value={pickup.paperCover}
                            className="p-3 jptr_checkBox"
                            type="checkbox"
                            checked={pickup.paperCover}
                            onChange={handleCheckboxChange}
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-8">
                          <h6>* Machine Adapter :</h6>
                        </CCol>
                        <CCol className="col-3 text-center">
                          <input
                            id="machineAdapter"
                            name="machineAdapter"
                            value={pickup.machineAdapter}
                            className="p-3 jptr_checkBox"
                            type="checkbox"
                            checked={pickup.machineAdapter}
                            onChange={handleCheckboxChange}
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-8">
                          <h6>* FD Form :</h6>
                        </CCol>
                        <CCol className="col-3 text-center">
                          <input
                            id="FDForm"
                            name="FDForm"
                            value={pickup.FDForm}
                            className="p-3 jptr_checkBox"
                            type="checkbox"
                            checked={pickup.FDForm}
                            onChange={handleCheckboxChange}
                          />
                        </CCol>
                      </CRow>
                    </CCol>
                    <CCol className="col-12 mt-1">
                      <h5> Status Check :</h5>
                      <CRow className="mb-2">
                        <CCol className="col-3 d-flex justify-content-between">
                          <h6>* Seal Number</h6>
                          <input
                            id="sealNumber"
                            name="sealNumber"
                            value={pickup.sealNumber}
                            className="p-3 jptr_checkBox"
                            type="checkbox"
                            checked={pickup.sealNumber}
                            onChange={handleCheckboxChange}
                          />
                        </CCol>
                        <CCol className="col-3 d-flex justify-content-between">
                          <h6>* MRC OK</h6>
                          <input
                            id="MRCNumber"
                            name="MRCNumber"
                            value={pickup.MRCNumber}
                            className="p-3 jptr_checkBox"
                            type="checkbox"
                            checked={pickup.MRCNumber}
                            onChange={handleCheckboxChange}
                          />
                        </CCol>
                        <CCol className="d-flex justify-content-between">
                          <h6> Receiving Reason </h6>
                          <CSelect
                            aria-label="Default select example"
                            id="category"
                            name="category"
                            onChange={handleInputChange}
                            value={pickup.category}
                            required
                            style={{
                              border: "0px",
                              borderBottom: "solid 1px #D8DBE0",
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
                          </CSelect>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CRow>
                </CCol>
                {pickup.category === "annual" && (
                  <CCol className="col-12my-2">
                    <CRow className="border rounded mx-1 py-4">
                      <CCol className="col-6">
                        <CRow className="mb-2">
                          <CCol className="col-4">
                            <h6>Annual service issued date: </h6>
                          </CCol>
                          <CCol className="col-8">
                            <input
                              type="date"
                              className="w-100 form-control"
                              style={{
                                border: "0px",
                                borderBottom: "solid 1px #D8DBE0",
                              }}
                              id="issueDate"
                              name="issueDate"
                              value={pickup.issueDate}
                              onChange={handleInputChange}
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
                              style={{
                                border: "0px",
                                borderBottom: "solid 1px #D8DBE0",
                              }}
                              id="annualNextMaintenanceDate"
                              name="annualNextMaintenanceDate"
                              value={pickup.annualNextMaintenanceDate}
                              onChange={handleInputChange}
                              type="date"
                            />
                          </CCol>
                        </CRow>
                      </CCol>
                    </CRow>
                  </CCol>
                )}
                {pickup.category === "incident" && (
                  <CCol className="col-12 my-2">
                    <CRow className="border rounded mx-1 py-4">
                      <CCol>
                        <CRow className="mb-2">
                          <CCol className="col-2">
                            <h6>Client reported problems</h6>
                          </CCol>
                          <CCol className="col-10">
                            <textarea
                              className="w-100 form-control"
                              style={{
                                border: "0px",
                                borderBottom: "solid 1px #D8DBE0",
                              }}
                              id="clientReportedProblems"
                              name="clientReportedProblems"
                              value={pickup.clientReportedProblems}
                              onChange={handleInputChange}
                              rows="1"
                              required
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
                              style={{
                                border: "0px",
                                borderBottom: "solid 1px #D8DBE0",
                              }}
                              id="technicianReportedProblems"
                              name="technicianReportedProblems"
                              value={pickup.technicianReportedProblems}
                              onChange={handleInputChange}
                              rows="1"
                              required
                            />
                          </CCol>
                        </CRow>
                      </CCol>
                    </CRow>
                  </CCol>
                )}
                {pickup.category === "information_change" && (
                  <CCol className="col-12 my-2">
                    <CRow className="border rounded mx-1 py-4">
                      {user.userRole === "technician" && (
                        <>
                          <CCol className="col-3">
                            <CFormGroup>
                              * Description
                              <CInput
                                size="sm"
                                style={{
                                  border: "0px",
                                  borderBottom: "solid 1px #D8DBE0",
                                }}
                                id="description"
                                name="description"
                                placeholder="Enter detail of change"
                                value={infoChangeItem.description}
                                onChange={handleInfoChangeItem}
                              />
                            </CFormGroup>
                          </CCol>
                          <CCol className="col-3">
                            <CFormGroup>
                              * Part No
                              <CInput
                                size="sm"
                                style={{
                                  border: "0px",
                                  borderBottom: "solid 1px #D8DBE0",
                                }}
                                id="partNo"
                                name="partNo"
                                placeholder="Enter part number"
                                value={infoChangeItem.partNo}
                                onChange={handleInfoChangeItem}
                              />
                            </CFormGroup>
                          </CCol>
                          <CCol className="col-2">
                            <CFormGroup>
                              * Item price
                              <CInput
                                type="number"
                                min="1"
                                size="sm"
                                style={{
                                  border: "0px",
                                  borderBottom: "solid 1px #D8DBE0",
                                }}
                                id="price"
                                name="price"
                                placeholder="Enter needed quanitity"
                                value={infoChangeItem.price}
                                onChange={handleInfoChangeItem}
                              />
                            </CFormGroup>
                          </CCol>
                          <CCol className="col-2">
                            <CFormGroup>
                              * Quantity
                              <CInput
                                type="number"
                                min="1"
                                size="sm"
                                style={{
                                  border: "0px",
                                  borderBottom: "solid 1px #D8DBE0",
                                }}
                                id="quantity"
                                name="quantity"
                                placeholder="Enter needed quantity"
                                value={infoChangeItem.quantity}
                                onChange={handleInfoChangeItem}
                              />
                            </CFormGroup>
                          </CCol>

                          <CCol className="col-2 pt-3">
                            <CButton
                              size="sm"
                              color="dark"
                              className="w-100"
                              onClick={() => pushInfoChangeitem()}
                            >
                              <CIcon name="cil-plus" /> Add
                            </CButton>
                          </CCol>
                        </>
                      )}

                      <CCol className="col-12">
                        {pickup.infoChange.length > 0 && (
                          <>
                            <h5> List of part(s) required</h5>
                            <table className="table table-sm border-bottom-0 border-left-0">
                              <thead>
                                <tr className="border">
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
                                {pickup.infoChange.map((item, index) => (
                                  <tr className="border" key={index}>
                                    <th scope="row" className="border">
                                      {index + 1}
                                    </th>
                                    <td className="border">
                                      {item.description}
                                    </td>
                                    <td className="border">{item.partNo}</td>
                                    <td className="border">{item.price}</td>
                                    <td className="border">{item.quantity}</td>
                                    <td className="border text-right ">
                                      {item.price * item.quantity} {" ETB "}
                                      {user.userRole === "technician" && (
                                        <CLink
                                          className="text-danger"
                                          onClick={() =>
                                            removeInfoChangeItem(index)
                                          }
                                        >
                                          <CTooltip
                                            content={`Remove this item.`}
                                          >
                                            <CIcon name="cil-x" />
                                          </CTooltip>
                                        </CLink>
                                      )}
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
                                  <th
                                    colSpan="5"
                                    className="text-right border-0"
                                  >
                                    Total
                                  </th>{" "}
                                  <td className="border text-right">
                                    {findTotalPrice(pickup.infoChange)} {" ETB"}
                                  </td>{" "}
                                </tr>
                                <tr>
                                  <th
                                    colSpan="5"
                                    className="text-right border-0"
                                  >
                                    VAT
                                  </th>{" "}
                                  <td className="border text-right">
                                    {findVAT(pickup.infoChange)}
                                    {" ETB"}
                                  </td>{" "}
                                </tr>
                                <tr>
                                  <th
                                    colSpan="5"
                                    className="text-right border-0"
                                  >
                                    G. Total
                                  </th>{" "}
                                  <td className="border text-right">
                                    {findGTotal(pickup.infoChange)}
                                    {" ETB"}
                                  </td>{" "}
                                </tr>
                              </tbody>
                            </table>
                          </>
                        )}
                      </CCol>
                    </CRow>
                  </CCol>
                )}
                <CCol className="col-12 my-2">
                  <h4 className="text-decoration-underline">
                    {" "}
                    Receiving Summery
                  </h4>
                  <h6 className="border-bottom " style={{ lineHeight: "1.6" }}>
                    The machine with <b> 1000949382773</b> serial number is
                    assigned to the company
                    <b> Edna Mall privated Limited Company</b> and fiscalized
                    with MRC of <b> CLC10008768 </b>
                    and SIM <b> 0987664321 </b> in
                    <b> {salesDetail.branchName}</b>, and receiving for{" "}
                    {pickup.category}
                    {pickup.category === "annual" ||
                    pickup.category === "incident"
                      ? " maintenance "
                      : pickup.category === "withdrawal"
                      ? " machine "
                      : pickup.category === ""
                      ? " _______ "
                      : ""}{" "}
                    on {new Date().toLocaleString()}.
                  </h6>
                </CCol>
                <CCol className="col-12 my-2">
                  <CRow className="border rounded mx-1 py-4">
                    <CCol className="col-12">
                      <h5>Internal Use</h5>
                    </CCol>
                    <CCol className="col-6 mt-4">
                      <CRow className="mb-2">
                        <CCol className="col-3">
                          <h6>Received by :</h6>
                        </CCol>
                        <CCol className="col-8 border-bottom">
                          <h6>{user.fName + " " + user.mName}</h6>
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-3">
                          <h6>Signature :</h6>
                        </CCol>
                        <CCol className="col-8 border-bottom"></CCol>
                      </CRow>
                    </CCol>
                    <CCol className="col-6 mt-4">
                      <CRow className="mb-2">
                        <CCol className="col-4">
                          <h6>Receiving Date :</h6>
                        </CCol>
                        <CCol className="col-7 border-bottom">
                          <h6>{new Date().toLocaleDateString()}</h6>
                        </CCol>
                      </CRow>
                    </CCol>
                    {user.userRole === "customer-service" && (
                      <CCol className="col-6 mt-4">
                        <CRow className="mb-2">
                          <CCol className="col-4">
                            <h6>* Technician :</h6>
                          </CCol>
                          <CCol className="col-8  input-group ">
                            {/* <div className="input-group mb-3"> */}
                            <CSelect
                              aria-label="Default select example"
                              id="technician"
                              name="technician"
                              onChange={handleInputChange}
                              value={pickup.technician}
                              style={{
                                border: "0px",
                                borderBottom: "solid 1px #D8DBE0",
                              }}
                            >
                              <option value="">
                                Select maintenance technician ...
                              </option>
                              {allUsers
                                .filter(
                                  (fltrdUser) =>
                                    fltrdUser.userRole === "technician" &&
                                    fltrdUser.branch === user.branch
                                )
                                .map((theUser) => (
                                  <option value={theUser._id} key={theUser._id}>
                                    {theUser.fName + " " + theUser.mName}
                                  </option>
                                ))}
                            </CSelect>
                            {pickup.status === "controlling_maintenance" && (
                              <div className="input-group-append">
                                <CButton
                                  color="dark"
                                  className="d-print-none input-group-text"
                                  onClick={() =>
                                    editmaintenanceTechnician(pickup._id)
                                  }
                                >
                                  Done!
                                </CButton>
                              </div>
                            )}
                            {/* </div> */}
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
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>

          <div className="d-flex justify-content-end">
            <div>
              {user.userRole === "technician" && (
                <>
                  {" "}
                  <CButton
                    type="submit"
                    className="my-1 mr-1"
                    size="sm"
                    color="dark"
                  >
                    <CIcon name="cil-save"></CIcon> Save
                    {onEdit ? " all changes" : " this receiving detail"}!
                  </CButton>
                  {!onEdit && (
                    <CButton
                      className="my-1"
                      size="sm"
                      color="danger"
                      onClick={cleaeAllTheDetail}
                    >
                      <CIcon name="cil-x"></CIcon> Clear this receiving detail!
                    </CButton>
                  )}
                </>
              )}
            </div>
          </div>
        </CForm>
      ) : (
        <BadRouting text="This machine has incomplete process, Then you can't receive it before previous process is completed!" />
      )}
    </div>
  );
}

export default MachinePickUp;
