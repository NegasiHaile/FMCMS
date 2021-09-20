import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import MachinePickUp from "../Machine/Components/MachinePickUp";
import BadRouting from "../Utils/routing/BadRouting";
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";

function MaintenancePickup() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [Sales] = state.SalesAPI.Sales;
  const [salesDetail, setSalesDetail] = useState([]);

  useEffect(() => {
    setSalesDetail(
      Sales.filter(
        (sale) => sale.machineId == params.id && sale.status === "fiscalization"
      )
    );
  }, [params.id, Sales]);
  //   console.log(salesDetail.length);
  return (
    <div style={{ overflowX: "scroll" }}>
      {salesDetail.length ? (
        <MachinePickUp
          user={user}
          salesDetail={salesDetail[0]}
          pickupType="Maintenance"
        />
      ) : (
        <BadRouting text="This machine is already in store, you can only pick up machine in the hand of client (sold machine)!" />
      )}
    </div>
  );
}

export default MaintenancePickup;
