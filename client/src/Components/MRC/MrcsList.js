import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import FilterMachine from "../Utils/Filters/FilterMachine";
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
import { getConfig } from "../../config";

const mrcDetail = {
  MRC: "",
};

function MrcsList() {
  const state = useContext(GlobalState);
  const { apiUrl } = getConfig();
  const [user] = state.UserAPI.User;
  const [allMRCs] = state.MRCAPI.mrcs;
  const [mrcs, setMRCs] = useState([]);
  const [mrcCallBack, setMRCCallBack] = state.MRCAPI.callback;

  const [mrc, setMRC] = useState(mrcDetail);
  const [onEdit, setOnEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setMRC({ ...mrc, [name]: value });
  };
  useEffect(() => {
    if (user.userRole !== "super-admin" && user.userRole !== "main-store") {
      setMRCs(
        allMRCs.filter((filteredMRCs) => filteredMRCs.branch == user.branch)
      );
    } else {
      setMRCs(allMRCs);
    }
  }, [user, allMRCs]);
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
      if (onEdit) {
        const res = await axios.put(`${apiUrl}/mrc/edit`, { ...mrc });
        setShowModal(!showModal);
        setMRCCallBack(!mrcCallBack);
        sweetAlert("success", res.data.msg);
      } else {
        const res = await axios.post(`${apiUrl}/mrc/register`, { ...mrc });
        setShowModal(!showModal);
        setMRCCallBack(!mrcCallBack);
        sweetAlert("success", res.data.msg);
      }
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
          const res = await axios.delete(`${apiUrl}/mrc/delete/${id}`);
          Swal.fire("Deleted!", res.data.msg, "success");

          setMRCCallBack(!mrcCallBack);
        }
      });
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };

  const mrcTableFields = [
    "MRC",
    "status",
    "createdAt",
    ,
    {
      key: "Actions",
      label: "Actions",
      sorter: false,
      filter: false,
    },
  ];
  return (
    <>
      <CCard className=" shadow-sm">
        <CCardHeader className="d-flex justify-content-between">
          <CLabel>MRC List</CLabel>
          {user.userRole === "main-store" && (
            <CButton
              size="sm"
              color="dark"
              onClick={() => {
                setMRC(mrcDetail);
                setOnEdit(false);
                setShowModal(!showModal);
              }}
            >
              <CIcon name="cil-plus" /> Add new MRC
            </CButton>
          )}
        </CCardHeader>
        <CCardBody>
          <CDataTable
            className="table table-striped table-dark"
            size="sm"
            items={mrcs}
            fields={mrcTableFields}
            tableFilter
            columnFilter
            itemsPerPageSelect
            itemsPerPage={10}
            hover
            cleaner
            sorter
            pagination
            scopedSlots={{
              Actions: (mrc) => (
                <>
                  <td className="d-flex justify-content-between">
                    {mrc.status === "free" &&
                      user.userRole === "main-store" && (
                        <>
                          {" "}
                          <CLink
                            className="text-success"
                            onClick={() => {
                              setMRC({ ...mrc });
                              setOnEdit(true);
                              setShowModal(!showModal);
                            }}
                          >
                            <CTooltip content={`Edit - ${mrc.MRC} - MRC.`}>
                              <CIcon name="cil-pencil" />
                            </CTooltip>
                          </CLink>
                          <span className="text-muted">|</span>{" "}
                        </>
                      )}
                    {mrc.branch === "none" &&
                      user.userRole === "main-store" && (
                        <>
                          <CLink
                            className="text-danger"
                            onClick={() => deleteMRC(mrc._id)}
                          >
                            <CTooltip content={`Delete - ${mrc.MRC} - MRC.`}>
                              <CIcon name="cil-trash" />
                            </CTooltip>
                          </CLink>

                          <span className="text-muted">|</span>
                        </>
                      )}
                    {
                      <p>
                        <FilterMachine mrcId={mrc._id} filterBy="mrc" />
                      </p>
                    }
                  </td>
                </>
              ),
            }}
          />
        </CCardBody>

        <CModal show={showModal} onClose={() => setShowModal(!showModal)}>
          <CModalHeader closeButton>
            <CModalTitle>
              {onEdit ? " Edit " + mrc.MRC + " MRC" : " Add new MRC "}
            </CModalTitle>
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
                      minLength="5"
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
              <CButton type="submit" size="sm" color="success">
                <CIcon name="cil-save" /> {onEdit ? " Save Change " : " Save "}
              </CButton>

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
}

export default MrcsList;
