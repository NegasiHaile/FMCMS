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
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";

function MachineDetail({ id }) {
  const params = useParams();
  const state = useContext(GlobalState);
  const [machines] = state.MachineAPI.machines;
  const [machieneDetail, setMachieneDetail] = useState("");

  useEffect(() => {
    if (id && machines) {
      const machine = machines.find(
        (filteredMachine) => filteredMachine._id === id
      );
      setMachieneDetail(machine);
    } else {
    }
  }, [id, machines]);

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
                      {" "}
                      <CButton size="sm" color="info">
                        {" "}
                        Assigne MRC{" "}
                      </CButton>{" "}
                    </span>
                  </p>
                  <p className="d-flex justify-content-between">
                    <strong>* SIM:</strong>
                    <span>
                      {" "}
                      <CButton size="sm" color="info">
                        {" "}
                        Assigne SIM{" "}
                      </CButton>{" "}
                    </span>
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
    </div>
  );
}

export default MachineDetail;
