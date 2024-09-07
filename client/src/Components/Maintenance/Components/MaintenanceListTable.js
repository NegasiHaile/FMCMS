import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CRow,
  CCol,
  CSelect,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInput,
  CButton,
  CDataTable,
  CLink,
  CTooltip,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const machinePickupsFields = [
  "tradeName",
  "serialNumber",
  "machineModel",
  "category",
  "createdAt",
  "branchName",
  "status",
  {
    key: "Actions",
    label: "Actions",
    // _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
];
function MaintenanceListTable() {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [allUsers] = state.UsersAPI.users;
  const [pickupMachines] = state.MachinePickUpAPI.machinePickups;
  const [maintenances, setMaintenances] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [technicianId, setTechnicianId] = useState("");
  const [maintenanceDateFrom, setMaintenanceDateFrom] = useState("");
  const [maintenanceDateTo, setMaintenanceDateTo] = useState(
    new Date().toISOString().substr(0, 10)
  );

  useEffect(() => {
    if (user) {
      if (user.userRole === "super-admin" || user.userRole === "main-store") {
        setTechnicians(
          allUsers.filter(
            (filteredEmployee) => filteredEmployee.userRole === "technician"
          )
        );
      } else {
        setTechnicians(
          allUsers.filter(
            (filteredEmployee) =>
              filteredEmployee.userRole === "technician" &&
              filteredEmployee.branch == user.branch
          )
        );
      }
    }
  }, [user, allUsers]);

  useEffect(() => {
    if (pickupMachines.length > 0) {
      if (user.userRole === "super-admin" || user.userRole === "main-store") {
        if (technicianId) {
          if (maintenanceDateFrom) {
            setMaintenances(
              pickupMachines.filter(
                (filteredPickUp) =>
                  (filteredPickUp.category === "annual" ||
                    filteredPickUp.category === "incident" ||
                    filteredPickUp.category === "information_change") &&
                  filteredPickUp.technician === technicianId &&
                  filteredPickUp.createdAt > maintenanceDateFrom &&
                  filteredPickUp.createdAt <= maintenanceDateTo
              )
            );
          } else {
            setMaintenances(
              pickupMachines.filter(
                (filteredPickUp) =>
                  (filteredPickUp.category === "annual" ||
                    filteredPickUp.category === "incident" ||
                    filteredPickUp.category === "information_change") &&
                  filteredPickUp.technician === technicianId
              )
            );
          }
        } else {
          if (maintenanceDateFrom) {
            setMaintenances(
              pickupMachines.filter(
                (filteredPickUp) =>
                  (filteredPickUp.category === "annual" ||
                    filteredPickUp.category === "incident" ||
                    filteredPickUp.category === "information_change") &&
                  filteredPickUp.createdAt > maintenanceDateFrom &&
                  filteredPickUp.createdAt <= maintenanceDateTo
              )
            );
          } else {
            setMaintenances(
              pickupMachines.filter(
                (filteredPickUp) =>
                  filteredPickUp.category === "annual" ||
                  filteredPickUp.category === "incident" ||
                  filteredPickUp.category === "information_change"
              )
            );
          }
        }
      } else {
        if (technicianId) {
          if (maintenanceDateFrom) {
            setMaintenances(
              pickupMachines.filter(
                (filteredPickUp) =>
                  (filteredPickUp.category === "annual" ||
                    filteredPickUp.category === "incident" ||
                    filteredPickUp.category === "information_change") &&
                  filteredPickUp.branchId === user.branch &&
                  filteredPickUp.technician === technicianId &&
                  filteredPickUp.createdAt > maintenanceDateFrom &&
                  filteredPickUp.createdAt <= maintenanceDateTo
              )
            );
          } else {
            setMaintenances(
              pickupMachines.filter(
                (filteredPickUp) =>
                  (filteredPickUp.category === "annual" ||
                    filteredPickUp.category === "incident" ||
                    filteredPickUp.category === "information_change") &&
                  filteredPickUp.branchId === user.branch &&
                  filteredPickUp.technician === technicianId
              )
            );
          }
        } else {
          if (maintenanceDateFrom) {
            setMaintenances(
              pickupMachines.filter(
                (filteredPickUp) =>
                  (filteredPickUp.category === "annual" ||
                    filteredPickUp.category === "incident" ||
                    filteredPickUp.category === "information_change") &&
                  filteredPickUp.branchId === user.branch &&
                  filteredPickUp.createdAt > maintenanceDateFrom &&
                  filteredPickUp.createdAt <= maintenanceDateTo
              )
            );
          } else {
            setMaintenances(
              pickupMachines.filter(
                (filteredPickUp) =>
                  (filteredPickUp.category === "annual" ||
                    filteredPickUp.category === "incident" ||
                    filteredPickUp.category === "information_change") &&
                  filteredPickUp.branchId === user.branch
              )
            );
          }
        }
      }
    }
  }, [
    user,
    pickupMachines,
    technicianId,
    maintenanceDateFrom,
    maintenanceDateTo,
  ]);
  return (
    <>
      <CCard className="shadow-sm table-responsive">
        <CCardHeader>
          <CRow>
            <CCol className="col-2 mb-1">
              <h6> Filter Maintenances </h6>
            </CCol>
            <CCol className="col-4 mb-1">
              <CSelect
                aria-label="Default select example"
                id="technicianId"
                name="technicianId"
                value={technicianId}
                onChange={(e) => setTechnicianId(e.target.value)}
              >
                <option value="">Select technician Name</option>
                {technicians.map((technician, index) => (
                  <option key={index} value={technician._id}>
                    {technician.fName + " " + technician.mName}
                  </option>
                ))}
              </CSelect>
            </CCol>
            <CCol className="col-3 mb-1">
              <CInputGroup>
                <CInputGroupPrepend>
                  <CInputGroupText>From</CInputGroupText>
                </CInputGroupPrepend>
                <CInput
                  type="date"
                  placeholder="Select date"
                  id="maintenanceDateFrom"
                  name="maintenanceDateFrom"
                  value={maintenanceDateFrom}
                  onChange={(e) => setMaintenanceDateFrom(e.target.value)}
                  placeholder="From"
                />
              </CInputGroup>
            </CCol>
            <CCol className="col-3 mb-1">
              <CInputGroup>
                <CInputGroupPrepend>
                  <CInputGroupText>To</CInputGroupText>
                </CInputGroupPrepend>
                <CInput
                  type="date"
                  placeholder="Select date"
                  id="maintenanceDateTo"
                  name="maintenanceDateTo"
                  value={maintenanceDateTo}
                  onChange={(e) => setMaintenanceDateTo(e.target.value)}
                  placeholder="To"
                />
              </CInputGroup>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CDataTable
            size="sm"
            items={maintenances}
            fields={machinePickupsFields}
            columnFilter
            itemsPerPageSelect
            itemsPerPage={10}
            hover
            sorter
            pagination
            scopedSlots={{
              Actions: (pickup) => (
                <td className="d-flex justify-content-between d-print-none">
                  <>
                    <CLink
                      className="text-info"
                      to={`/pickup/detail/${pickup._id}`}
                    >
                      <CTooltip
                        content={`See detail of this ${pickup.category} maintenance.`}
                      >
                        <CIcon name="cil-arrow-right" />
                      </CTooltip>
                    </CLink>
                  </>
                </td>
              ),
            }}
          />
        </CCardBody>
      </CCard>
    </>
  );
}

export default MaintenanceListTable;
