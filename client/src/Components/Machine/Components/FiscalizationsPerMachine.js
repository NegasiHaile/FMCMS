import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import BadRouting from "../../Utils/routing/BadRouting";
import {
  CButton,
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
  const [user] = state.UserAPI.User;
  const [Sales] = state.SalesAPI.Sales;
  const [fsclz_per_machine, setFsclz_per_machine] = useState([]);

  useEffect(() => {
    if (Sales.length > 0) {
      setFsclz_per_machine(
        Sales.filter(
          (filteredSale) =>
            filteredSale.machineId == machineId &&
            filteredSale.fiscalization != "none"
        )
      );
      console.log("Inside if :" + JSON.stringify(fsclz_per_machine));
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
                <tr key={sale._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{sale.tradeName}</td>
                  <td>{sale.fiscalization}</td>
                  <td>{formatingDate(sale.createdAt)}</td>
                  <td>{sale.status}</td>
                  <td className="d-flex justify-content-between">
                    {user.userRole === "technician" &&
                      (sale.status === "New" ||
                        sale.status === "unapproved" ||
                        sale.status === "rejected") && (
                        <>
                          <CLink
                            className="text-success"
                            to={`/pickup/edit/${sale.machineId}/${sale._id}`}
                          >
                            <CTooltip content={`Edit this pickup detail.`}>
                              <CIcon name="cil-pencil" />
                            </CTooltip>
                          </CLink>
                          <span className="text-muted">|</span>
                          <CLink
                            className="text-danger"
                            //onClick={() => deletePickupDetail(sale._id)}
                          >
                            <CTooltip content={`Delete this operation!.`}>
                              <CIcon name="cil-trash" />
                            </CTooltip>
                          </CLink>
                          <span className="text-muted">|</span>
                        </>
                      )}

                    {
                      <>
                        <CLink
                          className="text-info"
                          to={`/pickup/detail/${sale._id}`}
                        >
                          <CTooltip content={`See detail of machine pickup!`}>
                            <CIcon name="cil-align-center" />
                          </CTooltip>
                        </CLink>
                      </>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <BadRouting text="This machine haven't any ficalization history yet!" />
        )}
      </CCardBody>
    </CCard>
  );
}

export default FiscalizationsPerMachine;
