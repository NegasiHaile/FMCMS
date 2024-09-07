import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import { useParams } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CSelect,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";
import { getConfig } from "../../config";

const userAttributes = {
  fName: "",
  mName: "",
  lName: "",
  gender: "",
  photo: "/public/images/ng.png",
  branch: "",
  city: "",
  subCity: "",
  kebele: "",
  woreda: "",
  phoneNumber: "",
  email: "",
  userRole: "",
};
const RegisterEmployee = () => {
  const params = useParams();
  const state = useContext(GlobalState);
  const { apiUrl } = getConfig();
  const [token] = state.token;
  const [branchs] = state.branchAPI.branchs;
  const [callback, setCallback] = state.UsersAPI.callback;
  const [users] = state.UsersAPI.users;
  const [user, setUser] = useState(userAttributes);
  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    if (params.id) {
      setOnEdit(true);
      users.forEach((employee) => {
        if (employee._id === params.id) {
          setUser(employee);
        }
      });
    } else {
      setOnEdit(false);
      setUser(userAttributes);
    }
  }, [params.id, users]);

  const sweetAlert = (type, text) => {
    Swal.fire({
      position: "center",
      background: "#EBEDEF", // 2EB85C success // E55353 danger // 1E263C sidebar
      icon: type,
      text: text,
      confirmButtonColor: "#1E263C",
      showConfirmButton: true,
      // timer: 1500,
    });
  };
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmitRegisterUser = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `${apiUrl}/user/edit/${params.id}`,
          { ...user },
          {
            headers: { Authorization: token },
          }
        );
        setCallback(!callback);
        sweetAlert("success", res.data.msg);
      } else {
        const res = await axios.post(`${apiUrl}/user/register`, { ...user });
        setCallback(!callback);
        sweetAlert("success", res.data.msg);
      }
      // console.log(user);
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };

  const clearAllFields = () => {
    setUser({ user, ...userAttributes });
  };

  return (
    <>
      <CCard>
        <CCardHeader className="d-flex justify-content-between">
          <CLabel className="text-uppercase">Register Employee</CLabel>
          <CButton to="/Employee/List" size="sm" variant="outline" color="dark">
            <CIcon name="cil-list-numbered" /> Users List
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={onSubmitRegisterUser}>
            <CRow>
              <CCol xs="12" md="4">
                <CFormGroup>
                  First name
                  <CInput
                    id="fName"
                    name="fName"
                    onChange={onChangeInput}
                    value={user.fName}
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
                    value={user.mName}
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
                    value={user.lName}
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
                    value={user.gender}
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
                    value={user.email}
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
                    minLength="10"
                    maxLength="10"
                    onChange={onChangeInput}
                    value={user.phoneNumber}
                    required
                  />
                </CFormGroup>
              </CCol>

              <CCol xs="12" md="3">
                <CFormGroup>
                  Address City
                  <CInput
                    id="city"
                    name="city"
                    onChange={onChangeInput}
                    value={user.city}
                  />
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="3">
                <CFormGroup>
                  Sub city
                  <CInput
                    id="subCity"
                    name="subCity"
                    onChange={onChangeInput}
                    value={user.subCity}
                  />
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="3">
                <CFormGroup>
                  Kebele
                  <CInput
                    id="kebele"
                    name="kebele"
                    onChange={onChangeInput}
                    value={user.kebele}
                  />
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="3">
                <CFormGroup>
                  Woreda
                  <CInput
                    id="woreda"
                    name="woreda"
                    onChange={onChangeInput}
                    value={user.woreda}
                  />
                </CFormGroup>
              </CCol>

              <CCol xs="12" md="4">
                <CFormGroup>
                  Employee task
                  <CSelect
                    aria-label="Default select example"
                    id="userRole"
                    name="userRole"
                    onChange={onChangeInput}
                    value={user.userRole}
                    required
                  >
                    <option value="">Select employe task</option>
                    <option value="sales">sales</option>
                    <option value="customer-service">Customer Service</option>
                    <option value="technician">Technician</option>
                    <option value="machine-controller">
                      Machine Controller
                    </option>
                    <option value="branch-store">Branch Store</option>
                    <option value="operational-manager">
                      Operational Manager
                    </option>
                    <option value="branch-admin">Branch Admin</option>
                    <option value="main-store">Main Store</option>
                    <option value="super-admin">Super Admin</option>
                  </CSelect>
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="4">
                <CFormGroup>
                  Employee branch
                  <CSelect
                    aria-label="Default select example"
                    id="branch"
                    name="branch"
                    onChange={onChangeInput}
                    value={user.branch}
                  >
                    <option value="none">Select employee branch</option>
                    {branchs.map((branch) => (
                      <option value={branch._id} key={branch._id}>
                        {branch.branchName}
                      </option>
                    ))}
                  </CSelect>
                </CFormGroup>
              </CCol>
            </CRow>
            <br />
            <CRow className="d-flex justify-content-center">
              <CCol xs="12" sm="6" className="d-flex justify-content-between">
                <CButton
                  type="submit"
                  size="sm"
                  className="px-4"
                  color="success"
                >
                  <CIcon name="cil-save" /> Save Detail
                </CButton>
                {!onEdit && (
                  <CButton
                    size="sm"
                    className="px-4"
                    color="danger"
                    onClick={clearAllFields}
                  >
                    <CIcon name="cil-x" /> Clear All
                  </CButton>
                )}
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
        <CCardFooter></CCardFooter>
      </CCard>
    </>
  );
};

export default RegisterEmployee;
