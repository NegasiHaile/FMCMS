import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../GlobalState";
import { useParams } from "react-router-dom";
import BadRouting from "../Utils/routing/BadRouting";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CRow,
  CCol,
} from "@coreui/react";

function BranchIndetail() {
  const state = useContext(GlobalState);
  const params = useParams();
  const [user] = state.UserAPI.User;
  const [allBranchs] = state.branchAPI.branchs;
  const [allUsers] = state.UsersAPI.users;
  const [allBusinesses] = state.BusinessAPI.businesses;
  const [allMachines] = state.MachineAPI.machines;

  const [branch, setBranch] = useState("");
  const [branchEmployee, setBranchEployee] = useState(allUsers);
  const [branchClients, setBranchClients] = useState(allUsers);
  const [branchBusinesses, setBranchBusinesses] = useState(allBusinesses);
  const [branchMachines, setBranchMachines] = useState(allMachines);

  useEffect(() => {
    try {
      if (params.id) {
        var theBranch = allBranchs.filter(
          (fltrdBranch) => fltrdBranch._id === params.id
        );
        var theEmployees = allUsers.filter(
          (fltrdUser) =>
            fltrdUser.branch === params.id &&
            (fltrdUser.userRole === "branch-admin" ||
              fltrdUser.branch === "technician")
        );
        var theClients = allUsers.filter(
          (fltrdUser) =>
            fltrdUser.branch === params.id && fltrdUser.userRole === "client"
        );
        setBranch(theBranch[0]);
        setBranchEployee(theEmployees);
        setBranchClients(theClients);
      } else {
        setBranch("");
      }
    } catch (error) {}
  }, [params.id, allBranchs, allUsers]);
  return (
    <>
      {branch != undefined ? (
        <>
          {" "}
          <CRow>
            <CCol sm="12" lg="4">
              <CCard className="shadow-lg" color="info">
                <CCardHeader>
                  <h6>
                    <small>Detail of : </small>
                    {branch.branchName}
                  </h6>
                </CCardHeader>
                <CCardBody>
                  <span className="d-flex justify-content-between">
                    <span> city: </span> <span>{branch.city}</span>
                  </span>
                  <span className="d-flex justify-content-between">
                    <span> Sub city: </span> <span>{branch.subCity}</span>
                  </span>
                  <span className="d-flex justify-content-between">
                    <span> Kebele: </span> <span>{branch.kebele}</span>
                  </span>
                  <span className="d-flex justify-content-between">
                    <span> Woreda: </span> <span>{branch.woreda}</span>
                  </span>
                  <span className="d-flex justify-content-between">
                    <span> Building Name: </span>{" "}
                    <span>{branch.buildingName}</span>
                  </span>
                  <span className="d-flex justify-content-between">
                    <span> Office Number: </span>{" "}
                    <span>{branch.officeNumber}</span>
                  </span>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol sm="12" lg="4">
              <CCard className="shadow-lg">
                <CCardHeader color="warning">
                  <h6>
                    <small>Detail of : </small>
                    {branch.branchName}
                  </h6>
                </CCardHeader>
                <CCardBody></CCardBody>

                <CCardFooter></CCardFooter>
              </CCard>
            </CCol>
            <CCol sm="12" lg="4">
              <CCard className="shadow-lg">
                <CCardHeader color="success">
                  <h6>
                    <small>Detail of : </small>
                    {branch.branchName}
                  </h6>
                </CCardHeader>
                <CCardBody></CCardBody>

                <CCardFooter></CCardFooter>
              </CCard>
            </CCol>
          </CRow>
          <CCard>
            <CCardHeader>
              <h6>
                <small>Branch sales </small>
              </h6>
            </CCardHeader>
            <CCardBody></CCardBody>
          </CCard>{" "}
        </>
      ) : (
        <BadRouting text="Bad routing! There is no branch with this routing!" />
      )}
    </>
  );
}

export default BranchIndetail;
