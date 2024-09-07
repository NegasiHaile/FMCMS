/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from "react";
import { GlobalState } from "../../GlobalState";

import { CCard, CCardHeader, CCardBody, CRow, CCol } from "@coreui/react";
function BranchProfile({ branchId }) {
  const state = useContext(GlobalState);
  const [allBranchs] = state.branchAPI.branchs;

  const [branch, setBranch] = useState("");

  useEffect(() => {
    // try {
    if (branchId) {
      var theBranch = allBranchs.filter(
        (fltrdBranch) => fltrdBranch._id === branchId
      );
      setBranch(theBranch[0]);
    } else {
      setBranch("");
    }
    // } catch (error) {}
  }, [branchId]);
  return (
    <div>
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
    </div>
  );
}

export default BranchProfile;
