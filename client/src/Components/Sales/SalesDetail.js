import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";

function SalesDetail() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [Sales] = state.SalesAPI.Sales;

  const [callbackMachines, setCallbackMachines] = state.MachineAPI.callback;
  const [callbackBusiness, setCallbackBusiness] = state.BusinessAPI.callback;
  const [callbackSales, setCallbackSales] = state.SalesAPI.callback;
const [sales]
  useEffect(() => {}, [params.id, Sales, ]);
  return (
    <div>
      <h1>This is The sales detail {params.id}</h1>
    </div>
  );
}

export default SalesDetail;
