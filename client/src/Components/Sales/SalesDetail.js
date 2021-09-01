import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import BadRouting from "../Utils/routing/BadRouting";

function SalesDetail() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [Sales] = state.SalesAPI.Sales;
  const [salesDetail, setSalesDetail] = useState("");

  const [callbackMachines, setCallbackMachines] = state.MachineAPI.callback;
  const [callbackBusiness, setCallbackBusiness] = state.BusinessAPI.callback;
  const [callbackSales, setCallbackSales] = state.SalesAPI.callback;

  useEffect(() => {
    console.log("what is going on inside useEffect");
    if (params.id && Sales) {
      console.log("what is going on inside if");
      const sale = Sales.find(
        (filteredSale) => filteredSale.saleId === params.id
      );
      setSalesDetail(sale);
    } else {
    }
  }, [params.id, Sales]);

  console.log(salesDetail);
  return (
    <div>
      {salesDetail ? (
        <h4>This is The sales detail {params.id}</h4>
      ) : (
        <BadRouting
          text="This is bad routing! No data to fetch, please go back to your
                  home page and come again with correct routing!"
        />
      )}
    </div>
  );
}

export default SalesDetail;
