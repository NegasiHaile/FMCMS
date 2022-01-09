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

    useEffect(() => {
        if(props.branchId){
            branchRecentSales()
        }else{
            generalRecentSales()
        }
    }, [props])

    const generalRecentSales = () =>{
      Sales.length =5 
      pickupMachines.length = 5
        setRecentSales(Sales);
        setRecentReceivings(pickupMachines);
    }
    const branchRecentSales = () =>{
      const theRecentSales = Sales.filter((filteredSale) => filteredSale.branchId == props.branchId)
      const theRecentReceivings = pickupMachines.filter((filteredPickUp) =>
          filteredPickUp.branchId == props.branchId
      )

      theRecentSales.length = 5
      theRecentReceivings.length = 5

      setRecentSales(theRecentSales);
      setRecentReceivings(theRecentReceivings);
    }
    const recentSalesTableAttr = [
        // "branchId",
        "tradeName",
        "machineSerialNumber",
        "status",
        {
          key: "Actions",
          label: "Actions",
          // _style: { width: "1%" },
          sorter: false,
          filter: false,
        },
      ];
      const recentRecievingstableAttr = [
        "tradeName",
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
        <CCardGroup className="cols-2 mb-3">
           <CCard>
        <CCardHeader>Recent sales</CCardHeader>
        <CCardBody>
        <CDataTable 
            size="sm"
            items={recentSales}
            fields={recentSalesTableAttr}
            itemsPerPage={5}
            hover
            sorter
            pagination
            scopedSlots={{
              Actions: (sales) => (
                <>
                  <td className="d-flex justify-content-center">

                    <CLink
                      className="text-info"
                      to={`/sales/detail/${sales.saleId}`}
                    >
                      <CTooltip content={`See detail of this sales.`}>
                        <CIcon name="cil-align-center" />
                      </CTooltip>
                    </CLink>
                  </td>
                </>
              ),
            }}
          />
        </CCardBody>
      </CCard> 
      <CCard>
        <CCardHeader>Recent recieved machines</CCardHeader>
        <CCardBody>
        <CDataTable
            size="sm"
            items={recentReceivings}
            fields={recentRecievingstableAttr}
            itemsPerPage={5}
            hover
            sorter
            pagination
            scopedSlots={{
              Actions: (pickup) => (
                <td className="d-flex justify-content-center">
                  <>
                    <CLink
                      className="text-info"
                      to={`/pickup/detail/${pickup._id}`}
                    >
                      <CTooltip
                        content={`See detail of this ${pickup.category} maintenance.`}
                      >
                        <CIcon name="cil-align-center" />
                      </CTooltip>
                    </CLink>
                  </>
                </td>
              ),
            }}
          />
        </CCardBody>
      </CCard> 
        </CCardGroup>
    )
}

export default RecentEvents
