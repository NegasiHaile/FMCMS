import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../GlobalState";
import { useParams } from "react-router-dom";
import BadRouting from "../Utils/routing/BadRouting";
import Dashboard from "../Dashboard/Dashboard";
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
          <CCard>
            <CCardHeader color="light">
              <span
                className="p-1 px-3 rounded"
                style={{ backgroundColor: "#FFFFFF", color: "#3C4B64" }}
              >
                {branch.branchName}
              </span>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol sm="12" md="6" lg="4">
                  <span className="d-flex justify-content-between">
                    <span>* city: </span> <span>{branch.city}</span>
                  </span>
                  <span className="d-flex justify-content-between">
                    <span>* Sub city: </span> <span>{branch.subCity}</span>
                  </span>
                </CCol>
                <CCol sm="12" md="6" lg="4">
                  <span className="d-flex justify-content-between">
                    <span>* Kebele: </span> <span>{branch.kebele}</span>
                  </span>
                  <span className="d-flex justify-content-between">
                    <span>* Woreda: </span> <span>{branch.woreda}</span>
                  </span>
                </CCol>

                <CCol sm="12" md="6" lg="4">
                  <span className="d-flex justify-content-between">
                    <span>* Building Name: </span>{" "}
                    <span>{branch.buildingName}</span>
                  </span>
                  <span className="d-flex justify-content-between">
                    <span>* Office Number: </span>{" "}
                    <span>{branch.officeNumber}</span>
                  </span>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
          <Dashboard branchId={params.id} />
        </>
      ) : (
        <BadRouting text="Bad routing! There is no branch with this routing!" />
      )}
    </>
  );
}

export default BranchIndetail;
