import React, { useState, useEffect, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import CIcon from "@coreui/icons-react";
import { useParams } from "react-router-dom";
import BusinessesPerClient from "./Components/BusinessesPerClient";
import BadRouting from "../Utils/routing/BadRouting";
import {
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CLabel,
  CRow,
  CCol,
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
      {client.length > 0 ? (
        <CCard className=" shadow-sm">
          <CCardHeader className="d-flex justify-content-between">
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
            )}
          </CCardHeader>
          <CCardBody>
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
                <p>Phone Number: {client[0].phoneNumber}</p>
              </CCol>
              <CCol sm="12" md="6" lg="3">
                <p>Email: {client[0].email}</p>
              </CCol>
            </CRow>
            <BusinessesPerClient clientId={client[0]._id} />
          </CCardBody>
        </CCard>
      ) : (
        <BadRouting text="Bad routing, Please go back to clients list page and click the detail button of you need to see it's detail!" />
      )}
    </>
  );
}

export default ClientDetail;
