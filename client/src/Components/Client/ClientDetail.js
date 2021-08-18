import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import {
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
function ClientDetail() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [users] = state.UsersAPI.users;
  const [client, setClient] = useState(
    users.filter((filteredClient) => filteredClient._id == params.id)
  );

  // console.log(client);
  return (
    <>
      <CCard className=" shadow-sm">
        <CCardHeader className="d-flex justify-content-between">
          {client.length > 0 && (
            <>
              {" "}
              <CLabel className="text-muted">
                Detail of Client{" "}
                <small className="text-primary">
                  {client[0].fName} {client[0].mName}
                </small>
              </CLabel>
              {(user.userRole === "sales" || user.userRole === "client") && (
                <CButton
                  size="sm"
                  color="secondary"
                  to={`/business/register/${params.id}`}
                >
                  <CIcon name="cil-plus" /> Add business
                </CButton>
              )}{" "}
            </>
          )}
        </CCardHeader>
        <CCardBody>
          {client.length > 0 && (
            <>
              {" "}
              <CRow className="border-bottom">
                <CCol sm="12" md="6" lg="3">
                  <p>
                    Full Name: {client[0].fName} {client[0].mName}{" "}
                    {client[0].lName}
                  </p>
                </CCol>
                <CCol sm="12" md="6" lg="3">
                  <p>Gender: {client[0].gender}</p>
                </CCol>
                <CCol sm="12" md="6" lg="3">
                  <p>Phone Number: {client[0].gender}</p>
                </CCol>
                <CCol sm="12" md="6" lg="3">
                  <p>Email: {client[0].email}</p>
                </CCol>
              </CRow>{" "}
            </>
          )}
        </CCardBody>
      </CCard>
    </>
  );
}

export default ClientDetail;
