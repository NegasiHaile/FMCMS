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

const BranchList = () => {
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
  }

  const onSubmitOpenBranch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/branch/open_new", { ...branch });
      sweetAlert("success", res.data.msg)
      setShowModal(!showModal);
      setCallback(!callback);
    } catch (error) {
      sweetAlert("error", error.response.data.msg)
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
      sweetAlert("success", res.data.msg)
      setShowModal(!showModal);
      setCallback(!callback);
    } catch (error) {
      sweetAlert("error", error.response.data.msg)
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
      sweetAlert("error", error.response.data.msg)
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
    <>
      <CCard className=" shadow-sm">
        <CCardHeader className="d-flex justify-content-between">
          <CLabel>Jupiter Branhcs</CLabel>
          {user.userRole === "super-admin" && <CButton
            size="sm"
            color="secondary"
            onClick={() => {
              setBranch({ branch, ...branchDetail });
              setActiveBranch("none");
              setShowModal(!showModal);
            }}
          >
            <CIcon name="cil-plus" /> Open branch
          </CButton>}
        </CCardHeader>
        <CCardBody>
          <CDataTable
            items={branchs}
            fields={branchTableFields}
            tableFilter
            itemsPerPageSelect
            itemsPerPage={5}
            hover
            cleaner
            sorter
            pagination
            scopedSlots={{
              Actions: (branch) => (
                <td className="d-flex justify-content-between">
                  { user.userRole === "super-admin" && <> <CLink
                    className="text-success"
                    onClick={() => {
                      setBranch({ branch, ...branch });
                      setActiveBranch(branch._id);
                      setShowModal(!showModal);
                    }}
                  >
                    <CTooltip
                      content={`Edit the  - ${branch.branchName}- branch detail.`}
                    >
                      <CIcon name="cil-pencil" />
                    </CTooltip>
                  </CLink>

                  <span className="text-muted">|</span>

                  <CLink
                    className="text-danger"
                    onClick={() => deleteBranch(branch._id)}
                  >
                    <CTooltip
                      content={`Delete - ${branch.branchName}- branch.`}
                    >
                      <CIcon name="cil-trash" />
                    </CTooltip>
                  </CLink>

                  <span className="text-muted">|</span> </>}

                  <CLink
                    className="text-primary"
                    to={`/Branch/Detail/${branch._id}`}
                  >
                    <CTooltip
                      content={`See detail of - ${branch.branchName}- branch.`}
                    >
                      <CIcon name="cil-fullscreen" />
                    </CTooltip>
                  </CLink>
                </td>
              ),
            }}
          />
        </CCardBody>

        <CModal
          size="lg"
          show={showModal}
          onClose={() => setShowModal(!showModal)}
        >
          <CModalHeader closeButton>
            <CModalTitle>Open-New-Branch</CModalTitle>
          </CModalHeader>
          <CForm onSubmit={onSubmitOpenBranch}>
            <CModalBody>
              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    Branch Name
                    <CInput
                      id="branchName"
                      name="branchName"
                      placeholder="Enter branch unique name."
                      value={branch.branchName}
                      onChange={onChangeInput}
                      required
                    />
                  </CFormGroup>
                </CCol>

                <CCol xs="12" md="4">
                  <CFormGroup>
                    Address City
                    <CInput
                      id="city"
                      name="city"
                      placeholder="enter the branch city"
                      value={branch.city}
                      onChange={onChangeInput}
                      required
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="12" md="4">
                  <CFormGroup>
                    Sub city
                    <CInput
                      id="subCity"
                      name="subCity"
                      placeholder="Enter sub city."
                      value={branch.subCity}
                      onChange={onChangeInput}
                      required
                    />
                  </CFormGroup>
                </CCol>

                <CCol xs="12" md="4">
                  <CFormGroup>
                    Kebele
                    <CInput
                      id="kebele"
                      name="kebele"
                      placeholder="Enter kebele."
                      value={branch.kebele}
                      onChange={onChangeInput}
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="12" md="4">
                  <CFormGroup>
                    Woreda
                    <CInput
                      id="woreda"
                      name="woreda"
                      placeholder="Enter woreda."
                      value={branch.woreda}
                      onChange={onChangeInput}
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="12" md="4">
                  <CFormGroup>
                    Building Name
                    <CInput
                      id="buildingName"
                      name="buildingName"
                      placeholder="Enter building name."
                      value={branch.buildingName}
                      onChange={onChangeInput}
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="12" md="4">
                  <CFormGroup>
                    Office Number
                    <CInput
                      id="officeNumber"
                      name="officeNumber"
                      placeholder="Enter office number"
                      value={branch.officeNumber}
                      onChange={onChangeInput}
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="12" md="6">
                  <CFormGroup>
                    Telephone
                    <CInput
                      id="telephone"
                      name="telephone"
                      placeholder="Enter branch telephone"
                      value={branch.telephone}
                      onChange={onChangeInput}
                      required
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="12" md="6">
                  <CFormGroup>
                    Email
                    <CInput
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter branch email"
                      value={branch.email}
                      onChange={onChangeInput}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
            </CModalBody>
            <CModalFooter>
              {activeBranch === "none" ? (
                <CButton type="submit" size="sm" color="success">
                  <CIcon name="cil-save" /> Open Branch
                </CButton>
              ) : (
                <CButton size="sm" color="dark" onClick={editBranchDetail}>
                  <CIcon name="cil-pencil" /> Save Changes
                </CButton>
              )}
              <CButton
                size="sm"
                color="danger"
                onClick={() => setShowModal(!showModal)}
              >
                <CIcon name="cil-x" /> Close
              </CButton>
            </CModalFooter>
          </CForm>
        </CModal>
      </CCard>
    </>
  );
};

export default BranchList;
