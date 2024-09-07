/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import BadRouting from "../../Utils/routing/BadRouting";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CLabel,
  CLink,
  CTooltip,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

function FiscalizationsPerMachine({ machineId }) {
  const state = useContext(GlobalState);
  const [Sales] = state.SalesAPI.Sales;
  const [fsclz_per_machine, setFsclz_per_machine] = useState([]);

  useEffect(() => {
    if (Sales.length > 0) {
      setFsclz_per_machine(
        Sales.filter(
          (filteredSale) => filteredSale.machineId == machineId
          // && filteredSale.fiscalization != "none"
        )
      );
    }
  }, [machineId, Sales]);

  const formatingDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between">
        <CLabel>List of fiscalization made to this machine</CLabel>
      </CCardHeader>
      <CCardBody className="table-responsive">
        {fsclz_per_machine.length > 0 ? (
          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Company</th>
                <th scope="col">Fiscalization</th>
                <th scope="col">Created At</th>
                <th scope="col">Prograss</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fsclz_per_machine.map((sale, index) => (
                <tr key={sale.saleId}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <CLink
                      className="text-info"
                      to={`/business/detail/${sale.businessId}`}
                    >
                      {sale.tradeName}
                    </CLink>
                  </td>
                  <td>{sale.fiscalization}</td>
                  <td>{formatingDate(sale.createdAt)}</td>
                  <td>{sale.status}</td>
                  <td className="d-flex justify-content-between">
                    <CLink
                      className="text-info"
                      to={`/fiscalization/detail/${sale.saleId}`}
                    >
                      <CTooltip content={`See detail fiscalization detail!`}>
                        <CIcon name="cil-arrow-right" />
                      </CTooltip>
                    </CLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <BadRouting text="This machine is not prepared for fiscalization yet!" />
        )}
      </CCardBody>
    </CCard>
  );
}

export default FiscalizationsPerMachine;
