import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import BadRouting from "../../Utils/routing/BadRouting";
import { CLink, CTooltip } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import axios from "axios";
import Swal from "sweetalert2";
import { getConfig } from "../../../config";
function BusinessesPerClient({ clientId }) {
  const state = useContext(GlobalState);
  const { apiUrl } = getConfig();
  const [user] = state.UserAPI.User;
  const [allAusinesses] = state.BusinessAPI.businesses;
  const [OwnerBusinesses, setOwnerBusinesses] = useState([]);
  const [callback, setCallback] = state.BusinessAPI.callback;

  useEffect(() => {
    if (allAusinesses.length > 0) {
      setOwnerBusinesses(
        allAusinesses.filter(
          (filteredBusiness) => filteredBusiness.ownerID === clientId
        )
      );
    }
  }, [clientId, allAusinesses]);
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
          const res = await axios.delete(`${apiUrl}/business/delete/${_id}`);
          Swal.fire("Deleted!", res.data.msg, "success");
          setCallback(!callback);
        }
      });
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };
  const formatingDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };
  return (
    <div className="mt-3 table-responsive">
      <h6 className="mb-2">List of businesses which owned by this client</h6>
      {OwnerBusinesses.length > 0 ? (
        <table className="table table-sm table-hover table-secondary ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Company Name</th>
              <th scope="col">Trade Name</th>
              <th scope="col">TIN</th>
              <th scope="col">machine</th>
              <th scope="col">credentials</th>
              <th scope="col">createdAt</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {OwnerBusinesses.map((business, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{business.companyName}</td>
                <td>{business.tradeName}</td>
                <td>{business.TIN}</td>
                <td>{business.machine}</td>
                <td>{business.credentials}</td>
                <td>{formatingDate(business.createdAt)}</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <BadRouting text="This client haven't any businesses yet!" />
      )}
    </div>
  );
}

export default BusinessesPerClient;
