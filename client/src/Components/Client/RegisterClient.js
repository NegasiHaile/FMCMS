import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalState } from "../../GlobalState";

import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";
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
  CForm,
  CSelect,
  CRow,
  CCol,
  CFormGroup,
  CInput,
  CDataTable,
  CLink,
  CTooltip,
} from "@coreui/react";

const branchTableFields = [
  "fName",
  "mName",
  "lName",
  "gender",
  "phoneNumber",
  "email",
  "Actions",
];

function RegisterClient() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [user] = state.UserAPI.User;
  const [users] = state.UsersAPI.users;
  const [clients, setClients] = useState(users);
  const [callback, setCallback] = state.UsersAPI.callback;
  const [showModal, setShowModal] = useState(false);
  const [activeClientID, setActiveClientID] = useState("none");
  const clientDetail = {
    fName: "",
    mName: "",
    lName: "",
    gender: "",
    photo: "/public/images/ng.png",
    branch: user.branch,
    phoneNumber: "",
    email: "",
    userRole: "client",
  };
  const [client, setClient] = useState(clientDetail);

  useEffect(() => {
    if (user.userRole === "super-admin" || user.userRole === "main-store") {
      setClients(
        users.filter((filteredClient) => filteredClient.userRole === "client")
      );
    } else {
      setClients(
        users.filter(
          (filteredClient) =>
            filteredClient.userRole === "client" &&
            filteredClient.branch === user.branch
        )
      );
    }
  }, [users]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
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

  const onSubmitRegisterClient = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/user/register",
        { ...client },
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

  const editClientDetail = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `/user/edit/${activeClientID}`,
        { ...client },
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

  const deleteClient = async (_id, fName, mName) => {
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
          const res = await axios.delete(`/user/delete/${_id}`, {
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
  return (
    <>
      <CCard className=" shadow-sm">
        <CCardHeader className="d-flex justify-content-between">
          {user.userRole === "branch-admin" || user.userRole === "sales" ? (
            <h6 className="text-muted">
              Clients/Business-owners under this branch.
            </h6>
          ) : (
            <h6 className="text-muted">List of all clients.</h6>
          )}
          {user.userRole === "sales" && (
            <CButton
              size="sm"
              color="secondary"
              onClick={() => {
                setClient({ client, ...clientDetail });
                setActiveClientID("none");
                setShowModal(!showModal);
              }}
            >
              <CIcon name="cil-plus" /> Add Business Owner
            </CButton>
          )}
        </CCardHeader>
        <CCardBody>
          <CDataTable
            items={clients}
            fields={branchTableFields}
            tableFilter
            columnFilter
            itemsPerPageSelect
            itemsPerPage={10}
            hover
            cleaner
            sorter
            pagination
            scopedSlots={{
              Actions: (client) => (
                <td className="d-flex justify-content-between">
                  {user.userRole === "sales" && (
                    <>
                      <CLink
                        className="text-success"
                        onClick={() => {
                          setActiveClientID(client._id);
                          setClient({ client, ...client });
                          setShowModal(!showModal);
                        }}
                      >
                        <CTooltip
                          content={`Edit the  - ${client.fName} ${client.mName}- client detail.`}
                        >
                          <CIcon name="cil-pencil" />
                        </CTooltip>
                      </CLink>
                      <span className="text-muted">|</span>
                      <CLink
                        className="text-danger"
                        onClick={() =>
                          deleteClient(client._id, client.fName, client.mName)
                        }
                      >
                        <CTooltip
                          content={`Delete - ${client.fName} ${client.mName}- client.`}
                        >
                          <CIcon name="cil-trash" />
                        </CTooltip>
                      </CLink>
                      <span className="text-muted">|</span>{" "}
                    </>
                  )}

                  <CLink
                    className="text-info"
                    to={`/client/detail/${client._id}`}
                  >
                    <CTooltip
                      content={`See detail of - ${client.fName} ${client.mName}- client.`}
                    >
                      <CIcon name="cil-align-center" />
                    </CTooltip>
                  </CLink>
                </td>
              ),
            }}
          ></CDataTable>
        </CCardBody>

        <CModal
          size="lg"
          show={showModal}
          onClose={() => setShowModal(!showModal)}
        >
          <CModalHeader closeButton>
            <CModalTitle className="text-muted">
              Give access to a client
            </CModalTitle>
          </CModalHeader>
          <CForm onSubmit={onSubmitRegisterClient}>
            <CModalBody>
              <CRow>
                <CCol xs="12" md="4">
                  <CFormGroup>
                    First name
                    <CInput
                      id="fName"
                      name="fName"
                      onChange={onChangeInput}
                      value={client.fName}
                      required
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="12" md="4">
                  <CFormGroup>
                    Middle Name
                    <CInput
                      id="mName"
                      name="mName"
                      onChange={onChangeInput}
                      value={client.mName}
                      required
                    />
                  </CFormGroup>
                </CCol>

                <CCol xs="12" md="4">
                  <CFormGroup>
                    Last Name
                    <CInput
                      id="lName"
                      name="lName"
                      onChange={onChangeInput}
                      value={client.lName}
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="12" md="3">
                  <CFormGroup>
                    Gender
                    <CSelect
                      aria-label="Default select example"
                      id="gender"
                      name="gender"
                      onChange={onChangeInput}
                      value={client.gender}
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Fmale</option>
                    </CSelect>
                  </CFormGroup>
                </CCol>
                <CCol xs="12" md="5">
                  <CFormGroup>
                    Email
                    <CInput
                      type="email"
                      id="email"
                      name="email"
                      onChange={onChangeInput}
                      value={client.email}
                      required
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="12" md="4">
                  <CFormGroup>
                    Phone-number
                    <CInput
                      id="phoneNumber"
                      name="phoneNumber"
                      onChange={onChangeInput}
                      value={client.phoneNumber}
                      required
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
            </CModalBody>
            <CModalFooter>
              {activeClientID === "none" ? (
                <CButton type="submit" size="sm" color="success">
                  <CIcon name="cil-save" /> Register Client
                </CButton>
              ) : (
                <CButton onClick={editClientDetail} size="sm" color="success">
                  <CIcon name="cil-save" /> Save Change
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
}

export default RegisterClient;
