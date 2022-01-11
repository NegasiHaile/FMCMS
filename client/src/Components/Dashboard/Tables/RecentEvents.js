import React, {useContext, useState, useEffect} from 'react'
import { GlobalState } from "../../../GlobalState";

import { CCard, CCardBody, CCardGroup, CCardHeader, CDataTable, CLink, CTooltip } from "@coreui/react";
import CIcon from "@coreui/icons-react";

function RecentEvents(props) {
    const state = useContext(GlobalState);
    const [user] = state.UserAPI.User;

    const [Sales] = state.SalesAPI.Sales;
    const [pickupMachines] = state.MachinePickUpAPI.machinePickups;

    const [recentSales, setRecentSales] = useState([]);
  const [recentReceivings, setRecentReceivings] = useState([]);

    

    const generalRecentSales = () =>{
      const theRecentgeneralSales = Sales.filter((filteredSale) => filteredSale);
      const theRecentGeneralReceivings = pickupMachines.filter((filteredPickUp) =>filteredPickUp);
      theRecentgeneralSales.length = 7
      theRecentGeneralReceivings.length = 7
        setRecentSales(theRecentgeneralSales);
        setRecentReceivings(theRecentGeneralReceivings);
    }
    const branchRecentSales = () =>{
      const theRecentSales = Sales.filter((filteredSale) => filteredSale.branchId == props.branchId)
      const theRecentReceivings = pickupMachines.filter((filteredPickUp) =>
          filteredPickUp.branchId == props.branchId
      )

      theRecentSales.length = 7
      theRecentReceivings.length = 7

      setRecentSales(theRecentSales);
      setRecentReceivings(theRecentReceivings);
    }

    useEffect(() => {
        if(props.branchId){
            branchRecentSales()
        }else{
            generalRecentSales()
        }
    }, [props])

    const trnctMaxWidth = {
      maxWidth: "130px"
    }
      const recentRecievingstableAttr = [
        "serialNumber",
        "category",
        "status",
        {
          key: "Actions",
          label: "Actions",
          // _style: { width: "1%" },
          sorter: false,
          filter: false,
        },
      ];
    return (
        <CCardGroup columns className="cols-2 mb-3">
           <CCard>
        <CCardHeader>Recent sales</CCardHeader>
        <CCardBody>
          <div  className=" table-responsive">
        <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Machine</th>
                <th scope="col">Buyer client</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentSales.length > 0 && recentSales.map((sale, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td >{sale.machineSerialNumber}</td>
                  <td className="text-truncate" style={trnctMaxWidth}>{sale.tradeName}</td>
                  <td className={`${sale.status === "completed"  ? "text-success" : 
                  sale.status === "canceled" ? "text-danger" : 
                  sale.status === "New" ? "text-primary" : "text-warning" } rounded text-center`}>
                    <b> <i> {sale.status}</i></b></td>
                  <td className="d-flex justify-content-center">

                    <CLink
                      className="text-info"
                      to={`/sales/detail/${sale.saleId}`}
                    >
                      <CTooltip content={`See detail of this sales.`}>
                        <CIcon name="cil-align-center" />
                      </CTooltip>
                    </CLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </CCardBody>
      </CCard> 
      <CCard>
        <CCardHeader>Recent recieved machines</CCardHeader>
        <CCardBody>
          <div  className=" table-responsive">
        <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Machine</th>
                <th scope="col">Recieving reason</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentReceivings.length > 0 &&
              recentReceivings.map((machine, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td >{machine.serialNumber}</td>
                  <td >{machine.category}</td>
                  <td className={`${machine.status === "completed"  ? "text-success" : 
                  machine.status === "New" ? "text-primary" : "text-warning" } rounded text-center`}>
                    <b> <i> {machine.status}</i></b></td>
                    <td className="d-flex justify-content-center">
                    <CLink
                      className="text-info"
                      to={`/pickup/detail/${machine._id}`}
                    >
                      <CTooltip
                        content={`See detail of this ${machine.category} maintenance.`}
                      >
                        <CIcon name="cil-align-center" />
                      </CTooltip>
                    </CLink>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </CCardBody>
      </CCard> 
        </CCardGroup>
    )
}

export default RecentEvents
