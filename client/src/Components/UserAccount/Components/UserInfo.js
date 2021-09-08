import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import {
  CRow,
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CLabel,
  CCol,
} from "@coreui/react";
function UserInfo({ id }) {
  const state = useContext(GlobalState);
  const [users] = state.UsersAPI.users;
  const [userDetail, setUserDetail] = useState("");

  useEffect(() => {
    if (id) {
      const user = users.find((filteredUser) => filteredUser._id === id);
      setUserDetail(user);
    } else {
    }
  }, [id, users]);

  return (
    <CRow>
      <CCol md="12" lg="8">
        <CCard>
          <CCardHeader>User Info</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12" md="6" className="my-1">
                <span className="d-flex justify-content-between">
                  <span> * First Name: </span>
                  <span>{userDetail.fName}</span>
                </span>
                <span className="d-flex justify-content-between">
                  <span> * Middle Name: </span>
                  <span>{userDetail.mName}</span>
                </span>
                <span className="d-flex justify-content-between">
                  <span> * Last Name: </span>
                  <span>{userDetail.lName}</span>
                </span>
              </CCol>
              <CCol sm="12" md="6" className="my-1">
                <span className="d-flex justify-content-between">
                  <span> * Gender: </span>
                  <span>{userDetail.gender}</span>
                </span>
                <span className="d-flex justify-content-between">
                  <span> * User Role: </span>
                  <span>{userDetail.userRole}</span>
                </span>
              </CCol>
              <CCol sm="12" md="6" className="my-1">
                <span className="d-flex justify-content-between">
                  <span> * Phone Number: </span>
                  <span>{userDetail.phoneNumber}</span>
                </span>
                <span className="d-flex justify-content-between">
                  <span> * Email: </span>
                  <span>{userDetail.email}</span>
                </span>
              </CCol>
              <CCol sm="12" md="6" className="my-1">
                <span className="d-flex justify-content-between">
                  <span> * City: </span>
                  <span>{userDetail.city}</span>
                </span>
                <span className="d-flex justify-content-between">
                  <span> * Wored: </span>
                  <span>{userDetail.woreda}</span>
                </span>

                <span className="d-flex justify-content-between">
                  <span> * Kebele: </span>
                  <span>{userDetail.kebele}</span>
                </span>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md="12" lg="4">
        <CCard>
          <CCardHeader>User tasks</CCardHeader>
          <CCardBody>
            <h3>{userDetail.fName}</h3>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol>
        <CCard>
          <CCardHeader>Work History</CCardHeader>
          <CCardBody>
            <h3>{userDetail.fName}</h3>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default UserInfo;
