import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import { GlobalState } from "../../GlobalState";
import {
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CLabel,
  CDataTable,
  CLink,
  CTooltip,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const BusinessesList = () => {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [user] = state.UserAPI.User;
  const [allAusinesses] = state.BusinessAPI.businesses;
  const [businesses, setBusinesses] = useState(allAusinesses);
  const [callback, setCallback] = state.BusinessAPI.callback;

  useEffect(() => {
    if (user.userRole === "super-admin" || user.userRole === "main-store") {
      setBusinesses(allAusinesses);
    } else if (user.userRole === "client") {
      setBusinesses(
        allAusinesses.filter(
          (filteredBussiness) => filteredBussiness.ownerID == user._id
        )
      );
    } else {
      setBusinesses(
        allAusinesses.filter(
          (filteredBussiness) => filteredBussiness.branch == user.branch
        )
      );
    }
  }, [user, allAusinesses]);
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
  const deleteBusiness = async (_id, tradeName) => {
    try {
      Swal.fire({
        title: "Delete?",
        text: "You won't be able to revert " + tradeName + " Detail!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1E263C",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.delete(`/business/delete/${_id}`);
          Swal.fire("Deleted!", res.data.msg, "success");
          setCallback(!callback);
        }
      });
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };

  const businessTableFields = [
    "companyName",
    "tradeName",
    "TIN",
    "VAT",
    "telephone",
    "machine",
    "credentials",
    "Actions",
  ];
  return (
    <>
      <CCard className=" shadow-sm">
        <CCardHeader className="d-flex justify-content-between">
          {user.userRole === "branch-admin" ||
          user.userRole === "technician" ? (
            <h6 className="text-muted">Businesses under this branch.</h6>
          ) : (
            <h6 className="text-muted">List of all businesses.</h6>
          )}
          {user.userRole === "client" && (
            <CButton size="sm" color="secondary" to={`/business/register`}>
              <CIcon name="cil-plus" /> Add new business
            </CButton>
          )}
        </CCardHeader>
        <CCardBody>
          <CDataTable
            size="sm"
            items={businesses}
            fields={businessTableFields}
            tableFilter
            columnFilter
            itemsPerPageSelect
            itemsPerPage={10}
            hover
            footer
            cleaner
            sorter
            pagination
            scopedSlots={{
              Actions: (business) => (
                <td className="d-flex justify-content-between">
                  {(user.userRole === "sales" ||
                    user.userRole === "client") && (
                    <>
                      {" "}
                      <CLink
                        className="text-success"
                        to={{
                          pathname: `/business/edit/${business._id}`,
                          state: business,
                        }}
                      >
                        <CTooltip
                          content={`Edit the  - ${business.TIN}- business detail.`}
                        >
                          <CIcon name="cil-pencil" />
                        </CTooltip>
                      </CLink>
                      <span className="text-muted">|</span>
                      {(business.credentials === "New" ||
                        business.credentials === "Pending") && (
                        <>
                          <CLink
                            className="text-danger"
                            onClick={() =>
                              deleteBusiness(business._id, business.tradeName)
                            }
                          >
                            <CTooltip
                              content={`Delete - ${business.tradeName}- business.`}
                            >
                              <CIcon name="cil-trash" />
                            </CTooltip>
                          </CLink>
                          <span className="text-muted">|</span>
                        </>
                      )}
                    </>
                  )}

                  <CLink
                    className="text-primary"
                    to={`/business/Detail/${business._id}`}
                  >
                    <CTooltip
                      content={`See detail of - ${business.tradeName}- business.`}
                    >
                      <CIcon name="cil-fullscreen" />
                    </CTooltip>
                  </CLink>
                </td>
              ),
            }}
          />
        </CCardBody>
      </CCard>
    </>
  );
};

export default BusinessesList;
