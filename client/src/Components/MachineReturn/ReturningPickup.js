import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import MachineReturnigPickup from "../Machine/Components/MachineReturnigPickup";
import BadRouting from "../Utils/routing/BadRouting";
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";

function ReturningPickup() {
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
        <MachineReturnigPickup
          user={user}
          salesDetail={salesDetail[0]}
          pickupType="returning"
          pickupId={params.pickupId}
        />
      ) : (
        <BadRouting text="This machine is already in store, you can only recieve machine in the hand of client (sold machine)!" />
      )}
    </div>
  );
}

export default ReturningPickup;
