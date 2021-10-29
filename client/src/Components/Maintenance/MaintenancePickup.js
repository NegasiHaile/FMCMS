import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import MachinePickUp from "../Machine/Components/MachinePickUp";
import BadRouting from "../Utils/routing/BadRouting";

function MaintenancePickup() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [Sales] = state.SalesAPI.Sales;
  const [salesDetail, setSalesDetail] = useState([]);

  useEffect(() => {
    setSalesDetail(
      Sales.filter(
        (sale) => sale.machineId == params.id && sale.status === "completed"
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
          pickupId={params.pickupId}
        />
      ) : (
        <BadRouting text="This machine is already in store, you can only recieve machine in the hand of client (sold machine)!" />
      )}
    </div>
  );
}

export default MaintenancePickup;
