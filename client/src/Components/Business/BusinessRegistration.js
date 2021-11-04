import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import { useParams } from "react-router-dom";

import BusinessOverview from "./BusinessOverview";

import {
  CForm,
  CRow,
  CFormGroup,
  CLabel,
  CInput,
  CSelect,
  CButton,
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CCard,
  CCardBody,
  CTabs,
  CCardHeader,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";

const BusinessRegistration = () => {
  const state = useContext(GlobalState);
  const params = useParams();
  const [user] = state.UserAPI.User;

  const businessDetail = {
    ownerID: params.clientId,
    tradeName: "",
    companyName: "",
    TIN: "",
    VAT: "",
    TL_Image: "",
    city: "",
    subCity: "",
    kebele: "",
    woreda: "",
    buildingName: "",
    officeNumber: "",
    telephone: "",
    email: "",
    fax: "",
    branch: user.branch,
    credentials: "New",
    sw_Tech: "",
  };
  const [businesses] = state.BusinessAPI.businesses;
  const [business, setBusiness] = useState(businessDetail);

  const [branchs] = state.branchAPI.branchs;
  const [employees] = state.UsersAPI.users;

  const [callback, setCallback] = state.BusinessAPI.callback;

  const [onEdit, setOnEdit] = useState(false);

  useEffect(() => {
    if (params.businessId) {
      setOnEdit(true);
      businesses.forEach((bsns) => {
        if (bsns._id === params.businessId) {
          setBusiness(bsns);
        }
      });
    } else {
      setOnEdit(false);
      setBusiness(businessDetail);
    }
  }, [params.businessId, businesses]);

  const onChangeInput = (e) => {
    try {
      const { name, value } = e.target;
      if (name === "TIN" || name === "telephone") {
        const nmbrPattern = /^[0-9\b]+$/;
        if (e.target.value === "" || nmbrPattern.test(e.target.value)) {
          setBusiness({ ...business, [name]: value });
        }
      } else {
        setBusiness({ ...business, [name]: value });
      }
    } catch {}
  };
  const onChangeFileInput = (e) => {
    setBusiness({ ...business, TL_Image: e.target.files[0] });
  };

  const SweetAlert = (type, text) => {
    Swal.fire({
      position: "center",
      background: "#EBEDEF", // 2EB85C success // E55353 danger // 1E263C sidebar
      icon: type,
      text: text,
      confirmButtonColor: "#1E263C",
      showConfirmButton: false,
      // timer: 1500,
    });
  };

  const onSubmitSaveBusinessDetail = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("ownerID", business.ownerID);
    formData.append("TIN", business.TIN);
    formData.append("VAT", business.VAT);
    formData.append("tradeName", business.tradeName);
    formData.append("companyName", business.companyName);
    formData.append("TL_Image", business.TL_Image);
    formData.append("city", business.city);
    formData.append("subCity", business.subCity);
    formData.append("kebele", business.kebele);
    formData.append("woreda", business.woreda);
    formData.append("buildingName", business.buildingName);
    formData.append("officeNumber", business.officeNumber);
    formData.append("telephone", business.telephone);
    formData.append("email", business.email);
    formData.append("fax", business.fax);
    formData.append("branch", business.branch);
    formData.append("sw_Tech", business.sw_Tech);
    formData.append("credentials", business.credentials);

    try {
      if (onEdit) {
        const res = await axios.put(
          `/business/edit/${params.businessId}`,
          formData
        );
        SweetAlert("success", res.data.msg);
        setCallback(!callback);
      } else {
        var newBusiness = businesses.filter(
          (filteredBusiness) =>
            filteredBusiness.TIN === business.TIN ||
            filteredBusiness.VAT === business.VAT ||
            filteredBusiness.tradeName === business.tradeName
        );

        if (newBusiness.length === 0) {
          const res = await axios.post("/business/register", formData);
          SweetAlert("success", res.data.msg);
          setCallback(!callback);
        } else {
          SweetAlert(
            "error",
            `TIN, business name or the VAT; one of them are taken by another business please check the details! `
          );
        }
      }
    } catch (error) {
      SweetAlert("error", error.response.data.msg);
    }
  };

  return (
    <CRow>
      <CCol xs="12" className="mb-4">
        <CCard>
          <CCardHeader>Enter the detail of the business.</CCardHeader>
          <CCardBody>
            <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-building"></CIcon> Profile
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-location-pin"></CIcon> Address
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-contact"></CIcon> Others
                  </CNavLink>
                </CNavItem>

                <CNavItem>
                  <CNavLink>
                    <CIcon name="cil-applications"></CIcon> Preview
                  </CNavLink>
                </CNavItem>
              </CNav>
              <CForm
                onSubmit={onSubmitSaveBusinessDetail}
                action="POST"
                encType="multipart/form-data"
              >
                <CTabContent className="my-3">
                  <CTabPane>
                    <CRow>
                      <CCol sm="12" md="6">
                        <CFormGroup>
                          <CLabel> Company Name </CLabel>
                          <CInput
                            id="companyName"
                            name="companyName"
                            placeholder="Enter campany name"
                            value={business.companyName}
                            onChange={onChangeInput}
                            required
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol sm="12" md="6">
                        <CFormGroup>
                          <CLabel> Trade Name </CLabel>
                          <CInput
                            id="tradeName"
                            name="tradeName"
                            placeholder="Enter unique bussiness name."
                            value={business.tradeName}
                            onChange={onChangeInput}
                            required
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol sm="12" md="6">
                        <CFormGroup>
                          <CLabel> TIN </CLabel>
                          <CInput
                            id="TIN"
                            name="TIN"
                            placeholder="Enter bussiness TIN."
                            value={business.TIN}
                            onChange={onChangeInput}
                            minLength="10"
                            maxLength="10"
                            required
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol sm="12" md="6">
                        <CFormGroup>
                          <CLabel> VAT </CLabel>
                          <CInput
                            id="VAT"
                            name="VAT"
                            placeholder="Enter bussiness VAT."
                            value={business.VAT}
                            onChange={onChangeInput}
                            required
                          />
                        </CFormGroup>
                      </CCol>
                    </CRow>
                  </CTabPane>

                  <CTabPane>
                    <CRow>
                      <CCol sm="12" md="4">
                        <CFormGroup>
                          <CLabel> City </CLabel>
                          <CInput
                            id="city"
                            name="city"
                            placeholder="Enter city where the business is located."
                            value={business.city}
                            onChange={onChangeInput}
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol sm="12" md="4">
                        <CFormGroup>
                          <CLabel> Subcity </CLabel>
                          <CInput
                            id="subCity"
                            name="subCity"
                            placeholder="Enter subcity."
                            value={business.subCity}
                            onChange={onChangeInput}
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol sm="12" md="4">
                        <CFormGroup>
                          <CLabel> Kebele </CLabel>
                          <CInput
                            id="kebele"
                            name="kebele"
                            placeholder="Enter kebele"
                            value={business.kebele}
                            onChange={onChangeInput}
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol sm="12" md="4">
                        <CFormGroup>
                          <CLabel> Woreda </CLabel>
                          <CInput
                            id="woreda"
                            name="woreda"
                            placeholder="Enter woreda."
                            value={business.woreda}
                            onChange={onChangeInput}
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol sm="12" md="4">
                        <CFormGroup>
                          <CLabel> Building Name </CLabel>
                          <CInput
                            id="buildingName"
                            name="buildingName"
                            placeholder="Enter building name."
                            value={business.buildingName}
                            onChange={onChangeInput}
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol sm="12" md="4">
                        <CFormGroup>
                          <CLabel> Office Number </CLabel>
                          <CInput
                            id="officeNumber"
                            name="officeNumber"
                            placeholder="Enter office  number."
                            value={business.officeNumber}
                            onChange={onChangeInput}
                          />
                        </CFormGroup>
                      </CCol>

                      <CCol xs="12">
                        Contacts of the business.
                        <hr />
                      </CCol>

                      <CCol sm="12" md="4">
                        <CFormGroup>
                          <CLabel> Email </CLabel>
                          <CInput
                            id="email"
                            name="email"
                            placeholder="Enter email address."
                            value={business.email}
                            onChange={onChangeInput}
                            required
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol sm="12" md="4">
                        <CFormGroup>
                          <CLabel> Telephone Number </CLabel>
                          <CInput
                            id="telephone"
                            name="telephone"
                            placeholder="Enter telephone number."
                            value={business.telephone}
                            onChange={onChangeInput}
                            minLength="10"
                            maxLength="13"
                            required
                          />
                        </CFormGroup>
                      </CCol>
                      <CCol sm="12" md="4">
                        <CFormGroup>
                          <CLabel> Fax </CLabel>
                          <CInput
                            id="fax"
                            name="fax"
                            placeholder="enter fax."
                            value={business.fax}
                            onChange={onChangeInput}
                          />
                        </CFormGroup>
                      </CCol>
                    </CRow>
                  </CTabPane>
                  <CTabPane>
                    <CRow>
                      {user.userRole === "client" && (
                        <CCol xs="12" md="6">
                          <CFormGroup>
                            <CLabel>To which jupter branch?</CLabel>
                            <CSelect
                              aria-label="Default select example"
                              id="branch"
                              name="branch"
                              onChange={onChangeInput}
                              value={business.branch}
                              required
                            >
                              <option value="">Select branch...</option>
                              {branchs.map((branch) => (
                                <option value={branch._id} key={branch._id}>
                                  {branch.branchName}
                                </option>
                              ))}
                            </CSelect>
                          </CFormGroup>
                        </CCol>
                      )}
                      {onEdit && user.userRole === "branch-admin" && (
                        <CCol xs="12" md="6">
                          <CFormGroup>
                            <CLabel>
                              Assigne technician for this bussiness.
                            </CLabel>
                            <CSelect
                              aria-label="Default select example"
                              id="sw_Tech"
                              name="sw_Tech"
                              onChange={onChangeInput}
                              value={business.sw_Tech}
                              // required
                            >
                              <option value="">Select technician...</option>
                              {employees
                                .filter(
                                  (employee) =>
                                    employee.userRole === "technician"
                                )
                                .map((filteredEmployee) => (
                                  <option
                                    value={filteredEmployee._id}
                                    key={filteredEmployee._id}
                                  >
                                    {filteredEmployee.fName}{" "}
                                    {filteredEmployee.mName}{" "}
                                    {filteredEmployee.lName}
                                  </option>
                                ))}
                            </CSelect>
                          </CFormGroup>
                        </CCol>
                      )}
                      <CCol xs="12">
                        Upload neccessary files of business
                        <hr />
                      </CCol>
                      <CCol sm="12" md="6">
                        <CFormGroup>
                          <CLabel htmlFor="formFile">
                            File size not more than (5MB)
                          </CLabel>
                          <CInput
                            id="TL_Image"
                            type="file"
                            accept=".pdf, .docx"
                            name="TL_Image"
                            onChange={onChangeFileInput}
                          />
                        </CFormGroup>
                      </CCol>
                    </CRow>
                  </CTabPane>
                  <CTabPane>
                    <BusinessOverview {...business} />
                    <CRow className="d-flex justify-content-center mt-3">
                      <CCol
                        xs="12"
                        sm="6"
                        className="d-flex justify-content-between"
                      >
                        <CButton
                          type="submit"
                          size="sm"
                          className="px-4"
                          color="dark"
                        >
                          <CIcon name="cil-save" />
                          {onEdit ? " Save Cahnges " : " Save business detail "}
                        </CButton>
                        {!onEdit && (
                          <CButton
                            size="sm"
                            className="px-4"
                            color="danger"
                            onClick={() => setBusiness(businessDetail)}
                          >
                            <CIcon name="cil-x" /> Clear All
                          </CButton>
                        )}
                      </CCol>
                      <CCol sm="12">
                        <hr />
                        <span className="text-muted">
                          Fill all the forms properly, And send the detail. Then
                          wait until the admin analysed the document and get you
                          notified. This may take an hours or a day.
                        </span>
                      </CCol>
                    </CRow>
                  </CTabPane>
                </CTabContent>
              </CForm>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default BusinessRegistration;
