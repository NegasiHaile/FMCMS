import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import BadRouting from "../../Utils/routing/BadRouting";
import { CLabel, CLink, CTooltip } from "@coreui/react";
import CIcon from "@coreui/icons-react";
function BusinessesPerClient({ clientId }) {
  const state = useContext(GlobalState);
  const [allAusinesses] = state.BusinessAPI.businesses;
  const [OwnerBusinesses, setOwnerBusinesses] = useState([]);

  useEffect(() => {
    if (allAusinesses.length > 0) {
      setOwnerBusinesses(
        allAusinesses.filter(
          (filteredBusiness) => filteredBusiness.ownerID === clientId
        )
      );
    }
  }, [clientId, allAusinesses]);

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
              <th scope="col">VAT</th>
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
                <td>{business.VAT}</td>
                <td>{business.machine}</td>
                <td>{business.credentials}</td>
                <td>{formatingDate(business.createdAt)}</td>
                <td className="d-flex justify-content-between">
                  <CLink
                    className="text-info"
                    to={`/business/detail/${business._id}`}
                  >
                    <CTooltip content={`See detail of ${business.tradeName}.!`}>
                      <CIcon name="cil-align-center" />
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
