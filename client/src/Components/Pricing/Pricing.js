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
  CLink,
  CTooltip,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";

import BadRouting from "../Utils/routing/BadRouting";

const pricingDetail = {
  pricingName: "",
  price: "",
  type: "",
};

function Pricing() {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [token] = state.token;
  const [pricing, setPricing] = useState(pricingDetail);
  const [pricings] = state.PricingAPI.pricings;
  const [callback, setCallback] = state.PricingAPI.callback;
  const [activePricing, setActivePricing] = useState("none");
  const [showModal, setShowModal] = useState(false);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setPricing({ ...pricing, [name]: value });
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

  const onSubmitSavePricing = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/pricing/register", { ...pricing });
      sweetAlert("success", res.data.msg);
      setShowModal(!showModal);
      setCallback(!callback);
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };

  const editPricing = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/pricing/edit/${activePricing}`, {
        ...pricing,
      });
      sweetAlert("success", res.data.msg);
      setShowModal(!showModal);
      setCallback(!callback);
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };

  const formatingDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };
  const pricingTableFields = ["pricingName", "price", "createdAt"];
  return (
    <>
      <CCard className=" shadow-sm">
        <CCardHeader className="d-flex justify-content-between">
          <h5>Pricing</h5>
          {user.userRole === "super-admin" && (
            <CButton
              size="sm"
              color="light"
              onClick={() => {
                setPricing({ pricing, ...pricingDetail });
                setActivePricing("none");
                setShowModal(!showModal);
              }}
            >
              <CIcon name="cil-plus" /> Create new price
            </CButton>
          )}
        </CCardHeader>
        <CCardBody className="table-responsive">
          {pricings.length > 0 ? (
            <table className="table table-sm">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Pricing Name</th>
                  <th scope="col">Price (ETB)</th>
                  <th scope="col">Updated At</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                {pricings.map((price, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{price.pricingName}</td>
                    <td>{price.price}</td>
                    <td>{formatingDate(price.updatedAt)}</td>
                    <td className="d-flex justify-content-between">
                      <CLink
                        className="text-success"
                        onClick={() => {
                          setPricing({ pricing, ...price });
                          setActivePricing(price._id);
                          setShowModal(!showModal);
                        }}
                      >
                        <CTooltip content={`Edit this price.`}>
                          <CIcon name="cil-pencil" />
                        </CTooltip>
                      </CLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <BadRouting text="No price list yet!" />
          )}
        </CCardBody>

        <CModal
          size="lg"
          show={showModal}
          onClose={() => setShowModal(!showModal)}
        >
          <CModalHeader closeButton>
            <CModalTitle>Pricing modal</CModalTitle>
          </CModalHeader>
          <CForm onSubmit={onSubmitSavePricing}>
            <CModalBody>
              <CRow>
                <CCol xs="12" md="4">
                  <CFormGroup>
                    Pricing Name
                    <CInput
                      id="pricingName"
                      name="pricingName"
                      placeholder="Enter pricing unique name."
                      value={pricing.pricingName}
                      onChange={onChangeInput}
                      required
                    />
                  </CFormGroup>
                </CCol>

                <CCol xs="12" md="4">
                  <CFormGroup>
                    Price
                    <CInput
                      id="price"
                      name="price"
                      placeholder="enter the pricing price"
                      value={pricing.price}
                      onChange={onChangeInput}
                      required
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="12" md="4">
                  <CFormGroup>
                    Type
                    <CInput
                      id="type"
                      name="type"
                      placeholder="Enter sub price."
                      value={pricing.type}
                      onChange={onChangeInput}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
            </CModalBody>
            <CModalFooter>
              {activePricing === "none" ? (
                <CButton type="submit" size="sm" color="success">
                  <CIcon name="cil-save" /> Save Pricing
                </CButton>
              ) : (
                <CButton size="sm" color="dark" onClick={editPricing}>
                  <CIcon name="cil-pencil" /> Save Changes
                </CButton>
              )}
              {/* <CButton
                size="sm"
                color="danger"
                onClick={() => setShowModal(!showModal)}
              >
                <CIcon name="cil-x" /> Close
              </CButton> */}
            </CModalFooter>
          </CForm>
        </CModal>
      </CCard>
    </>
  );
}

export default Pricing;
