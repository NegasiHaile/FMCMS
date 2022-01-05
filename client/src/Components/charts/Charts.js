import React, { useContext, useEffect } from "react";
import { CCard, CCardBody, CCardGroup, CCardHeader } from "@coreui/react";
import {
  CChartBar,
  CChartLine,
  CChartDoughnut,
  CChartPie,
} from "@coreui/react-chartjs";

import { GlobalState } from "../../GlobalState";
var months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const Charts = () => {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [Sales] = state.SalesAPI.Sales;
  const [allBusinesses] = state.BusinessAPI.businesses;
  const [pickupMachines] = state.MachinePickUpAPI.machinePickups;
  var linemachineSales = [0];
  var lineClientsBusinesses = [0];
  var barReceivedMachines = [0];
  var doughnutSalesStatus = [];
  var pushAnnualServiceArray = [];

  const pushMachineSales = () => {
    let elements = months.length - 1;
    for (let i = 0; i <= elements; i++) {
      linemachineSales.push(
        Sales.filter(
          (sale) =>
            new Date(sale.createdAt).toLocaleString("en-us", {
              month: "short",
            }) == months[i]
        ).length
      );
    }

    return linemachineSales;
  };
  const pushClientsBusinesses = () => {
    let elements = months.length - 1;
    for (let i = 0; i <= elements; i++) {
      lineClientsBusinesses.push(
        allBusinesses.filter(
          (sale) =>
            new Date(sale.createdAt).toLocaleString("en-us", {
              month: "short",
            }) == months[i]
        ).length
      );
    }
    return lineClientsBusinesses;
  };
  const pushReceivedMachines = () => {
    let elements = months.length - 1;
    for (let i = 0; i <= elements; i++) {
      barReceivedMachines.push(
        pickupMachines.filter(
          (pickup) =>
            new Date(pickup.createdAt).toLocaleString("en-us", {
              month: "short",
            }) == months[i]
        ).length
      );
    }
    return barReceivedMachines;
  };
  const pushSalesStatus = () => {
    doughnutSalesStatus.push(
      Sales.filter(
        (sale) => sale.status !== "completed" && sale.status !== "canceled"
      ).length
    );
    doughnutSalesStatus.push(
      Sales.filter((sale) => sale.status === "completed").length
    );
    doughnutSalesStatus.push(
      Sales.filter((sale) => sale.status === "canceled").length
    );
    return doughnutSalesStatus;
  };

  const pushAnnualService = () => {
    let renewedSales = 0;
    for (let i = 0; i < Sales.length; i++) {
      if (Sales[i].renewHistory) {
        var therenewhistry = Sales[i].renewHistory;
        if (therenewhistry.includes(new Date().getFullYear())) {
          renewedSales++;
          console.log(renewedSales);
        }
      }
    }

    pushAnnualServiceArray.push(Sales.length - renewedSales, renewedSales);
    return pushAnnualServiceArray;
  };

  return (
    <CCardGroup columns className="cols-2">
      <CCard>
        <CCardHeader>Clients & Sales</CCardHeader>
        <CCardBody>
          <CChartLine
            datasets={[
              {
                label: "Clients",
                backgroundColor: "#FF6384",
                data: pushClientsBusinesses(),
              },
              {
                label: "Sales",
                backgroundColor: "#36A2EB",
                data: pushMachineSales(),
              },
            ]}
            options={{
              tooltips: {
                enabled: true,
              },
            }}
            labels={months}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>Sales Status</CCardHeader>
        <CCardBody>
          <CChartDoughnut
            datasets={[
              {
                backgroundColor: ["#FFCE56", "#36A2EB", "#FF6384"],
                data: pushSalesStatus(),
              },
            ]}
            labels={["Proccessing", "Complated", "Canceled"]}
            options={{
              tooltips: {
                enabled: true,
              },
            }}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>Received machines</CCardHeader>
        <CCardBody>
          <CChartBar
            datasets={[
              {
                label: "Received Machines",
                backgroundColor: "#8884D8",
                data: pushReceivedMachines(),
              },
            ]}
            labels={months}
            options={{
              tooltips: {
                enabled: true,
              },
            }}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>Annual Service of {new Date().getFullYear()}</CCardHeader>
        <CCardBody>
          <CChartPie
            datasets={[
              {
                backgroundColor: ["#FF6384", "#36A2EB"],
                data: pushAnnualService(),
              },
            ]}
            labels={["Unrenewed", "Renewed"]}
            options={{
              tooltips: {
                enabled: true,
              },
            }}
          />
        </CCardBody>
      </CCard>
    </CCardGroup>
  );
};

export default Charts;
