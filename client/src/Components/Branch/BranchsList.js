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

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setBranch({ ...branch, [name]: value });
  };

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

  const onSubmitOpenBranch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/branch/open_new", { ...branch });
      sweetAlert("success", res.data.msg);
      setShowModal(!showModal);
      setCallback(!callback);
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };

  const editBranchDetail = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `/branch/edit/${activeBranch}`,
        { ...branch },
        {
          headers: { Authorization: token },
        }
      );
      sweetAlert("success", res.data.msg);
      setShowModal(!showModal);
      setCallback(!callback);
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };

  const deleteBranch = async (_id, branchName) => {
    try {
      Swal.fire({
        title: "Delete?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1E263C",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.delete(`/branch/delete/${_id}`, {
            headers: { Authorization: token },
          });
          Swal.fire("Deleted!", res.data.msg, "success");
          setCallback(!callback);
        }
      });
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };

  const branchTableFields = [
    "branchName",
    "city",
    "subCity",
    "kebele",
    "woreda",
    "buildingName",
    "officeNumber",
    "telephone",
    "Actions",
  ];
  return (
    <div>
      <h3>This is branchs list</h3>
    </div>
  );
}

export default BranchsList;
