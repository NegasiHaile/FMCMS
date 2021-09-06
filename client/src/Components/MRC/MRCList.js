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

const mrcDetail = {
  MRC: "",
};

const MRCList = () => {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [mrcs] = state.MRCAPI.mrcs;
  const [mrcCallBack, setMRCCallBack] = state.MRCAPI.callback;
  const [token] = state.token;

  const [mrc, setMRC] = useState(mrcDetail);
  const [activeMRC, setActiveMRC] = useState("none");
  const [showModal, setShowModal] = useState(false);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setMRC({ ...mrc, [name]: value });
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

  const onChangeSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/mrc/register", { ...mrc });
      sweetAlert("success", res.data.msg);
      setShowModal(!showModal);
      setMRCCallBack(!mrcCallBack);
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };

  const deleteMRC = async (id) => {
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
          const res = await axios.delete(`/mrc/delete/${id}`);
          Swal.fire("Deleted!", res.data.msg, "success");

          setMRCCallBack(!mrcCallBack);
        }
      });
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };

  const mrcTableFields = ["MRC", "status", "createdAt", "Actions"];

  return (
    <>
      <CCard className=" shadow-sm">
        <CCardHeader className="d-flex justify-content-between">
          <CLabel>MRC List</CLabel>
          {user.userRole === "main-store" && (
            <CButton
              size="sm"
              color="light"
              onClick={() => {
                setActiveMRC("none");
                setShowModal(!showModal);
              }}
            >
              <CIcon name="cil-plus" /> Add new MRC
            </CButton>
          )}
        </CCardHeader>
        <CCardBody>
          <CDataTable
            size="sm"
            items={mrcs}
            fields={mrcTableFields}
            tableFilter
            itemsPerPageSelect
            itemsPerPage={10}
            hover
            cleaner
            sorter
            pagination
            scopedSlots={{
              Actions: (mrc) => (
                <td className="d-flex justify-content-between">
                  {/* <CLink className="text-primary" to={`/mrc/Detail/${mrc._id}`}>
                    <CTooltip content={`See detail of - ${mrc.MRC}- branch.`}>
                      <CIcon name="cil-fullscreen" />
                    </CTooltip>
                  </CLink> */}
                  {user.userRole === "main-store" && mrc.status === "free" && (
                    <>
                      <span className="text-muted">|</span>
                      <CLink
                        className="text-danger"
                        onClick={() => deleteMRC(mrc._id)}
                      >
                        <CTooltip content={`Delete - ${mrc.MRC}- MRC.`}>
                          <CIcon name="cil-trash" />
                        </CTooltip>
                      </CLink>
                    </>
                  )}
                </td>
              ),
            }}
          />
        </CCardBody>

        <CModal
          size="md"
          show={showModal}
          onClose={() => setShowModal(!showModal)}
        >
          <CModalHeader closeButton>
            <CModalTitle>Add new MRC</CModalTitle>
          </CModalHeader>
          <CForm onSubmit={onChangeSubmit}>
            <CModalBody>
              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    MRC unique
                    <CInput
                      id="MRC"
                      name="MRC"
                      maxlength="10"
                      minLength="10"
                      placeholder="Enter branch unique name."
                      value={mrc.MRC}
                      onChange={onChangeInput}
                      required
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
            </CModalBody>
            <CModalFooter>
              {activeMRC === "none" ? (
                <CButton type="submit" size="sm" color="success">
                  <CIcon name="cil-save" /> Save
                </CButton>
              ) : (
                ""
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

export default MRCList;
