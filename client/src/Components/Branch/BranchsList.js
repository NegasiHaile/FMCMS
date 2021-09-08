import React, { useState, useContext } from "react";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
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
  CRow,
  CCol,
  CFormGroup,
  CInput,
  CDataTable,
  CLink,
  CTooltip,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";

const branchDetail = {
  branchName: "",
  city: "",
  subCity: "",
  kebele: "",
  woreda: "",
  buildingName: "",
  officeNumber: "",
  telephone: "",
  email: "",
};

function BranchsList() {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [token] = state.token;
  const [branch, setBranch] = useState(branchDetail);
  const [branchs] = state.branchAPI.branchs;
  const [callback, setCallback] = state.branchAPI.callback;
  const [activeBranch, setActiveBranch] = useState("none");
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <h3>This is branchs list</h3>
    </div>
  );
}

export default BranchsList;
